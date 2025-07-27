'use client'

import React, { useState, useEffect } from 'react'
import { Search, Menu, Twitter, Instagram, Linkedin } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

import { useRouter } from 'next/navigation'

interface Category {
    id: number
    name: string
    thumbnail: string
    count: number
}

interface Profile {
    name: string
    title: string
    description: string
    avatar: string
    heroImage: string
}

interface BannerSlide {
    id: number
    image: string
    title: string
    subtitle: string
}

const mockBannerSlides: BannerSlide[] = [
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

const mockCategories: Category[] = [
    {
        id: 1,
        name: 'Lectures',
        thumbnail:
            'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=400&fit=crop',
        count: 12,
    },
    {
        id: 2,
        name: 'Development',
        thumbnail:
            'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop',
        count: 8,
    },
    {
        id: 3,
        name: 'VR/AR Production',
        thumbnail:
            'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop',
        count: 15,
    },
    {
        id: 4,
        name: 'Proposals',
        thumbnail:
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        count: 6,
    },
]

const mockProfile: Profile = {
    name: 'Sophia Carter',
    title: 'Multimedia Artist & Technologist',
    description:
        'Creative technologist passionate about merging art and technology to create immersive experiences. Specializing in virtual production, interactive installations, and digital storytelling.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    heroImage:
        'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=1200&h=600&fit=crop',
}

export default function HomePage() {
    const [categories, setCategories] = useState<Category[]>([])
    const [profile, setProfile] = useState<Profile | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [currentSlide, setCurrentSlide] = useState(0)

    const router = useRouter()

    useEffect(() => {
        // 실제 구현시에는 Supabase에서 데이터를 가져옵니다
        setTimeout(() => {
            setCategories(mockCategories)
            setProfile(mockProfile)
            setIsLoading(false)
        }, 1000)
    }, [])

    // 자동 슬라이드 효과
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % mockBannerSlides.length)
        }, 4000)

        return () => clearInterval(interval)
    }, [])

    const handleCategoryClick = (categoryName: string) => {
        // console.log(`Navigate to ${categoryName} projects`)
        router.push(`/projects/${categoryName.toLowerCase()}`)
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#221122] flex items-center justify-center">
                <div className="text-white text-lg">Loading...</div>
            </div>
        )
    }

    return (
        <div
            className="relative flex min-h-screen flex-col bg-[#221122]"
            style={{ fontFamily: '"Spline Sans", "Noto Sans", sans-serif' }}
        >
            <Header />

            {/* Hero Banner Slider */}
            <div className="w-full relative">
                <div className="relative overflow-hidden min-h-[60vh]">
                    {mockBannerSlides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={`absolute inset-0 transition-opacity duration-1000 ${
                                index === currentSlide
                                    ? 'opacity-100'
                                    : 'opacity-0'
                            }`}
                        >
                            <div
                                className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-center items-center text-center overflow-hidden bg-[#221122] min-h-[60vh] relative"
                                style={{
                                    backgroundImage: `url("${slide.image}")`,
                                }}
                            >
                                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                                <div className="relative z-10 px-4">
                                    <h1 className="text-white text-5xl md:text-6xl font-bold mb-4 tracking-tight">
                                        {slide.title}
                                    </h1>
                                    <p className="text-white text-lg md:text-xl max-w-2xl mx-auto opacity-90">
                                        {slide.subtitle}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Slide Indicators */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                    {mockBannerSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                index === currentSlide
                                    ? 'bg-white scale-125'
                                    : 'bg-white bg-opacity-50 hover:bg-opacity-75 hover:scale-110'
                            }`}
                        />
                    ))}
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={() =>
                        setCurrentSlide(
                            (prev) =>
                                (prev - 1 + mockBannerSlides.length) %
                                mockBannerSlides.length
                        )
                    }
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-2 rounded-full transition-all"
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
                        setCurrentSlide(
                            (prev) => (prev + 1) % mockBannerSlides.length
                        )
                    }
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white p-2 rounded-full transition-all"
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

            {/* Main Content */}
            <div className="px-4 md:px-20 flex flex-1 justify-center py-10">
                <div className="flex flex-col max-w-[1200px] flex-1">
                    {/* Profile Section */}
                    <div className="flex p-6 mb-8">
                        <div className="flex w-full flex-col gap-6 md:flex-row md:justify-between md:items-center">
                            <div className="flex gap-6">
                                <div
                                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-36 w-36"
                                    style={{
                                        backgroundImage: `url("${profile?.avatar}")`,
                                    }}
                                />
                                <div className="flex flex-col justify-center">
                                    <p className="text-white text-[28px] font-bold leading-tight tracking-[-0.015em] mb-2">
                                        {profile?.name}
                                    </p>
                                    <p className="text-[#c893c8] text-lg font-medium leading-normal mb-3">
                                        {profile?.title}
                                    </p>
                                    <p className="text-gray-300 text-base leading-relaxed max-w-lg">
                                        {profile?.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Categories Section */}
                    <h2 className="text-white text-[28px] font-bold leading-tight tracking-[-0.015em] px-6 pb-6 pt-8">
                        Categories
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
                        {categories.map((category) => (
                            <div
                                key={category.id}
                                className="flex flex-col gap-4 pb-4 cursor-pointer group"
                                onClick={() =>
                                    handleCategoryClick(category.name)
                                }
                            >
                                <div
                                    className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl transition-transform group-hover:scale-105 shadow-lg"
                                    style={{
                                        backgroundImage: `url("${category.thumbnail}")`,
                                    }}
                                />
                                <div className="flex justify-between items-center">
                                    <p className="text-white text-lg font-medium leading-normal group-hover:text-[#c893c8] transition-colors">
                                        {category.name}
                                    </p>
                                    <span className="text-[#c893c8] text-sm font-normal">
                                        {category.count}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Footer />
                </div>
            </div>
        </div>
    )
}
