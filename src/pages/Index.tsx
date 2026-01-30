import Header from '@/components/Header';
import { MadeWithApplaa } from '@/components/made-with-applaa';
import { Link } from '@tanstack/react-router';
import { Brain, Sparkles, Zap, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Index() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/30 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-200/30 blur-[120px] rounded-full" />
          </div>

          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-100 mb-8 animate-bounce">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-bold text-slate-600">New: Quantum Physics Deck</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight">
              Master Complex Concepts <br />
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                In Seconds.
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              ConceptCards uses high-contrast visual learning and active recall to help you understand the world's most complex ideas through simple, interactive flashcards.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/learn" 
                className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 flex items-center justify-center gap-2 group"
              >
                Start Learning Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/about" 
                className="w-full sm:w-auto bg-white text-slate-700 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all border border-slate-200 flex items-center justify-center gap-2"
              >
                How it Works
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-grid-cols-3 gap-8">
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6">
                  <Zap className="text-indigo-600 w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Rapid Recall</h3>
                <p className="text-slate-600">Optimized for quick sessions. Learn a new concept during your coffee break.</p>
              </div>
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-violet-100 rounded-2xl flex items-center justify-center mb-6">
                  <Brain className="text-violet-600 w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Visual Examples</h3>
                <p className="text-slate-600">Every card includes a high-quality visual example to anchor the concept in your mind.</p>
              </div>
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
                  <ShieldCheck className="text-emerald-600 w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Verified Content</h3>
                <p className="text-slate-600">All educational content is curated and verified for accuracy and clarity.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-50 border-t border-slate-200 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Brain className="text-indigo-600 w-6 h-6" />
            <span className="text-lg font-bold text-slate-900">ConceptCards</span>
          </div>
          <p className="text-slate-500 text-sm mb-4">© 2024 ConceptCards. Educational purposes only.</p>
          <MadeWithApplaa />
        </div>
      </footer>
    </div>
  );
}