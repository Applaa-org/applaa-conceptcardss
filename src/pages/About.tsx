import Header from '@/components/Header';
import { MadeWithApplaa } from '@/components/made-with-applaa';
import { ShieldAlert, BookOpen, Users, Globe } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <main className="flex-1 py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-5xl font-black text-slate-900 mb-8">About ConceptCards</h1>
          
          <div className="bg-amber-50 border border-amber-200 rounded-3xl p-8 mb-12 flex gap-6 items-start">
            <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center shrink-0">
              <ShieldAlert className="text-amber-600 w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-amber-900 mb-2">Educational Disclaimer</h3>
              <p className="text-amber-800 leading-relaxed">
                ConceptCards is designed for educational and informational purposes only. While we strive for accuracy, complex concepts are often simplified for learning purposes. This platform should not be used as a primary source for critical academic or professional decisions.
              </p>
            </div>
          </div>

          <div className="prose prose-slate prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
            <p className="text-slate-600 mb-8">
              We believe that the world's most powerful ideas shouldn't be locked behind academic jargon or dense textbooks. Our mission is to democratize knowledge by breaking down complex concepts into digestible, visual, and interactive experiences.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center shrink-0">
                  <BookOpen className="text-indigo-600 w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Curated Content</h4>
                  <p className="text-slate-500 text-sm">Hand-picked topics from physics, biology, tech, and more.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center shrink-0">
                  <Users className="text-violet-600 w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Community Driven</h4>
                  <p className="text-slate-500 text-sm">Built for learners, by learners who value clarity.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                  <Globe className="text-emerald-600 w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Global Access</h4>
                  <p className="text-slate-500 text-sm">Available anywhere, anytime, on any device.</p>
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mb-6">The Science of Learning</h2>
            <p className="text-slate-600">
              ConceptCards utilizes two core principles of cognitive science:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-4">
              <li><strong>Active Recall:</strong> By challenging yourself to remember the concept before flipping the card, you strengthen neural pathways.</li>
              <li><strong>Dual Coding:</strong> Combining verbal descriptions with visual imagery helps the brain encode information more effectively.</li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="py-12 border-t border-slate-200">
        <div className="container mx-auto px-4 text-center">
          <MadeWithApplaa />
        </div>
      </footer>
    </div>
  );
}