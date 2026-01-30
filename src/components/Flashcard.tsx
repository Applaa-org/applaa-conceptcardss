import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Concept } from '@/lib/api';
import { CheckCircle2, XCircle, RotateCcw, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FlashcardProps {
  concept: Concept;
  onSwipe: (status: 'learned' | 'review') => void;
}

export default function Flashcard({ concept, onSwipe }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="relative w-full max-w-md aspect-[3/4] perspective-1000">
      <motion.div
        className="w-full h-full relative preserve-3d cursor-pointer"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front Side */}
        <div className="absolute inset-0 backface-hidden bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 flex flex-col items-center justify-center text-center">
          <div className="absolute top-6 left-6">
            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full uppercase tracking-wider">
              {concept.category}
            </span>
          </div>
          <h2 className="text-4xl font-black text-slate-900 mb-4 leading-tight">
            {concept.title}
          </h2>
          <p className="text-slate-400 font-medium">Tap to reveal concept</p>
          <div className="mt-12 w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
            <RotateCcw className="text-slate-300 w-8 h-8" />
          </div>
        </div>

        {/* Back Side */}
        <div 
          className="absolute inset-0 backface-hidden bg-slate-900 rounded-3xl shadow-2xl p-8 flex flex-col rotate-y-180"
        >
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
            <div className="flex justify-between items-start mb-6">
              <span className="px-3 py-1 bg-white/10 text-white/80 text-xs font-bold rounded-full uppercase tracking-wider">
                {concept.difficulty}
              </span>
              <ExternalLink className="text-white/40 w-5 h-5" />
            </div>
            
            <div className="mb-6 rounded-2xl overflow-hidden h-40 bg-slate-800">
              <img 
                src={concept.example_image} 
                alt={concept.title}
                className="w-full h-full object-cover opacity-80"
              />
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">{concept.title}</h3>
            <p className="text-slate-300 text-lg leading-relaxed">
              {concept.description}
            </p>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSwipe('review');
              }}
              className="flex-1 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 border border-rose-500/20"
            >
              <XCircle className="w-5 h-5" /> Review
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSwipe('learned');
              }}
              className="flex-1 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-white py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 border border-emerald-500/20"
            >
              <CheckCircle2 className="w-5 h-5" /> Learned
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}