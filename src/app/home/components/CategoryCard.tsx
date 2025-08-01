import { CategoryDisplay } from '@/types';

interface CategoryCardProps {
  category: CategoryDisplay;
  index: number;
  onClick: (categoryName: string) => void;
}

export default function CategoryCard({
  category,
  index,
  onClick,
}: CategoryCardProps) {
  return (
    <div
      key={category.name}
      className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
      onClick={() => onClick(category.name)}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      <div className="relative overflow-hidden rounded-2xl shadow-xl bg-gradient-to-br from-card to-surface">
        <div
          className="w-full aspect-square bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-110"
          style={{
            backgroundImage: `url("${category.thumbnail}")`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-primary text-xl font-bold leading-tight mb-2 group-hover:text-accent transition-colors">
            {category.name}
          </h3>
          <div className="flex items-center justify-end">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center group-hover:bg-primary transition-colors">
              <svg
                className="w-4 h-4 text-primary group-hover:text-accent transition-colors"
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
  );
}
