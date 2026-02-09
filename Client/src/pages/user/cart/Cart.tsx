import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useCart } from './useCart';

const Cart = () => {
  const {
    items,
    isCheckingOut,
    placingOrder,
    deliveryDetails,
    setDeliveryDetails,
    subtotal,
    deliveryFee,
    total,
    setIsCheckingOut,
    handleQuantityChange,
    handleRemove,
    handlePlaceOrder,
    clearCart,
  } = useCart();

  if (items.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-slate-100 text-4xl">
          🛒
        </div>
        <h1 className="text-2xl font-bold text-slate-900">
          Your cart is empty
        </h1>
        <p className="mt-2 text-slate-500">
          Add some delicious items from restaurants nearby!
        </p>
        <Link to="/" className="mt-8 inline-block">
          <Button className="px-8 py-3">Explore Restaurants</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
      <div className="space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">
            Your Shopping Cart
          </h1>
          <button
            onClick={clearCart}
            className="text-sm font-medium text-red-600 hover:underline"
          >
            Clear Cart
          </button>
        </header>

        <div className="divide-y divide-slate-100 rounded-2xl border bg-white">
          {items.map((item: any) => (
            <div key={item._id} className="flex gap-4 p-6">
              <div className="h-24 w-24 overflow-hidden rounded-xl bg-slate-100">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-slate-400">
                    No Image
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-xs text-slate-500">
                      {item.category || item.baseDescription}
                    </p>
                  </div>
                  <span className="font-bold text-brand-600">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 border rounded-lg p-1">
                    <button
                      onClick={() =>
                        handleQuantityChange(item._id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span className="w-6 text-center font-bold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item._id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => handleRemove(item._id)}
                    className="text-sm text-slate-400 hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {isCheckingOut && (
          <div className="rounded-2xl border p-6">
            <h2 className="mb-6 text-xl font-bold">Delivery Details</h2>

            <form
              id="checkout-form"
              onSubmit={handlePlaceOrder}
              className="grid gap-4 sm:grid-cols-2"
            >
              <div className="sm:col-span-2">
                <Input
                  label="Full Name"
                  required
                  value={deliveryDetails.name}
                  onChange={(e) =>
                    setDeliveryDetails({
                      ...deliveryDetails,
                      name: e.target.value,
                    })
                  }
                />
              </div>

              <div className="sm:col-span-2">
                <Input
                  label="Delivery Address"
                  required
                  value={deliveryDetails.address}
                  onChange={(e) =>
                    setDeliveryDetails({
                      ...deliveryDetails,
                      address: e.target.value,
                    })
                  }
                />
              </div>

              <Input
                label="Phone Number"
                required
                value={deliveryDetails.phone}
                onChange={(e) =>
                  setDeliveryDetails({
                    ...deliveryDetails,
                    phone: e.target.value,
                  })
                }
              />
            </form>
          </div>
        )}
      </div>

      <div className="sticky top-20 h-fit">
        <div className="rounded-2xl border bg-white p-6">
          <h2 className="mb-6 text-lg font-bold">Summary</h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="border-t pt-4 flex justify-between">
              <span className="font-bold">Total</span>
              <span className="text-xl font-bold text-brand-600">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          {!isCheckingOut ? (
            <Button
              fullWidth
              className="mt-6 py-4"
              onClick={() => setIsCheckingOut(true)}
            >
              Checkout Now
            </Button>
          ) : (
            <Button
              type="submit"
              form="checkout-form"
              fullWidth
              disabled={placingOrder}
              className="mt-6 py-4"
            >
              {placingOrder ? 'Placing Order...' : 'Confirm Order'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
