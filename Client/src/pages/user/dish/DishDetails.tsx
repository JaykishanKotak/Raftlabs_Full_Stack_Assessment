import { Button } from '@/components/ui/Button';
import { useDishDetails } from './useDishDetails';

const DishDetails = () => {
  const { dish, adding, quantity, setQuantity, handleAddToCart, navigate } =
    useDishDetails();

  if (!dish) {
    return (
      <div className="py-12 text-center">
        <p className="text-slate-500">Dish not found.</p>
        <Button onClick={() => navigate(-1)} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 aspect-square">
        {dish.imageUrl ? (
          <img
            src={dish.imageUrl}
            alt={dish.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-400">
            No Image
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between py-4">
        <div className="space-y-4">
          <div>
            <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
              {dish.foodType}
            </span>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              {dish.name}
            </h1>
          </div>

          <p className="text-lg text-slate-600 leading-relaxed">
            {dish.baseDescription}
          </p>

          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-brand-600">
              ${dish.price.toFixed(2)}
            </span>
            {dish.rating && (
              <span className="flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-sm font-medium text-slate-700">
                ★ {dish.rating}
              </span>
            )}
          </div>
        </div>

        <div className="mt-8 space-y-6 rounded-2xl bg-slate-50 p-6 border border-slate-100">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-900">Quantity</span>
            <div className="flex items-center gap-4 rounded-lg bg-white p-1 border border-slate-200">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="h-8 w-8 rounded-md hover:bg-slate-100 text-slate-600 transition"
              >
                -
              </button>
              <span className="w-8 text-center font-bold text-slate-900">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="h-8 w-8 rounded-md hover:bg-slate-100 text-slate-600 transition"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-slate-200 pt-4">
            <span className="text-sm font-medium text-slate-500">
              Total Price
            </span>
            <span className="text-xl font-bold text-slate-900">
              ${(dish.price * quantity).toFixed(2)}
            </span>
          </div>

          <Button
            onClick={handleAddToCart}
            disabled={adding}
            className="w-full py-4 text-lg font-bold shadow-brand"
          >
            {adding ? 'Adding to Cart...' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DishDetails;
