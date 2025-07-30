'use client';
import { useState, useEffect } from 'react';

interface BannerSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
}

const bannerSlides: BannerSlide[] = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=1200&h=600&fit=crop',
    title: 'CREATIVE TECHNOLOGY',
    subtitle: 'PUSHING BOUNDARIES OF DIGITAL ART',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=600&fit=crop',
    title: 'VIRTUAL PRODUCTION',
    subtitle: 'IMMERSIVE EXPERIENCES REDEFINED',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=600&fit=crop',
    title: 'INTERACTIVE DEVELOPMENT',
    subtitle: 'CODE MEETS CREATIVITY',
  },
];

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [bannerSlides.length]);

  return (
    <div className="w-full relative">
      <div className="relative overflow-hidden min-h-[70vh]">
        {bannerSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-center items-center text-center min-h-[70vh] relative"
              style={{ backgroundImage: `url("${slide.image}")` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-surface/70 via-surface/80 to-surface/90"></div>
              
              {/* Gaming Grid Overlay */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `
                  linear-gradient(rgba(57, 255, 20, 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(57, 255, 20, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: '30px 30px'
              }}></div>

              <div className="relative z-10 px-4 max-w-4xl mx-auto">
                <h1 className="text-accent text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-wider leading-tight drop-shadow-lg" style={{ fontFamily: '"Orbitron", "Exo 2", monospace' }}>
                  {slide.title}
                </h1>
                <p className="text-primary text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto leading-relaxed font-bold tracking-wide" style={{ fontFamily: '"Orbitron", "Exo 2", monospace' }}>
                  {slide.subtitle}
                </p>
                <div className="mt-8">
                  <button className="bg-gradient-to-r from-accent to-neon-purple text-surface px-8 py-4 font-black text-lg tracking-wider hover:from-neon-yellow hover:to-accent transition-all duration-300 shadow-xl hover:shadow-accent/20 transform hover:skew-x-12" style={{ fontFamily: '"Orbitron", "Exo 2", monospace' }}>
                    EXPLORE PROJECTS
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-4 h-4 border-2 transition-all duration-300 ${
              index === currentSlide
                ? 'bg-accent border-accent scale-125 shadow-lg shadow-accent/50'
                : 'bg-transparent border-accent hover:bg-accent hover:scale-110'
            }`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() =>
          setCurrentSlide(
            (prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length,
          )
        }
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-surface-elevated border-2 border-accent hover:bg-accent hover:text-surface text-accent p-3 transition-all duration-300"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={() =>
          setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
        }
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-surface-elevated border-2 border-accent hover:bg-accent hover:text-surface text-accent p-3 transition-all duration-300"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}
