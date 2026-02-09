import { format } from 'date-fns';
import type { Order } from '@/shared/types';

const OrderDetails = ({ order }: { order: Order }) => {
  const delivery = order.deliveryDetails;

  return (
    <div className="space-y-4">
      {/* Restaurant */}
      <div>
        <h4 className="text-lg font-bold text-slate-900">
          {order.restaurant?.name}
        </h4>
        <p className="text-sm text-slate-500">
          {order.restaurant?.address}
          {order.restaurant?.city ? `, ${order.restaurant.city}` : ''}
        </p>
        <p className="text-xs text-slate-400">
          {format(new Date(order.createdAt), 'MMM dd, yyyy • hh:mm a')}
        </p>
      </div>

      {/* Delivery Address */}
      {delivery && (
        <div className="rounded-md border bg-slate-50 p-3">
          <h5 className="font-semibold text-slate-800">Delivery Address</h5>
          <p className="text-sm text-slate-700">{delivery.name}</p>
          <p className="text-sm text-slate-600">{delivery.address}</p>
          <p className="text-sm text-slate-600">
            {delivery.city}, {delivery.state} - {delivery.pinCode}
          </p>
          <p className="text-sm text-slate-600">📞 {delivery.phoneNumber}</p>
        </div>
      )}

      {/* Items */}
      <div>
        <h5 className="font-semibold text-slate-800">Items</h5>
        <div className="mt-2 space-y-2">
          {order.items.map((it: any) => (
            <div key={it._id} className="flex justify-between">
              <div>
                <div className="font-medium text-slate-900">{it.name}</div>
                <div className="text-xs text-slate-500">Qty: {it.quantity}</div>
              </div>
              <div className="text-slate-700">
                ₹{(it.price * it.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Total */}
      <div className="border-t pt-4 flex justify-between">
        <span className="text-sm text-slate-600">Total</span>
        <span className="font-semibold text-slate-900">
          ₹{order.totalAmount.toFixed(2)}
        </span>
      </div>

      {/* Status History */}
      <div>
        <h5 className="font-semibold text-slate-800">Status History</h5>
        <div className="mt-2 space-y-2 text-sm text-slate-600">
          {order.statusHistory?.map((h: any) => (
            <div key={h._id} className="flex justify-between">
              <div className="capitalize">
                {h.status.toLowerCase().replace(/[_-]/g, ' ')}
              </div>
              <div className="text-xs text-slate-400">
                {format(new Date(h.updatedAt), 'MMM dd, yyyy • hh:mm a')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
