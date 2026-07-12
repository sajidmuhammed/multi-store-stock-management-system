import Modal from "../../../components/ui/Modal";

import ProductForm from "./ProductForm";

import type {
  CreateProductRequest,
  Product,
} from "../types/product.types";

interface ProductModalProps {
  open: boolean;
  product?: Product;
  onClose: () => void;
  onSubmit: (
    data: CreateProductRequest
  ) => Promise<void>;
}

export default function ProductModal({
  open,
  product,
  onClose,
  onSubmit,
}: ProductModalProps) {
  return (
    <Modal
      open={open}
      title={
        product
          ? "Edit Product"
          : "Add Product"
      }
      onClose={onClose}
    >
      <ProductForm
        initialValues={product}
        onSubmit={async (data) => {
          await onSubmit(data);
          onClose();
        }}
        onCancel={onClose}
      />
    </Modal>
  );
}