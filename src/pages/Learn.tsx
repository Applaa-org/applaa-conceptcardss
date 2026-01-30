import { useState, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import Flashcard from '@/components/Flashcard';
import { getConcepts, saveProgress, Concept } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Trophy, RefreshCw, ChevronLeft } from 'lucide-react';
import { Link } from '@tanstack/react-router';

// Inlined fallback data to resolve TS2307 module error
const FALLBACK_CONCEPTS: Concept[] = [
  {
    id: 999,
    title: "The James Webb Space Telescope",
    description: "The most powerful space telescope ever built, designed to solve mysteries in our solar system and beyond.",
    example_image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?auto=format&fit=crop&q=80&w=800",
    category: "Science",
    difficulty: "Intermediate",
    created_at: new Date().toISOString()
  },
  {
    id: 998,
    title: "The Silk Road",
    description: "A network of Eurasian trade routes active from the 2nd century BCE until the mid-15th century.",
    example_image: "https://images.unsplash.com/photo-1523805081446-ed9a7bb8999a?auto=format&fit=crop&q=80&w=800",
    category: "History",
    difficulty: "Beginner",
    created_at: new Date().toISOString()
  },
  {
    id: 997,
    title: "Neural Networks",
    description: "A method in artificial intelligence that teaches computers to process data in a way inspired by the human brain.",
    example_image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    category: "Computer Science",
    difficulty: "Advanced",
    created_at: new Date().toISOString()
  },
  {
    id: 996,
    title: "The Fibonacci Sequence",
    description: "A series of numbers in which each number is the sum of the two preceding ones, often found in nature.",
    example_image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=800",
    category: "Maths",
    difficulty: "Beginner",
    created_at: new Date().toISOString()
  },
  {
    id: 995,
    title: "Photosynthesis",
    description: "The process by which green plants use sunlight to synthesize foods with the help of chlorophyll.",
    example_image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=800",
    category: "Biology",
    difficulty: "Beginner",
    created_at: new Date().toISOString()
  }
];

export default function Learn() {
  const [concepts, setConcepts] = useState<Concept[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getConcepts();
      
      if (data && data.length > 0) {
        setConcepts(data.sort(() => Math.random() - 0.5));
      } else {
        setConcepts(FALLBACK_CONCEPTS.sort(() => Math.random() - 0.5));
      }
    } catch (err) {
      console.error('Error loading data, using fallbacks:', err);
      setConcepts(FALLBACK_CONCEPTS.sort(() => Math.random() - 0.5));
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSwipe = async (status: 'learned' | 'review') => {
    if (!concepts[currentIndex]) return;
    
    const currentConcept = concepts[currentIndex];
    try {
      await saveProgress(currentConcept.id, status);
    } catch (err) {
      console.error('Failed to save progress', err);
    }

    if (currentIndex < concepts.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCompleted(true);
    }
  };

  const reset = () => {
    setCurrentIndex(0);
    setCompleted(false);
    setConcepts([...concepts].sort(() => Math.random() - 0.5));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
            <Loader2 className="w-20 h-20 text-indigo-600 animate-spin relative z-10" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Generating Knowledge...</h3>
          <p className="text-slate-500 font-medium">Curating the best topics for you.</p>
        </div>
      </div>
    );
  }

  const currentConcept = concepts[currentIndex];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {!completed && (
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-10">
            <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">
              <span>Current Session</span>
              <span>{currentIndex + 1} / {concepts.length}</span>
            </div>
            <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden shadow-inner">
              <motion.div 
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${((currentIndex + 1) / concepts.length) * 100}%` }}
                transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
              />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {!completed && currentConcept ? (
            <motion.div
              key={currentConcept.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="w-full flex justify-center"
            >
              <Flashcard 
                concept={currentConcept} 
                onSwipe={handleSwipe} 
              />
            </motion.div>
          ) : completed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center max-w-md bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-indigo-100 border border-slate-100"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-8 rotate-3 shadow-xl shadow-amber-200">
                <Trophy className="text-white w-12 h-12" />
              </div>
              <h2 className="text-4xl font-black text-slate-900 mb-4">Knowledge Gained!</h2>
              <p className="text-slate-600 text-lg mb-10 leading-relaxed">
                You've just explored {concepts.length} fascinating concepts. Your brain is officially more powerful.
              </p>
              <div className="flex flex-col gap-4">
                <button
                  onClick={reset}
                  className="bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 active:scale-95"
                >
                  <RefreshCw className="w-5 h-5" /> Start New Session
                </button>
                <Link
                  to="/"
                  className="bg-slate-50 text-slate-700 py-4 rounded-2xl font-bold text-lg hover:bg-slate-100 transition-all border border-slate-200 flex items-center justify-center gap-2 active:scale-95"
                >
                  <ChevronLeft className="w-5 h-5" /> Back to Dashboard
                </Link>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>
    </div>
  );
}