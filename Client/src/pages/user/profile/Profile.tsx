import { Input } from '@/components/ui/Input';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { userDetails } = useSelector((state: any) => state.auth);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">
          Personal Information
        </h1>
        <p className="text-slate-500">
          Update your personal details and account settings
        </p>
      </header>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Input
          label="Full Name"
          id="name"
          type="text"
          placeholder="Name"
          value={userDetails?.name || ''}
          disabled
        />
        <Input
          label="Email Address"
          id="email"
          type="email"
          placeholder="Email"
          value={userDetails?.email || ''}
          disabled
        />
        <Input
          label="Phone Number"
          id="phoneNumber"
          type="text"
          placeholder="Phone Number"
          value={userDetails?.phoneNumber || ''}
          disabled
        />
        <Input
          label="City"
          id="city"
          type="text"
          placeholder="City"
          value={userDetails?.city || ''}
          disabled
        />
        <Input
          label="State"
          id="state"
          type="text"
          placeholder="State"
          value={userDetails?.state || ''}
          disabled
        />
        <Input
          label="Pincode"
          id="pincode"
          type="text"
          placeholder="Pincode"
          value={userDetails?.pincode || ''}
          disabled
        />

        <Input
          label="Address"
          id="address"
          type="textarea"
          placeholder="Address"
          value={userDetails?.address || ''}
          disabled
        />
      </div>

      {/* <div className="mt-8 rounded-xl bg-slate-50 p-6 border border-slate-100">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Security</h3>
        <p className="text-sm text-slate-500 mb-6">Your account is secured with a hashed password. Contact support to change your password.</p>
        <button disabled className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-slate-400 border border-slate-200">
          Change Password
        </button>
      </div> */}
    </div>
  );
};

export default Profile;
