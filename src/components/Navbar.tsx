import { motion } from 'motion/react';
import { Logo } from './Logo';

export function Navbar() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 glass-panel border-x-0 border-t-0 rounded-none bg-background/40 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <Logo />
        </a>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <button onClick={() => scrollToSection('translator')} className="hover:text-primary transition-colors">Translator</button>
          <button onClick={() => scrollToSection('galaxy')} className="hover:text-primary transition-colors">Language Galaxy</button>
          <button onClick={() => scrollToSection('phrasebook')} className="hover:text-primary transition-colors">Phrasebook</button>
          <button onClick={() => scrollToSection('about')} className="hover:text-primary transition-colors">About Us</button>
        </div>

        <button 
          onClick={() => scrollToSection('translator')}
          className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-colors text-sm font-semibold text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        >
          Try Now
        </button>
      </div>
    </motion.nav>
  );
}
