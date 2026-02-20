import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";

// ─── Types ───────────────────────────────────────────────────────────
interface ApplyFormData {
  name:       string;
  phone:      string;
  email:      string;
  instagram?: string;
  country:    string;
}

type RateInfo = {
  count:       number;
  windowStart: number;
};

// ─── Rate limiting ───────────────────────────────────────────────────
const RATE_LIMIT_WINDOW_MS    = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 3;
const rateLimitStore          = new Map<string, RateInfo>();

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  const ip = (req as NextRequest & { ip?: string }).ip ?? req.headers.get("x-real-ip");
  return ip || "unknown";
}

function isRateLimited(ip: string): boolean {
  if (!ip) return false;
  const now  = Date.now();
  const info = rateLimitStore.get(ip);
  if (!info) {
    rateLimitStore.set(ip, { count: 1, windowStart: now });
    return false;
  }
  if (now - info.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(ip, { count: 1, windowStart: now });
    return false;
  }
  if (info.count >= RATE_LIMIT_MAX_REQUESTS) return true;
  info.count += 1;
  rateLimitStore.set(ip, info);
  return false;
}

// ─── Email builder ───────────────────────────────────────────────────
const APPLICATION_RECIPIENT = "smpagencyhub@gmail.com";

function buildEmailContent(data: ApplyFormData) {
  const submittedAt = new Date().toLocaleString("en-US", { timeZone: "UTC", hour12: true });
  const siteUrl     = process.env.NEXT_PUBLIC_SITE_URL || "https://smpagency.co.uk";
  const subject     = `New Application – ${data.name}`;

  const text = [
    "OFM Mastery — New Application",
    "─────────────────────────────────────",
    `Name      : ${data.name}`,
    `Phone     : ${data.phone}`,
    `Email     : ${data.email}`,
    `Instagram : ${data.instagram || "N/A"}`,
    `Country   : ${data.country}`,
    `Submitted : ${submittedAt} (UTC)`,
    "",
    "Sent automatically from the OFM Mastery website.",
  ].join("\n");

  const html = `
    <div style="margin:0;padding:0;background:#000000;font-family:system-ui,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;background:#000000;">
        <tr><td align="center">
          <table width="100%" cellpadding="0" cellspacing="0"
            style="max-width:600px;background:#05010a;border-radius:16px;border:1px solid #1f1f1f;overflow:hidden;">

            <!-- Header -->
            <tr>
              <td style="padding:24px;background:linear-gradient(135deg,#0a0000,#1a0000);border-bottom:1px solid #27272a;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td>
                      <a href="${siteUrl}" style="text-decoration:none;">
                        <img src="cid:ofm-logo" alt="OFM Mastery"
                          style="height:32px;width:auto;display:block;" />
                      </a>
                    </td>
                    <td align="right">
                      <span style="display:inline-block;padding:4px 12px;border-radius:999px;
                        font-size:11px;font-weight:700;background:#1a0000;color:#fca5a5;border:1px solid #7f1d1d;">
                        New Application
                      </span>
                    </td>
                  </tr>
                </table>
                <h1 style="margin:16px 0 4px;font-size:22px;color:#ffffff;font-weight:900;letter-spacing:-0.02em;">
                  New Application Received
                </h1>
                <p style="margin:0;font-size:13px;color:#9ca3af;">
                  Submitted on ${submittedAt} UTC
                </p>
              </td>
            </tr>

            <!-- Details -->
            <tr>
              <td style="padding:24px;">
                <table width="100%" cellpadding="0" cellspacing="0"
                  style="background:#0a0202;border:1px solid #1f1f1f;border-radius:12px;overflow:hidden;">
                  <tr>
                    <td style="padding:12px 16px;border-bottom:1px solid #1f2937;">
                      <p style="margin:0;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#6b7280;">
                        Applicant Details
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:16px;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        ${[
                          ["Full Name",  data.name],
                          ["Phone",      data.phone],
                          ["Email",      data.email],
                          ["Instagram",  data.instagram || "N/A"],
                          ["Country",    data.country],
                        ].map(([label, val]) => `
                          <tr>
                            <td style="padding:5px 12px 5px 0;font-size:12px;color:#6b7280;width:110px;">${label}</td>
                            <td style="padding:5px 0;font-size:14px;color:#f9fafb;font-weight:600;">${val}</td>
                          </tr>
                        `).join("")}
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:16px 24px 24px;border-top:1px solid #1f1f1f;">
                <p style="margin:0;font-size:11px;color:#6b7280;line-height:1.6;">
                  Review this application and follow your usual onboarding process.
                  Sent automatically by the OFM Mastery website.
                </p>
              </td>
            </tr>

          </table>
        </td></tr>
      </table>
    </div>
  `;

  return { subject, text, html };
}

// ─── Route handler ───────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "You've reached the submission limit. Please wait a few minutes before trying again." },
      { status: 429 },
    );
  }

  let body: ApplyFormData;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, phone, email, instagram, country } = body;

  if (!name || !phone || !email || !country) {
    return NextResponse.json(
      { error: "Name, phone, email, and country are required." },
      { status: 400 },
    );
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, APPLY_FROM_EMAIL } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    console.error("Missing SMTP env vars.");
    return NextResponse.json(
      { error: "Email service is not configured. Please try again later." },
      { status: 500 },
    );
  }

  const transporter = nodemailer.createTransport({
    host:   SMTP_HOST,
    port:   Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth:   { user: SMTP_USER, pass: SMTP_PASS },
  });

  const { subject, text, html } = buildEmailContent({
    name:      name.trim(),
    phone:     phone.trim(),
    email:     email.trim(),
    instagram: instagram?.trim(),
    country:   country.trim(),
  });

  try {
    const logoPath = path.join(process.cwd(), "public", "images", "logo", "main-logo.png");

    await transporter.sendMail({
      from:        APPLY_FROM_EMAIL || SMTP_USER,
      to:          APPLICATION_RECIPIENT,
      subject,
      text,
      html,
      replyTo:     email.trim(),
      attachments: [{
        filename:           "ofm-logo.png",
        path:               logoPath,
        cid:                "ofm-logo",
        contentDisposition: "inline",
      }],
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("SMTP error:", error);
    return NextResponse.json(
      { error: "Unable to send your application at this time. Please try again." },
      { status: 500 },
    );
  }
}