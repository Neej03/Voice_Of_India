import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRightLeft, Mic, Volume2, Sparkles, WifiOff } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const LANGUAGES = [
  { code: 'hi', name: 'Hindi' },
  { code: 'bn', name: 'Bengali' },
  { code: 'te', name: 'Telugu' },
  { code: 'mr', name: 'Marathi' },
  { code: 'ta', name: 'Tamil' },
  { code: 'gu', name: 'Gujarati' },
  { code: 'ur', name: 'Urdu' },
  { code: 'kn', name: 'Kannada' },
  { code: 'or', name: 'Odia' },
  { code: 'ml', name: 'Malayalam' },
  { code: 'pa', name: 'Punjabi' },
  { code: 'as', name: 'Assamese' },
  { code: 'en', name: 'English' },
];

export function TranslatorSection() {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('hi');
  const [isTranslating, setIsTranslating] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const [isOffline, setIsOffline] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const getSpeechLang = (code: string) => {
    const map: Record<string, string> = {
      'en': 'en-IN',
      'hi': 'hi-IN',
      'bn': 'bn-IN',
      'te': 'te-IN',
      'mr': 'mr-IN',
      'ta': 'ta-IN',
      'gu': 'gu-IN',
      'ur': 'ur-IN',
      'kn': 'kn-IN',
      'ml': 'ml-IN',
      'pa': 'pa-IN',
    };
    return map[code] || code;
  };

  const handleVoiceInput = () => {
    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = getSpeechLang(sourceLang);
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSourceText((prev) => prev ? prev + ' ' + transcript : transcript);
    };

    recognition.onerror = (event: any) => {
      setIsListening(false);
      if (event.error === 'no-speech') {
        // This is a common, benign error when the user doesn't speak quickly enough.
        // We just stop listening without showing a scary error.
        console.log("Speech recognition stopped: No speech detected.");
        return;
      }
      
      console.error("Speech recognition error:", event.error);
      if (event.error === 'network') {
        alert("Network error: Speech recognition failed. This might be due to browser restrictions, missing language support, or lack of internet connection.");
      } else if (event.error === 'not-allowed') {
        alert("Microphone access denied. Please allow microphone permissions to use voice input.");
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    try {
      recognition.start();
    } catch (e) {
      console.error("Failed to start speech recognition:", e);
      setIsListening(false);
    }
  };

  const handleTranslate = async () => {
    if (!sourceText.trim() || isOffline) return;
    
    setIsTranslating(true);
    setTranslatedText('');
    setSuggestion('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const sourceName = LANGUAGES.find(l => l.code === sourceLang)?.name || sourceLang;
      const targetName = LANGUAGES.find(l => l.code === targetLang)?.name || targetLang;

      const prompt = `Translate the following text from ${sourceName} to ${targetName}. 
      Provide ONLY the translated text.
      Text: "${sourceText}"`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      setTranslatedText(response.text || 'Translation failed.');

      // Get a smart suggestion/cultural context
      const suggestionPrompt = `Given the translation of "${sourceText}" from ${sourceName} to ${targetName}, provide a very brief (1 sentence) cultural context, alternative phrasing, or pronunciation tip.`;
      const suggestionResponse = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: suggestionPrompt,
      });
      setSuggestion(suggestionResponse.text || '');

    } catch (error) {
      console.error('Translation error:', error);
      setTranslatedText('Error: Could not translate. Please check your API key or connection.');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSwap = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const handleSpeak = () => {
    if (!translatedText) return;

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(translatedText);
    utterance.lang = getSpeechLang(targetLang);

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  const sourceLangName = LANGUAGES.find(l => l.code === sourceLang)?.name || sourceLang;
  const targetLangName = LANGUAGES.find(l => l.code === targetLang)?.name || targetLang;

  return (
    <section id="translator" className="py-24 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-display font-bold">
            Live <span className="gradient-text">Translator</span>
          </h2>
          
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Offline Mode</span>
            <button 
              onClick={() => setIsOffline(!isOffline)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isOffline ? 'bg-destructive' : 'bg-primary/50'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isOffline ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>

        {isOffline && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 rounded-xl bg-destructive/20 border border-destructive/50 flex items-center gap-3 text-destructive-foreground"
          >
            <WifiOff className="w-5 h-5" />
            <p>Offline Mode Active. Using cached local models (Demo).</p>
          </motion.div>
        )}

        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
          {/* Source Box */}
          <motion.div 
            className="glass-panel rounded-3xl p-6 relative group"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            
            <div className="flex justify-between items-center mb-4">
              <select 
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
                className="bg-transparent text-lg font-medium outline-none cursor-pointer hover:text-primary transition-colors"
              >
                {LANGUAGES.map(lang => (
                  <option key={lang.code} value={lang.code} className="bg-background">{lang.name}</option>
                ))}
              </select>
              <button 
                onClick={handleVoiceInput}
                className={`p-2 rounded-full transition-colors ${
                  isListening 
                    ? 'bg-red-500/20 text-red-500 animate-pulse' 
                    : 'hover:bg-white/10 text-muted-foreground hover:text-foreground'
                }`}
                title={isListening ? "Listening..." : "Click to speak"}
              >
                <Mic className="w-5 h-5" />
              </button>
            </div>
            
            <textarea
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder={`Type something in ${sourceLangName} to translate...`}
              className="w-full h-40 bg-transparent resize-none outline-none text-2xl placeholder:text-muted-foreground/50"
            />
          </motion.div>

          {/* Swap Button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSwap}
            className="p-4 rounded-full glass-panel text-primary hover:text-white hover:bg-primary transition-colors mx-auto z-10"
          >
            <ArrowRightLeft className="w-6 h-6" />
          </motion.button>

          {/* Target Box */}
          <motion.div 
            className="glass-panel rounded-3xl p-6 relative group"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-bl from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            
            <div className="flex justify-between items-center mb-4">
              <select 
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="bg-transparent text-lg font-medium outline-none cursor-pointer hover:text-secondary transition-colors"
              >
                {LANGUAGES.map(lang => (
                  <option key={lang.code} value={lang.code} className="bg-background">{lang.name}</option>
                ))}
              </select>
              <button 
                onClick={handleSpeak}
                disabled={!translatedText}
                className={`p-2 rounded-full transition-colors ${
                  isPlaying 
                    ? 'bg-secondary/20 text-secondary animate-pulse' 
                    : 'hover:bg-white/10 text-muted-foreground hover:text-foreground'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                title={isPlaying ? "Stop speaking" : "Listen to translation"}
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
            
            <div className="w-full h-40 relative">
              <AnimatePresence mode="wait">
                {isTranslating ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                  >
                    <div className="flex items-center gap-2 text-2xl font-medium">
                      <motion.span
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary"
                      >
                        Translating
                      </motion.span>
                      <motion.span 
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "circInOut" }}
                        className="w-1.5 h-6 bg-primary rounded-sm shadow-[0_0_8px_rgba(139,92,246,0.8)]"
                      />
                    </div>
                    <div className="flex gap-2">
                      {[0, 1, 2].map(i => (
                        <motion.div
                          key={i}
                          animate={{ 
                            scale: [1, 1.5, 1],
                            opacity: [0.3, 1, 0.3],
                            y: [0, -4, 0]
                          }}
                          transition={{ 
                            duration: 1.2, 
                            repeat: Infinity, 
                            delay: i * 0.2,
                            ease: "easeInOut"
                          }}
                          className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_rgba(236,72,153,0.6)]"
                        />
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.p
                    key="text"
                    initial={{ opacity: 0, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    className="text-2xl text-foreground/90"
                  >
                    {translatedText || <span className="text-muted-foreground/30">Translation will appear here in {targetLangName}...</span>}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleTranslate}
            disabled={isTranslating || !sourceText.trim() || isOffline}
            className="px-12 py-4 bg-gradient-to-r from-primary to-secondary rounded-full font-bold text-lg shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isTranslating ? 'Translating...' : 'Translate Now'}
          </motion.button>

          <AnimatePresence>
            {suggestion && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass-panel px-6 py-4 rounded-2xl flex items-start gap-3 max-w-2xl"
              >
                <Sparkles className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">AI Insight:</strong> {suggestion}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
