import { Link } from '@tanstack/react-router';
import { Brain, BookOpen, Layers, Info, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <Brain className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            ConceptCards
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors flex items-center gap-2">
            <BookOpen className="w-4 h-4" /> Home
          </Link>
          <Link to="/learn" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors flex items-center gap-2">
            <Layers className="w-4 h-4" /> Learn
          </Link>
          <Link to="/about" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors flex items-center gap-2">
            <Info className="w-4 h-4" /> About
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <Link 
            to="/learn" 
            className="bg-indigo-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-indigo-700 transition-all shadow-md hover:shadow-indigo-200 active:scale-95"
          >
            Start Learning
          </Link>
        </div>
      </div>
    </header>
  );
}