// app/page.tsx (example)
import Header from "@/components/header";
import Hero from "@/components/hero";
import Features from "./features";
import HowBudMeetWorksSection from "./working";
import BudMeetAdvancedAbout from "./about";
import SafetyPrivacySection from "./safety_privacy";
import Footer from "./footer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BudMeetAdvancedAbout/>
      <Features/>
      <HowBudMeetWorksSection/>
      <SafetyPrivacySection/>
    </>
  );
}
