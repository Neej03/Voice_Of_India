import { motion } from 'motion/react';
import { Wifi, WifiOff, DownloadCloud, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export function OfflineShowcase() {
  const [isOffline, setIsOffline] = useState(false);

  return (
    <section className="py-24 px-4 relative bg-gradient-to-b from-transparent to-background/50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Always <span className="gradient-text">Connected</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Even when you're not. Our lightweight models run directly on your device, ensuring seamless translation anywhere in India.
          </p>
        </div>

        <div className="glass-panel rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 space-y-8">
              <div className="flex items-center gap-4">
                <div className={`p-4 rounded-2xl transition-colors duration-500 ${isOffline ? 'bg-destructive/20 text-destructive' : 'bg-primary/20 text-primary'}`}>
                  {isOffline ? <WifiOff className="w-8 h-8" /> : <Wifi className="w-8 h-8" />}
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-1">
                    {isOffline ? 'Offline Mode Active' : 'Online Mode Active'}
                  </h3>
                  <p className="text-muted-foreground">
                    {isOffline ? 'Using local on-device models.' : 'Connected to cloud AI engine.'}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-lg">Zero latency translation</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-lg">Privacy-first (data stays on device)</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-lg">Supports 12+ major Indian languages</span>
                </div>
              </div>

              <button 
                onClick={() => setIsOffline(!isOffline)}
                className="px-6 py-3 rounded-full border-2 border-primary/50 text-primary font-semibold hover:bg-primary/10 transition-colors flex items-center gap-2"
              >
                Toggle Connection State
              </button>
            </div>

            <div className="flex-1 relative w-full max-w-sm">
              <motion.div 
                className="glass-panel rounded-2xl p-6 border border-white/10 shadow-2xl relative z-10"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex justify-between items-center mb-6">
                  <span className="font-semibold">Language Packs</span>
                  <DownloadCloud className="w-5 h-5 text-muted-foreground" />
                </div>
                
                <div className="space-y-4">
                  {['Hindi (12MB)', 'Bengali (10MB)', 'Tamil (14MB)'].map((pack, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                      <span className="font-medium">{pack}</span>
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.2 }}
                        className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center"
                      >
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      </motion.div>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              {/* Decorative background elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
