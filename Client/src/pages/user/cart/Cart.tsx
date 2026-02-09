import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Controller } from 'react-hook-form';
import { useCart } from './useCart';
import { Dropdown } from '@/components/ui/Dropdown';

const Cart = () => {
  const {
    items,
    isCheckingOut,
    placingOrder,
    control,
    errors,
    subtotal,
    deliveryFee,
    total,
    setIsCheckingOut,
    handleQuantityChange,
    handleRemove,
    handlePlaceOrder,
    clearCart,
    cityList,
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
    <div className="max-w-4xl mx-auto space-y-6">
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

      <div className="rounded-2xl border bg-white p-8">
        <form
          noValidate
          id="checkout-form"
          onSubmit={handlePlaceOrder}
          className="grid gap-8 lg:grid-cols-[1fr_380px]"
        >
          <div className="space-y-6">
            <div>
              <h2 className="mb-6 text-xl font-bold">Delivery Details</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Controller
                    control={control}
                    name="name"
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Full Name"
                        required
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        ref={field.ref}
                        isError={!!errors.name}
                        errorMessage={errors.name?.message}
                      />
                    )}
                  />
                </div>

                <div className="sm:col-span-2">
                  <Controller
                    control={control}
                    name="address"
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Delivery Address"
                        required
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        ref={field.ref}
                        isError={!!errors.address}
                        errorMessage={errors.address?.message}
                      />
                    )}
                  />
                </div>

                <div>
                  <Controller
                    control={control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Phone Number"
                        required
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        ref={field.ref}
                        isError={!!errors.phoneNumber}
                        errorMessage={errors.phoneNumber?.message}
                        placeholder="Format: 10 digits"
                      />
                    )}
                  />
                </div>
                <div>
                  <Controller
                    control={control}
                    name="state"
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="State"
                        required
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        ref={field.ref}
                        isError={!!errors.state}
                        errorMessage={errors.state?.message}
                      />
                    )}
                  />
                </div>
                <div>
                  <Controller
                    control={control}
                    name="city"
                    render={({ field }) => (
                      <Dropdown
                        {...field}
                        options={
                          cityList?.map((city: string) => ({
                            value: city,
                            label: city,
                          })) || []
                        }
                        label="City"
                        required
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        ref={field.ref}
                        errorMessage={errors.city?.message}
                      />
                    )}
                  />
                </div>
                <div>
                  <Controller
                    control={control}
                    name="pinCode"
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Pin Code"
                        required
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        ref={field.ref}
                        isError={!!errors.pinCode}
                        errorMessage={errors.pinCode?.message}
                        placeholder="Format: 6 digits"
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:border-l lg:pl-8">
            <h2 className="mb-6 text-lg font-bold">Order Summary</h2>
            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-slate-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Delivery Fee</span>
                <span className="font-medium">${deliveryFee?.toFixed(2)}</span>
              </div>
              {subtotal < 350 && (
                <span className="text-red-600"> Free Delivery above $350</span>
              )}

              <div className="border-t pt-4 flex justify-between">
                <span className="font-bold text-slate-900">Total</span>
                <span className="text-xl font-bold text-brand-600">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            {!isCheckingOut ? (
              <Button
                type="button"
                fullWidth
                className="py-3"
                onClick={() => setIsCheckingOut(true)}
              >
                Proceed to Checkout
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                disabled={placingOrder}
                className="py-3"
              >
                {placingOrder ? 'Placing Order...' : 'Confirm Order'}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cart;
