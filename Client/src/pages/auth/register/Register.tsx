import { Controller } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { Dropdown } from '@/components/ui/Dropdown';
import { Button } from '@/components/ui/Button';
import { useRegister } from './useRegister';
import { Link } from 'react-router-dom';
import { ROUTE_CONST } from '@/utils/const';

const Register = () => {
  const { form, onSubmit, cityList } = useRegister();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-soft">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold text-slate-900">Sign up</h1>
          <p className="text-sm text-slate-600">
            Create an account to get started.
          </p>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-1">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-700"
            >
              Name
            </label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="name"
                  type="text"
                  placeholder="Name"
                  autoComplete="name"
                  aria-invalid={errors.name ? 'true' : 'false'}
                  className={
                    errors.name
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                      : ''
                  }
                />
              )}
            />
            {errors.name && (
              <p className="text-xs text-red-600" role="alert">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700"
            >
              Email
            </label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="email"
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  className={
                    errors.email
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                      : ''
                  }
                />
              )}
            />
            {errors.email && (
              <p className="text-xs text-red-600" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  aria-invalid={errors.password ? 'true' : 'false'}
                  className={
                    errors.password
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                      : ''
                  }
                />
              )}
            />
            {errors.password && (
              <p className="text-xs text-red-600" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-slate-700"
            >
              Confirm Password
            </label>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                  className={
                    errors.confirmPassword
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                      : ''
                  }
                  errorMessage={errors.confirmPassword?.message}
                />
              )}
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-slate-700"
            >
              Phone Number
            </label>
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="phoneNumber"
                  type="tel"
                  placeholder="Phone Number"
                  autoComplete="tel"
                  aria-invalid={errors.phoneNumber ? 'true' : 'false'}
                  className={
                    errors.phoneNumber
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                      : ''
                  }
                  errorMessage={errors.phoneNumber?.message}
                />
              )}
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-slate-700"
            >
              Address
            </label>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="address"
                  type="text"
                  placeholder="Address"
                  autoComplete="street-address"
                  aria-invalid={errors.address ? 'true' : 'false'}
                  className={
                    errors.address
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                      : ''
                  }
                  errorMessage={errors.address?.message}
                />
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <Dropdown
                    {...field}
                    id="city"
                    label="City"
                    isError={!!errors.city}
                    options={cityList}
                    placeholder="Select a city"
                    aria-invalid={errors.city ? 'true' : 'false'}
                    className={
                      errors.city
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                        : ''
                    }
                    errorMessage={errors.city?.message}
                  />
                )}
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="state"
                className="block text-sm font-medium text-slate-700"
              >
                State
              </label>
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="state"
                    type="text"
                    placeholder="State"
                    autoComplete="address-level1"
                    aria-invalid={errors.state ? 'true' : 'false'}
                    className={
                      errors.state
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                        : ''
                    }
                    errorMessage={errors.state?.message}
                  />
                )}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="pinCode"
              className="block text-sm font-medium text-slate-700"
            >
              Pin Code
            </label>
            <Controller
              name="pinCode"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="pinCode"
                  type="text"
                  placeholder="123456"
                  autoComplete="postal-code"
                  aria-invalid={errors.pinCode ? 'true' : 'false'}
                  className={
                    errors.pinCode
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
                      : ''
                  }
                  errorMessage={errors.pinCode?.message}
                />
              )}
            />
          </div>

          <Button type="submit" fullWidth disabled={isSubmitting}>
            {isSubmitting ? 'Signing up...' : 'Sign up'}
          </Button>

          <p className="text-center text-xs text-slate-500">
            Already have an account? <Link to={ROUTE_CONST.LOGIN}>Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
