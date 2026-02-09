import { Link } from 'react-router-dom';
import { Pagination } from '@/components/ui/Pagination';
import { useRestaurantDetails } from './useRestaurantDetails';

const RestaurantDetails = () => {
  const { restaurant, dishes, pagination, page, setPage, id } =
    useRestaurantDetails();
  if (!restaurant) {
    return (
      <div className="py-12 text-center">
        <p className="text-slate-500">Restaurant not found.</p>
        <Link
          to="/"
          className="mt-4 inline-block text-brand-600 hover:underline"
        >
          Go back to restaurants
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="relative h-64 w-full overflow-hidden rounded-2xl">
        {restaurant.imageUrl ? (
          <img
            src={restaurant.imageUrl}
            alt={restaurant.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400">
            No Image
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
        <div className="absolute bottom-0 p-6 text-white">
          <h1 className="text-4xl font-bold">{restaurant.name}</h1>
          <p className="mt-2 text-slate-200">{restaurant.address}</p>
          <div className="mt-4 flex items-center gap-4">
            <span className="flex items-center gap-1 rounded-full bg-brand-500 px-3 py-1 text-sm font-bold">
              ★ {restaurant?.rating?.toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      <section>
        <h2 className="text-2xl font-bold text-slate-900">Menu</h2>
        <p className="text-slate-500">Choose from our delicious dishes</p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {dishes.map((dish) => (
            <Link
              key={`dish-${dish._id}`}
              to={`/restaurants/${id}/dishes/${dish._id}`}
              className="flex gap-4 overflow-hidden rounded-xl border border-slate-200 bg-white p-3 transition hover:border-brand-300 hover:shadow-md"
            >
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                {dish.imageUrl ? (
                  <img
                    src={dish.imageUrl}
                    alt={dish.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
                    No Image
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col justify-between py-1">
                <div>
                  <h3 className="font-bold text-slate-900">{dish.name}</h3>
                  <p className="mt-1 line-clamp-1 text-xs text-slate-500">
                    {dish.baseDescription}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-brand-600">
                    ${dish?.price?.toFixed(2)}
                  </span>
                  {dish.rating && (
                    <span className="text-xs text-slate-400">
                      ★ {dish.rating}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
        {dishes.length === 0 ? (
          <p className="mt-6 text-center text-slate-500">
            No dishes available yet.
          </p>
        ) : (
          <Pagination
            currentPage={page}
            totalPages={pagination.totalPages}
            onPageChange={setPage}
          />
        )}
      </section>
    </div>
  );
};

export default RestaurantDetails;
