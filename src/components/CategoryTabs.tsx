interface CategoryTabsProps {
  selectedGender: 'men' | 'women';
  selectedCategory: 'tops' | 'bottoms' | 'outerwear' | 'dresses' | 'shoes' | 'accessories' | 'activewear' | 'swimwear';
  onGenderChange: (gender: 'men' | 'women') => void;
  onCategoryChange: (category: 'tops' | 'bottoms' | 'outerwear' | 'dresses' | 'shoes' | 'accessories' | 'activewear' | 'swimwear') => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  selectedGender,
  selectedCategory,
  onGenderChange,
  onCategoryChange
}) => {
  const allCategories = [
    { id: 'tops', label: 'TOPS 🔥', emoji: '🔥' },
    { id: 'bottoms', label: 'BOTTOMS 👖', emoji: '👖' },
    { id: 'outerwear', label: 'OUTER 🧥', emoji: '🧥' },
    { id: 'dresses', label: 'DRESSES 👗', emoji: '👗' },
    { id: 'shoes', label: 'KICKS 👟', emoji: '👟' },
    { id: 'accessories', label: 'GEAR 🎒', emoji: '🎒' },
    { id: 'activewear', label: 'FIT 💪', emoji: '💪' },
    { id: 'swimwear', label: 'BEACH 🏖️', emoji: '🏖️' }
  ] as const;

  const categories = allCategories.filter(category => {
    if (category.id === 'dresses') {
      return selectedGender === 'women';
    }
    return true;
  });

  return (
    <div className="bg-white border-b-4 border-purple-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-4">
          <button
            onClick={() => onGenderChange('men')}
            className={`py-3 px-6 font-bold text-sm transition-all transform hover:scale-105 ${
              selectedGender === 'men'
                ? 'bg-blue-500 text-white rounded-t-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-t-lg'
            }`}
          >
            👨 BOYS
          </button>
          <button
            onClick={() => onGenderChange('women')}
            className={`py-3 px-6 font-bold text-sm transition-all transform hover:scale-105 ${
              selectedGender === 'women'
                ? 'bg-pink-500 text-white rounded-t-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-t-lg'
            }`}
          >
            👩 GIRLS
          </button>
        </div>
        
        <div className="flex space-x-2 py-3 overflow-x-auto">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`px-4 py-2 text-sm font-bold rounded-full transition-all transform hover:scale-105 whitespace-nowrap ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}