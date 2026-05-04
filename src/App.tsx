/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ParticleBackground } from './components/ParticleBackground';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TranslatorSection } from './components/TranslatorSection';
import { GalaxySection } from './components/GalaxySection';
import { PhrasebookSection } from './components/PhrasebookSection';
import { OfflineShowcase } from './components/OfflineShowcase';
import { TeamSection } from './components/TeamSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary-foreground">
      <ParticleBackground />
      <Navbar />
      
      <main className="relative z-10">
        <HeroSection />
        <TranslatorSection />
        <GalaxySection />
        <PhrasebookSection />
        <OfflineShowcase />
        <TeamSection />
      </main>

      <Footer />
    </div>
  );
}
