import CategoryCard from './CategoryCard';
import { CategoryDisplay } from '@/types';

interface CategoriesSectionProps {
  categories: CategoryDisplay[];
  onCategoryClick: (categoryName: string) => void;
}

export default function CategoriesSection({
  categories,
  onCategoryClick,
}: CategoriesSectionProps) {
  return (
    <div className="mb-8">
      <div className="text-center mb-12">
        <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight tracking-[-0.015em] mb-4">
          Project Categories
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Explore my work across different domains and technologies
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category, index) => (
          <CategoryCard
            key={category.name}
            category={category}
            index={index}
            onClick={onCategoryClick}
          />
        ))}
      </div>
    </div>
  );
}
