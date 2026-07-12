import Modal from "../../../components/ui/Modal";

import StoreForm from "./StoreForm";

import type { CreateStoreRequest } from "../types/store.types";

interface StoreModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (
    data: CreateStoreRequest
  ) => Promise<void>;
}

export default function StoreModal({
  open,
  onClose,
  onSubmit,
}: StoreModalProps) {
  return (
    <Modal
      open={open}
      title="Add Store"
      onClose={onClose}
    >
      <StoreForm
        onSubmit={async (data) => {
          await onSubmit(data);
          onClose();
        }}
        onCancel={onClose}
      />
    </Modal>
  );
}