'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import LoadingState from '@/components/LoadingState'
import ErrorState from '@/components/ErrorState'
import { getCategoriesWithCount } from '@/lib/api/projects'
import HeroBanner from './home/components/HeroBanner'
import ProfileSection from './home/components/ProfileSection'
import CategoriesSection from './home/components/CategoriesSection'
import { Category, Profile } from '@/types/portfolio'

// 프로필 정보
const profileData: Profile = {
    name: 'Sophia Carter',
    title: 'Multimedia Artist & Technologist',
    description:
        'Creative technologist passionate about merging art and technology to create immersive experiences. Specializing in virtual production, interactive installations, and digital storytelling.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
}

export default function HomePage() {
    const [categories, setCategories] = useState<Category[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true)
                const categoriesData = await getCategoriesWithCount()

                if (categoriesData) {
                    setCategories(categoriesData)
                } else {
                    // Fallback to mock data if no Supabase data
                    setCategories([
                        {
                            name: 'Development',
                            count: 8,
                            thumbnail:
                                'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop',
                        },
                        {
                            name: 'Design',
                            count: 12,
                            thumbnail:
                                'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=400&fit=crop',
                        },
                        {
                            name: 'VR/AR Production',
                            count: 6,
                            thumbnail:
                                'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop',
                        },
                        {
                            name: 'Proposals',
                            count: 4,
                            thumbnail:
                                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
                        },
                    ])
                }
            } catch (err) {
                console.error('Error fetching data:', err)
                setError('Failed to load data')
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

    const handleCategoryClick = (categoryName: string) => {
        router.push(
            `/projects/${categoryName.toLowerCase().replace(/\s+/g, '-')}`
        )
    }

    if (isLoading) {
        return <LoadingState />
    }

    if (error) {
        return <ErrorState error={error} />
    }

    return (
        <div
            className="relative flex min-h-screen flex-col bg-[#221122]"
            style={{ fontFamily: '"Spline Sans", "Noto Sans", sans-serif' }}
        >
            <Header />

            <HeroBanner />

            <div className="px-4 md:px-20 flex flex-1 justify-center py-12">
                <div className="flex flex-col max-w-[1200px] flex-1">
                    <ProfileSection profile={profileData} />
                    <CategoriesSection
                        categories={categories}
                        onCategoryClick={handleCategoryClick}
                    />
                </div>
            </div>

            <Footer />
        </div>
    )
}
