import { OrderCard } from './OrderCard';
import { Pagination } from '@/components/ui/Pagination';
import { useOrderList } from './useOrderList';

const OrderList = () => {
  const {
    orders,
    filters,
    pagination,
    statusList,
    handlePageChange,
    handleChangeStatus,
  } = useOrderList();
  return (
    <div className="space-y-6">
      <div className="flex overflow-x-auto pb-2">
        <div className="flex h-11 items-center gap-1 rounded-xl border border-slate-200 bg-white p-1">
          {statusList.map((type) => (
            <button
              key={type.id}
              onClick={() => handleChangeStatus(type.id)}
              className={`h-full whitespace-nowrap rounded-lg px-4 text-xs font-bold transition-all ${
                filters.status.includes(type.id)
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 py-12 text-center">
          <p className="text-slate-500">
            No orders match your current filters.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <OrderCard key={`order-card-${order._id}`} order={order} />
          ))}

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

export default OrderList;
