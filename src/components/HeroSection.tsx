import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15)_0%,transparent_50%)]" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 text-center max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 text-sm font-medium text-primary"
        >
          <Sparkles className="w-4 h-4" />
          <span>Welcome to the Language Universe</span>
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6 leading-tight">
          Translate India. <br />
          <span className="gradient-text">Connect Cultures.</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
          Experience the diversity of Indian languages through a futuristic, real-time translation engine powered by AI.
        </p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative inline-block group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full blur opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" />
          <button 
            onClick={() => document.getElementById('translator')?.scrollIntoView({ behavior: 'smooth' })}
            className="relative flex items-center gap-2 px-8 py-4 bg-background rounded-full text-foreground font-semibold text-lg border border-white/10 hover:bg-white/5 transition-colors"
          >
            Start Translating
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
