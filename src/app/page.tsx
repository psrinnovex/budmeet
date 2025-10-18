// app/page.tsx
import Hero from "@/components/hero";
import Features from "@/components/features";
import HowBudMeetWorksSection from "@/components/working";
import BudMeetAdvancedAbout from "@/components/about";
import SafetyPrivacySection from "@/components/safety_privacy";

function Clip({ children }: { children: React.ReactNode }) {
  // Guards against any child (3D Canvas, absolute glows, wide images) exceeding 100vw
  return (
    <section className="relative w-full max-w-[100vw] overflow-x-clip">
      {children}
    </section>
  );
}

export default function HomePage() {
  return (
    <main className="relative overflow-x-clip">
      <div className="[&>*:last-child]:mb-0 [&>*:last-child]:pb-0">
        <Clip>
          <Hero />
        </Clip>

        <Clip>
          <BudMeetAdvancedAbout />
        </Clip>

        <Clip>
          <Features />
        </Clip>

        <Clip>
          <HowBudMeetWorksSection />
        </Clip>

        <Clip>
          <SafetyPrivacySection />
        </Clip>
      </div>
    </main>
  );
}
