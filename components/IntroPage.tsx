
import React, { useEffect, useState } from 'react';
import ScrollCanvas from './ui/ScrollCanvas';

interface IntroPageProps {
  onStart: () => void;
  onNavigatePage: (page: any, slug?: string) => void;
  onOpenBookingModal: () => void;
}

const IntroPage: React.FC<IntroPageProps> = ({ onStart, onNavigatePage, onOpenBookingModal }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-[300vh] bg-black text-white">
      {/* Background Animation */}
      <ScrollCanvas
        frameCount={240}
        imagePath={(index) => `/card-animation/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`}
      />

      {/* Content Container - with transparency to show animation */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-20 pb-20 px-4">

        {/* Hero Section */}
        <section className="h-screen flex flex-col items-center justify-center text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Crypto Education Hub
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-300">
            Master the future of finance with interactive simulations and expert guidance.
          </p>
          <button
            onClick={onStart}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-full font-bold text-lg transition-transform hover:scale-105 shadow-lg shadow-blue-500/50"
          >
            Start Your Journey
          </button>
        </section>

        {/* Story Section 1 */}
        <section className="h-screen flex flex-col items-center justify-center text-center bg-black/30 backdrop-blur-sm rounded-xl p-8 border border-white/10 my-20 max-w-4xl opacity-0 transition-opacity duration-700"
          style={{ opacity: scrollY > 300 ? 1 : 0 }}>
          <h2 className="text-4xl font-bold mb-6">Learn by Doing</h2>
          <p className="text-lg text-gray-200 leading-relaxed">
            Forget passive reading. Dive into realistic simulations where your decisions have real consequences—without the risk.
          </p>
        </section>

        {/* Story Section 2 */}
        <section className="h-screen flex flex-col items-center justify-center text-center bg-black/30 backdrop-blur-sm rounded-xl p-8 border border-white/10 my-20 max-w-4xl opacity-0 transition-opacity duration-700"
          style={{ opacity: scrollY > 900 ? 1 : 0 }}>
          <h2 className="text-4xl font-bold mb-6">Expert Knowledge</h2>
          <p className="text-lg text-gray-200 leading-relaxed">
            Curated paths guide you from beginner concepts to advanced strategies in DeFi, NFTs, and security.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <button onClick={() => onNavigatePage('resources')} className="px-6 py-3 border border-white/30 hover:bg-white/10 rounded-lg transition-colors">
              Explore Resources
            </button>
            <button onClick={() => onNavigatePage('blog')} className="px-6 py-3 border border-white/30 hover:bg-white/10 rounded-lg transition-colors">
              Read Blog
            </button>
          </div>
        </section>

        {/* Final CTA */}
        <section className="h-[50vh] flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to evolve?</h2>
          <button
            onClick={onStart}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full font-bold text-lg transition-transform hover:scale-110 shadow-xl"
          >
            Access Dashboard
          </button>
        </section>

      </div>
    </div>
  );
};

export default IntroPage;