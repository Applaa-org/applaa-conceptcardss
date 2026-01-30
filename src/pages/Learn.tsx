import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Flashcard from '@/components/Flashcard';
import { getConcepts, saveProgress, Concept } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Trophy, RefreshCw, ChevronLeft, AlertCircle } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export default function Learn() {
  const [concepts, setConcepts] = useState<Concept[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await getConcepts();
        if (data && data.length > 0) {
          setConcepts(data.sort(() => Math.random() - 0.5));
        } else {
          setConcepts([]);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load concepts. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

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
    if (concepts.length > 0) {
      setConcepts([...concepts].sort(() => Math.random() - 0.5));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (error || concepts.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="text-center max-w-md p-8 bg-white rounded-3xl shadow-xl border border-slate-100">
            <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="text-rose-600 w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">No Concepts Found</h2>
            <p className="text-slate-600 mb-8">
              {error || "We couldn't find any concepts to learn right now. Please check back later."}
            </p>
            <Link
              to="/"
              className="inline-flex items-center justify-center bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all"
            >
              Back to Home
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const currentConcept = concepts[currentIndex];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Progress Bar */}
        {!completed && (
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-full max-w-md px-4">
            <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
              <span>Progress</span>
              <span>{currentIndex + 1} / {concepts.length}</span>
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-indigo-600"
                initial={{ width: 0 }}
                animate={{ width: `${((currentIndex + 1) / concepts.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {!completed && currentConcept ? (
            <motion.div
              key={currentConcept.id}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.9 }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
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
              className="text-center max-w-md"
            >
              <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-amber-100">
                <Trophy className="text-amber-600 w-12 h-12" />
              </div>
              <h2 className="text-4xl font-black text-slate-900 mb-4">Session Complete!</h2>
              <p className="text-slate-600 text-lg mb-10">
                You've mastered {concepts.length} new concepts today. Keep the momentum going!
              </p>
              <div className="flex flex-col gap-4">
                <button
                  onClick={reset}
                  className="bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" /> Practice Again
                </button>
                <Link
                  to="/"
                  className="bg-white text-slate-700 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all border border-slate-200 flex items-center justify-center gap-2"
                >
                  <ChevronLeft className="w-5 h-5" /> Back to Home
                </Link>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>
    </div>
  );
}