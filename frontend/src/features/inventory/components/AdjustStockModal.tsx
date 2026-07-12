import Modal from "../../../components/ui/Modal";

import AdjustStockForm from "./AdjustStockForm";

import type { Product } from "../../products/types/product.types";
import type { Store } from "../../store/types/store.types";
import type { AdjustStockRequest } from "../types/inventory.types";

interface AdjustStockModalProps {
  open: boolean;
  onClose: () => void;

  products: Product[];
  stores: Store[];

  onSubmit: (
    data: AdjustStockRequest
  ) => Promise<void>;
}

export default function AdjustStockModal({
  open,
  onClose,
  products,
  stores,
  onSubmit,
}: AdjustStockModalProps) {
  return (
    <Modal
      open={open}
      title="Adjust Stock"
      onClose={onClose}
    >
      <AdjustStockForm
        products={products}
        stores={stores}
        onSubmit={async (data) => {debugger
          await onSubmit(data);
          onClose();
        }}
        onCancel={onClose}
      />
    </Modal>
  );
}