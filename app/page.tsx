import Image from "next/image";
import Header from "./_components/common/header";
import Footer from "./_components/common/footer";

import HeroSection from "./_components/landing/HeroSection";
import TestimonialsSection from "./_components/landing/TestimonialsSection";
import ComparisonSection from "./_components/landing/ComparisonSection";
import ProgramModulesSection from "./_components/landing/ProgramModulesSection";
import MachineThatPrintsSection from "./_components/landing/MachineThatPrintsSection";
import TestimonialsSection2 from "./_components/landing/TestimonialsSection2";
import WhoThisIsForSection from "./_components/landing/WhoThisIsForSection";
import CourseCurriculumSection from "./_components/landing/CourseCurriculumSection";
import AboutSection from "./_components/landing/AboutSection";
import BookACallSection from "./_components/landing/BookACallSection";
import FAQSection from "./_components/landing/FAQSection";


export default function Home() {
  return (
    <div className="min-h-screen bg-theme-bg">
      <main>

        <Header/>

        <HeroSection/>
        <TestimonialsSection/>
        <ComparisonSection/>
        <ProgramModulesSection/>
        <MachineThatPrintsSection/>
        <TestimonialsSection2/>
        <WhoThisIsForSection/>
        <CourseCurriculumSection/>
        <AboutSection/>
        <BookACallSection/>
        <FAQSection/>
        <Footer/>
      </main>

    </div>
  );
}
