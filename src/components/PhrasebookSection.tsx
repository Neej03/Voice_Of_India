import { motion } from 'motion/react';
import { Heart, Bookmark, Share2 } from 'lucide-react';
import { useState } from 'react';

const PHRASES = [
  { id: 1, en: "How are you?", hi: "आप कैसे हैं?", lang: "Hindi", likes: 124 },
  { id: 2, en: "Thank you very much", bn: "আপনাকে অনেক ধন্যবাদ", lang: "Bengali", likes: 89 },
  { id: 3, en: "Where is the station?", ta: "ரயில் நிலையம் எங்கே உள்ளது?", lang: "Tamil", likes: 56 },
  { id: 4, en: "I love this food", te: "నాకు ఈ ఆహారం చాలా ఇష్టం", lang: "Telugu", likes: 210 },
  { id: 5, en: "See you later", mr: "नंतर भेटूया", lang: "Marathi", likes: 45 },
  { id: 6, en: "What is your name?", gu: "તમારું નામ શું છે?", lang: "Gujarati", likes: 78 },
];

export function PhrasebookSection() {
  const [liked, setLiked] = useState<Record<number, boolean>>({});

  const toggleLike = (id: number) => {
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="phrasebook" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Community <span className="gradient-text">Phrasebook</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover and save popular phrases curated by our vibrant community of language enthusiasts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PHRASES.map((phrase, index) => (
            <motion.div
              key={phrase.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-panel p-6 rounded-2xl flex flex-col justify-between h-full group"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-semibold uppercase tracking-wider">
                    {phrase.lang}
                  </span>
                  <div className="flex gap-2">
                    <button className="text-muted-foreground hover:text-white transition-colors">
                      <Bookmark className="w-4 h-4" />
                    </button>
                    <button className="text-muted-foreground hover:text-white transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                  {phrase.en}
                </h3>
                <p className="text-xl text-muted-foreground font-medium mb-6">
                  {phrase.hi || phrase.bn || phrase.ta || phrase.te || phrase.mr || phrase.gu}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                <button 
                  onClick={() => toggleLike(phrase.id)}
                  className={`flex items-center gap-2 transition-colors ${liked[phrase.id] ? 'text-secondary' : 'text-muted-foreground hover:text-secondary'}`}
                >
                  <Heart className={`w-5 h-5 ${liked[phrase.id] ? 'fill-current' : ''}`} />
                  <span className="font-medium">{phrase.likes + (liked[phrase.id] ? 1 : 0)}</span>
                </button>
                <button className="text-sm font-medium text-accent hover:underline">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button className="px-8 py-3 rounded-full border border-white/20 hover:bg-white/10 transition-colors font-semibold">
            Explore More Phrases
          </button>
        </div>
      </div>
    </section>
  );
}
