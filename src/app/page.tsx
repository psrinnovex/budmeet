// app/page.tsx
import Hero from "@/components/hero";
import Features from "@/components/features";
import HowBudMeetWorksSection from "@/components/working";
import BudMeetAdvancedAbout from "@/components/about";
import SafetyPrivacySection from "@/components/safety_privacy";

export default function HomePage() {
  return (
    // Ensure the final child (last section) has zero bottom spacing too
    <div className="[&>*:last-child]:mb-0 [&>*:last-child]:pb-0">
      <Hero />
      <BudMeetAdvancedAbout />
      <Features />
      <HowBudMeetWorksSection />
      <SafetyPrivacySection />
    </div>
  );
}
