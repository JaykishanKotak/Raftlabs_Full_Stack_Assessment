import { Modal } from '@/components/ui/Modal';

import OrderDetails from './OrderDetails';
import { useOrderDetails } from './useOrderDetails';

interface Props {
  orderId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderDetailsModal = ({ orderId, isOpen, onClose }: Props) => {
  const { order } = useOrderDetails({ orderId, isOpen, onClose });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Order #${orderId.slice(-8).toUpperCase()}`}
    >
      <div className="min-w-[320px]">
        {order && <OrderDetails order={order} />}
      </div>
    </Modal>
  );
};

export default OrderDetailsModal;
