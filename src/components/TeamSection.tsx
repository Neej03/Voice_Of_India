import { motion } from 'motion/react';
import { Github, Linkedin, Twitter } from 'lucide-react';

const TEAM = [
  {
    name: 'Aarav Sharma',
    role: 'AI Engineer',
    image: 'https://picsum.photos/seed/aarav/200/200',
    skills: { 'Machine Learning': 95, 'Python': 90, 'NLP': 85 },
  },
  {
    name: 'Priya Patel',
    role: 'Frontend Developer',
    image: 'https://picsum.photos/seed/priya/200/200',
    skills: { 'React': 98, 'Tailwind': 95, 'Framer Motion': 90 },
  },
  {
    name: 'Rohan Gupta',
    role: 'UX Designer',
    image: 'https://picsum.photos/seed/rohan/200/200',
    skills: { 'Figma': 95, 'Prototyping': 90, 'User Research': 85 },
  },
];

export function TeamSection() {
  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Meet the <span className="gradient-text">Creators</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The passionate team behind Voice Of India, dedicated to breaking down language barriers across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="glass-panel p-8 rounded-3xl text-center group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 border-4 border-white/10 shadow-[0_0_30px_rgba(139,92,246,0.3)]"
                >
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </motion.div>
                
                <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-6">{member.role}</p>

                <div className="space-y-4 mb-8 text-left">
                  {Object.entries(member.skills).map(([skill, value]) => (
                    <div key={skill}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">{skill}</span>
                        <span className="font-medium">{value}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${value}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center gap-4">
                  <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/20 transition-colors text-muted-foreground hover:text-white">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/20 transition-colors text-muted-foreground hover:text-white">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-white/20 transition-colors text-muted-foreground hover:text-white">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
