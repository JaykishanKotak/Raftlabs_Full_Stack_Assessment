import { Link } from 'react-router-dom';
import type { Restaurant } from '@/shared/types';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  return (
    <Link
      to={`/restaurants/${restaurant._id}`}
      className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:border-brand-300 hover:shadow-lg"
    >
      <div className="aspect-video w-full bg-slate-100 relative">
        {restaurant.imageUrl ? (
          <img
            src={restaurant.imageUrl}
            alt={restaurant.name}
            className="h-full w-full object-cover transition group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-400">
            No Image
          </div>
        )}
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-xs font-bold text-brand-600 shadow-sm">
          ★ {restaurant?.rating?.toFixed(1)}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600">
          {restaurant?.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-slate-500">
          {restaurant?.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {(restaurant as any).foodTypes?.map((type: string) => (
            <span
              key={type}
              className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                type === 'VEG'
                  ? 'bg-green-100 text-green-700'
                  : type === 'NON_VEG'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-blue-100 text-blue-700'
              }`}
            >
              {type.replace('_', ' ')}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center text-xs text-slate-400">
          <span className="truncate">{restaurant.address}</span>
        </div>
      </div>
    </Link>
  );
};
