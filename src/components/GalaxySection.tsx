import { motion } from 'motion/react';
import React from 'react';

const LANGUAGES = [
  { name: 'Hindi', native: 'हिन्दी', radius: 120, angle: 0, color: '#8b5cf6', phrase: 'नमस्ते (Namaste)', speakers: '528M+', region: 'North & Central India' },
  { name: 'Bengali', native: 'বাংলা', radius: 140, angle: 180, color: '#ec4899', phrase: 'নমস্কার (Nomoshkar)', speakers: '97M+', region: 'East India' },
  { name: 'Telugu', native: 'తెలుగు', radius: 160, angle: 90, color: '#3b82f6', phrase: 'నమస్కారం (Namaskaram)', speakers: '81M+', region: 'South India' },
  { name: 'Marathi', native: 'मराठी', radius: 180, angle: 270, color: '#10b981', phrase: 'नमस्कार (Namaskar)', speakers: '83M+', region: 'West India' },
  { name: 'Tamil', native: 'தமிழ்', radius: 200, angle: 45, color: '#f59e0b', phrase: 'வணக்கம் (Vanakkam)', speakers: '69M+', region: 'South India' },
  { name: 'Gujarati', native: 'ગુજરાતી', radius: 220, angle: 225, color: '#ef4444', phrase: 'નમસ્તે (Namaste)', speakers: '55M+', region: 'West India' },
  { name: 'Urdu', native: 'اردو', radius: 240, angle: 135, color: '#8b5cf6', phrase: 'آداب (Aadab)', speakers: '50M+', region: 'North India' },
  { name: 'Kannada', native: 'ಕನ್ನಡ', radius: 260, angle: 315, color: '#ec4899', phrase: 'ನಮಸ್ಕಾರ (Namaskara)', speakers: '43M+', region: 'South India' },
  { name: 'Odia', native: 'ଓଡ଼ିଆ', radius: 280, angle: 30, color: '#3b82f6', phrase: 'ନମସ୍କାର (Namaskar)', speakers: '38M+', region: 'East India' },
  { name: 'Malayalam', native: 'മലയാളം', radius: 300, angle: 210, color: '#10b981', phrase: 'നമസ്കാരം (Namaskaram)', speakers: '38M+', region: 'South India' },
  { name: 'Punjabi', native: 'ਪੰਜਾਬੀ', radius: 320, angle: 120, color: '#f59e0b', phrase: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ (Sat Sri Akal)', speakers: '33M+', region: 'North India' },
  { name: 'Assamese', native: 'অসমীয়া', radius: 340, angle: 300, color: '#ef4444', phrase: 'নমস্কাৰ (Nomoshkar)', speakers: '15M+', region: 'Northeast India' },
];

export function GalaxySection() {
  return (
    <section id="galaxy" className="py-32 relative overflow-x-hidden bg-black/50">
      <style>{`
        @keyframes orbit {
          from { transform: rotate(var(--start-angle)); }
          to { transform: rotate(var(--end-angle)); }
        }
        @keyframes counter-orbit {
          from { transform: translate(-50%, -50%) rotate(calc(-1 * var(--start-angle))); }
          to { transform: translate(-50%, -50%) rotate(calc(-1 * var(--end-angle))); }
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
          The <span className="gradient-text">Language Galaxy</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore the rich diversity of Indian languages. Hover over an orb to discover its unique greeting.
        </p>
      </div>

      <div className="relative h-[800px] w-full max-w-[1000px] mx-auto flex items-center justify-center">
        {/* Center Sun */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-primary via-secondary to-accent blur-xl opacity-50"
        />
        <div className="absolute w-24 h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center z-10 shadow-[0_0_50px_rgba(139,92,246,0.5)]">
          <span className="font-bold text-xl tracking-widest">INDIA</span>
        </div>

        {/* Orbits and Planets */}
        {LANGUAGES.map((lang, index) => {
          const orbitDuration = 30 + index * 5;
          
          return (
            <div
              key={lang.name}
              className="absolute rounded-full border border-white/5"
              style={{
                width: lang.radius * 2,
                height: lang.radius * 2,
                '--start-angle': `${lang.angle}deg`,
                '--end-angle': `${lang.angle + 360}deg`,
                animation: `orbit ${orbitDuration}s linear infinite`,
              } as React.CSSProperties}
            >
              <div
                className="absolute z-20"
                style={{
                  top: '50%',
                  left: 0,
                  '--start-angle': `${lang.angle}deg`,
                  '--end-angle': `${lang.angle + 360}deg`,
                  animation: `counter-orbit ${orbitDuration}s linear infinite`,
                } as React.CSSProperties}
              >
                <div
                  className="flex items-center justify-center whitespace-nowrap overflow-hidden relative"
                  style={{
                    backgroundColor: `${lang.color}90`,
                    boxShadow: `0 0 20px ${lang.color}`,
                    borderRadius: 999,
                    backdropFilter: 'blur(8px)',
                    padding: '14px',
                    border: `1px solid ${lang.color}`,
                  }}
                >
                  <span 
                    className="font-bold text-white leading-none flex items-center justify-center" 
                    style={{ 
                      fontSize: '1.2rem',
                      minWidth: '28px',
                      minHeight: '28px',
                      textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                    }}
                  >
                    {lang.native.charAt(0)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
