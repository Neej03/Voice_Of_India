import { motion } from 'motion/react';
import { Heart, Mail, MapPin } from 'lucide-react';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="relative pt-24 pb-12 overflow-hidden border-t border-white/10 mt-32">
      {/* Animated Wave Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="absolute top-0 left-0 w-[200%] h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNDQwIDMyMCI+PHBhdGggZmlsbD0iIzhiNWNmNiIgZmlsbC1vcGFjaXR5PSIxIiBkPSJNMCAyMjRMMTQ0MCAzMjBMMTQ0MCAzMjBMMCAzMjBaIj48L3BhdGg+PC9zdmc+')] bg-repeat-x bg-bottom opacity-30"
        />
        <motion.div
          animate={{ x: [-1000, 0] }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          className="absolute top-0 left-0 w-[200%] h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNDQwIDMyMCI+PHBhdGggZmlsbD0iI2VjNDg5OSIgZmlsbC1vcGFjaXR5PSIxIiBkPSJNMCAyODhMMTQ0MCAxOTJMMTQ0MCAzMjBMMCAzMjBaIj48L3BhdGg+PC9zdmc+')] bg-repeat-x bg-bottom opacity-20"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-6">
              <Logo />
            </div>
            <p className="text-muted-foreground max-w-sm mb-8 leading-relaxed">
              Empowering India through seamless, real-time language translation. Breaking barriers, connecting cultures, one word at a time.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'GitHub', 'LinkedIn', 'Discord'].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:border-primary/50 hover:text-primary transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  <div className="w-4 h-4 bg-current" style={{ maskImage: `url('https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/${social.toLowerCase()}.svg')`, maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center' }} />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-foreground">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'Translator', 'Language Galaxy', 'Phrasebook', 'About Us'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-foreground">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>hello@voiceofindia.in</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span>Innovation Hub, Tech Park<br />Bangalore, India 560001</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © 2026 Voice Of India. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-current mx-1" /> for India
          </p>
        </div>
      </div>
    </footer>
  );
}
