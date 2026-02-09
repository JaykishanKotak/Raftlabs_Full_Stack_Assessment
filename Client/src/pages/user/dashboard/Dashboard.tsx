import { RestaurantCard } from './components/RestaurantCard';
import { useDashboard } from './useDashboard';
import { Pagination } from '@/components/ui/Pagination';
import { HiSearch, HiFilter } from 'react-icons/hi';

const FOOD_TYPES = [
  { id: 'VEG', label: 'Veg' },
  { id: 'NON_VEG', label: 'Non-Veg' },
  { id: 'VEGAN', label: 'Vegan' },
];

const RestaurantList = () => {
  const {
    restaurants,
    pagination,
    handlePageChange,
    filters,
    handleToggleFoodType,
    handleSearchChange,
  } = useDashboard();

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Explore Restaurants
          </h1>
          <p className="mt-2 text-slate-500">
            Discover the best food in your area
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {/* Search Input */}
          <div className="relative">
            <HiSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search restaurants..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/10 sm:w-64"
              value={filters.search}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>

          {/* Food Type Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            <div className="flex h-11 items-center gap-1 rounded-xl border border-slate-200 bg-white p-1">
              {FOOD_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleToggleFoodType(type.id)}
                  className={`h-full whitespace-nowrap rounded-lg px-4 text-xs font-bold transition-all ${
                    filters.foodTypes.includes(type.id)
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {restaurants.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 py-20 text-center">
          <div className="rounded-full bg-slate-100 p-4">
            <HiFilter className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="mt-4 text-lg font-bold text-slate-900">
            No restaurants found
          </h3>
          <p className="mt-2 text-slate-500">
            Try adjusting your search or filters to find what you're looking
            for.
          </p>
          {(filters.search || filters.foodTypes.length > 0) && (
            <button
              onClick={() => {
                handleSearchChange('');
                filters.foodTypes.forEach((t) => handleToggleFoodType(t));
              }}
              className="mt-6 text-sm font-bold text-brand-600 hover:underline"
            >
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {restaurants.map((restaurant, index) => (
              <RestaurantCard
                key={`restaurant-${index}-${restaurant._id}`}
                restaurant={restaurant}
              />
            ))}
          </div>

          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default RestaurantList;
