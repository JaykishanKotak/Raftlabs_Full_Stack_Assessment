import OrderList from './components/OrderList';

const OrderHistory = () => {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Order History</h1>
        <p className="text-slate-500">Track and manage your recent orders</p>
      </header>

      <div className="mt-6">
        <OrderList />
      </div>
    </div>
  );
};

export default OrderHistory;
