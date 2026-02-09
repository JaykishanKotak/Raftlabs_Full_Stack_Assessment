import type { Order } from '@/shared/types';
import { format } from 'date-fns';

interface OrderCardProps {
  order: Order;
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  preparing: 'bg-blue-100 text-blue-700 border-blue-200',
  'on-the-way': 'bg-purple-100 text-purple-700 border-purple-200',
  delivered: 'bg-green-100 text-green-700 border-green-200',
  cancelled: 'bg-red-100 text-red-700 border-red-200',
};

export const OrderCard = ({ order }: OrderCardProps) => {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-4 py-3">
        <div className="flex flex-col">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            Order ID
          </span>
          <span className="text-sm font-bold text-slate-700">
            #{order?._id.slice(-8).toUpperCase()}
          </span>
        </div>
        <div
          className={`rounded-full border px-3 py-1 text-xs font-bold uppercase ${statusColors[order.status]}`}
        >
          {order.status.replace('-', ' ')}
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-bold text-slate-900">{order.restaurantName}</h4>
            <p className="text-xs text-slate-500">
              {format(new Date(order.createdAt), 'MMM dd, yyyy • hh:mm a')}
            </p>
          </div>
          <span className="text-lg font-bold text-brand-600">
            ${order?.totalPrice?.toFixed(2)}
          </span>
        </div>

        <div className="mt-4 space-y-2">
          {order.items.map((item) => (
            <div
              key={`order-item-${item.id}`}
              className="flex justify-between text-sm"
            >
              <span className="text-slate-600">
                <span className="font-medium text-slate-900">
                  {item.quantity}x
                </span>{' '}
                {item.dishName}
              </span>
              <span className="text-slate-500">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {order.status === 'on-the-way' && (
          <div className="mt-6 flex items-center gap-3 rounded-lg bg-brand-50 p-3 text-brand-700 border border-brand-100">
            <div className="h-2 w-2 animate-ping rounded-full bg-brand-500" />
            <span className="text-sm font-medium">
              Your food is on the way!
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
