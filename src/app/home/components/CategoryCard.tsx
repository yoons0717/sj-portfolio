import { Category } from '@/types/portfolio'

interface CategoryCardProps {
    category: Category
    index: number
    onClick: (categoryName: string) => void
}

export default function CategoryCard({ category, index, onClick }: CategoryCardProps) {
    return (
        <div
            key={category.name}
            className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
            onClick={() => onClick(category.name)}
            style={{
                animationDelay: `${index * 100}ms`,
            }}
        >
            <div className="relative overflow-hidden rounded-2xl shadow-xl bg-gradient-to-br from-[#2a1329] to-[#1a0e1a]">
                <div
                    className="w-full aspect-square bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-110"
                    style={{
                        backgroundImage: `url("${category.thumbnail}")`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-xl font-bold leading-tight mb-2 group-hover:text-[#c893c8] transition-colors">
                        {category.name}
                    </h3>
                    <div className="flex items-center justify-between">
                        <span className="text-[#c893c8] text-sm font-medium">
                            {category.count} projects
                        </span>
                        <div className="w-8 h-8 bg-[#c893c8] rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                            <svg
                                className="w-4 h-4 text-white group-hover:text-[#c893c8] transition-colors"
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}