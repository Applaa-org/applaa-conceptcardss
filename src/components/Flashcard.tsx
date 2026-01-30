import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Concept } from '@/lib/api';
import { BookOpen, CheckCircle2, Info, X, ExternalLink } from 'lucide-react';

interface FlashcardProps {
  concept: Concept;
  onSwipe: (status: 'learned' | 'review') => void;
}

export default function Flashcard({ concept, onSwipe }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleReviewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDetails(true);
  };

  const handleCloseDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDetails(false);
  };

  const handleFinalReview = () => {
    setShowDetails(false);
    onSwipe('review');
  };

  return (
    <div className="relative w-full max-w-md aspect-[3/4] perspective-1000">
      <AnimatePresence mode="wait">
        {!showDetails ? (
          <motion.div
            key="card"
            className="w-full h-full cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
            initial={{ rotateY: 0 }}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Front Side */}
            <div 
              className="absolute inset-0 w-full h-full bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 p-8 flex flex-col items-center justify-center text-center backface-hidden"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mb-8">
                <BookOpen className="text-indigo-600 w-10 h-10" />
              </div>
              <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full uppercase tracking-wider mb-4">
                {concept.category}
              </span>
              <h2 className="text-3xl font-black text-slate-900 leading-tight">
                {concept.title}
              </h2>
              <p className="mt-6 text-slate-400 font-medium animate-pulse">
                Tap to reveal concept
              </p>
            </div>

            {/* Back Side */}
            <div 
              className="absolute inset-0 w-full h-full bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col backface-hidden"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <div className="h-48 w-full relative">
                <img 
                  src={concept.example_image} 
                  alt={concept.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
              </div>
              
              <div className="flex-1 p-8 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`w-2 h-2 rounded-full ${
                    concept.difficulty === 'Beginner' ? 'bg-green-500' :
                    concept.difficulty === 'Intermediate' ? 'bg-amber-500' : 'bg-rose-500'
                  }`} />
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    {concept.difficulty} Level
                  </span>
                </div>
                
                <p className="text-slate-700 text-lg leading-relaxed font-medium">
                  {concept.description}
                </p>

                <div className="mt-auto flex gap-4">
                  <button
                    onClick={handleReviewClick}
                    className="flex-1 bg-slate-100 text-slate-700 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                  >
                    <Info className="w-5 h-5" /> Review
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSwipe('learned');
                    }}
                    className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-100"
                  >
                    <CheckCircle2 className="w-5 h-5" /> Mastered
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="details"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute inset-0 w-full h-full bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 p-8 flex flex-col z-50 overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-black text-slate-900">{concept.title}</h3>
                <p className="text-indigo-600 font-bold text-sm uppercase tracking-wider">Deep Dive Analysis</p>
              </div>
              <button 
                onClick={handleCloseDetails}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>

            <div className="prose prose-slate max-w-none flex-1">
              <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100 mb-6">
                <h4 className="text-indigo-900 font-bold mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" /> Key Insights
                </h4>
                <p className="text-slate-700 leading-relaxed">
                  {concept.detailed_info || `This concept explores the fundamental principles of ${concept.category}. It is essential for understanding how complex systems interact within this field. Further research suggests that mastering this topic provides a significant advantage in ${concept.difficulty.toLowerCase()} level studies.`}
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-slate-900">Why it matters:</h4>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                    <span>Provides a framework for critical thinking in {concept.category}.</span>
                  </li>
                  <li className="flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                    <span>Connects theoretical knowledge with real-world applications.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col gap-3">
              <a 
                href={`https://www.google.com/search?q=${encodeURIComponent(concept.title + ' ' + concept.category)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-indigo-600 font-bold hover:underline py-2"
              >
                <ExternalLink className="w-4 h-4" /> Search more on Google
              </a>
              <button
                onClick={handleFinalReview}
                className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
              >
                Got it, move to next
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}