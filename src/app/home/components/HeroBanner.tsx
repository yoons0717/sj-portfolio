'use client'
import { useState, useEffect } from 'react'

interface BannerSlide {
    id: number
    image: string
    title: string
    subtitle: string
}

const bannerSlides: BannerSlide[] = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=1200&h=600&fit=crop',
        title: 'Creative Technology',
        subtitle: 'Pushing boundaries of digital art',
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=600&fit=crop',
        title: 'Virtual Production',
        subtitle: 'Immersive experiences redefined',
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=600&fit=crop',
        title: 'Interactive Development',
        subtitle: 'Code meets creativity',
    },
]

export default function HeroBanner() {
    const [currentSlide, setCurrentSlide] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
        }, 4000)

        return () => clearInterval(interval)
    }, [bannerSlides.length])

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
                            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70"></div>
                            <div className="relative z-10 px-4 max-w-4xl mx-auto">
                                <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight">
                                    {slide.title}
                                </h1>
                                <p className="text-white/90 text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto leading-relaxed">
                                    {slide.subtitle}
                                </p>
                                <div className="mt-8">
                                    <button className="bg-gradient-to-r from-[#c893c8] to-[#8b5a8b] text-white px-8 py-4 rounded-full font-medium text-lg hover:from-[#d4a4d4] hover:to-[#9d6b9d] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
                                        Explore Projects
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
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentSlide
                                ? 'bg-white scale-125 shadow-lg'
                                : 'bg-white/50 hover:bg-white/75 hover:scale-110'
                        }`}
                    />
                ))}
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={() =>
                    setCurrentSlide(
                        (prev) =>
                            (prev - 1 + bannerSlides.length) %
                            bannerSlides.length
                    )
                }
                className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all backdrop-blur-sm"
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
                className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all backdrop-blur-sm"
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
    )
}
