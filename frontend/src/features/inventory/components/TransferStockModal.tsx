import Modal from "../../../components/ui/Modal";

import TransferStockForm from "./TransferStockForm";

import type { Product } from "../../products/types/product.types";
import type { Store } from "../../store/types/store.types";
import type { TransferStockRequest } from "../types/inventory.types";

interface TransferStockModalProps {
  open: boolean;
  onClose: () => void;

  products: Product[];
  stores: Store[];

  onSubmit: (
    data: TransferStockRequest
  ) => Promise<void>;
}

export default function TransferStockModal({
  open,
  onClose,
  products,
  stores,
  onSubmit,
}: TransferStockModalProps) {
  return (
    <Modal
      open={open}
      title="Transfer Stock"
      onClose={onClose}
    >
      <TransferStockForm
        products={products}
        stores={stores}
        onSubmit={async (data) => {
          await onSubmit(data);
          onClose();
        }}
        onCancel={onClose}
      />
    </Modal>
  );
}