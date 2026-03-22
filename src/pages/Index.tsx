import { useState, useCallback } from 'react';
import BootSequence from '@/components/BootSequence';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import FloatingNav from '@/components/FloatingNav';

export default function Index() {
  const [booted, setBooted] = useState(false);
  const handleBootComplete = useCallback(() => setBooted(true), []);

  return (
    <div className="min-h-screen bg-background os-dot-grid relative">
      {!booted && <BootSequence onComplete={handleBootComplete} />}
      {booted && (
        <>
          <div className="fixed inset-0 os-scanline z-0" />
          <FloatingNav />
          <div className="relative z-10">
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ExperienceSection />
            <ContactSection />
            <Footer />
          </div>
        </>
      )}
    </div>
  );
}
