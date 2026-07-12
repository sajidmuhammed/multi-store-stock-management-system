import { useState } from "react";

import Button from "../../../components/ui/Button";

import StoreModal from "../components/StoreModal";
import StoreTable from "../components/StoreTable";

import { useStores } from "../hooks/useStores";

import { useAuth } from "../../auth/hooks/useAuth";

import { UserRole } from "../../../types/common.types";

import type { CreateStoreRequest } from "../types/store.types";

export default function StoresPage() {
  const { user } = useAuth();

  const {
    stores,
    loading,
    create,
  } = useStores();

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const handleSubmit = async (
    data: CreateStoreRequest
  ) => {
    await create(data);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Stores
        </h1>

        {user?.role === UserRole.ADMIN && (
          <Button
            onClick={() =>
              setIsModalOpen(true)
            }
          >
            Add Store
          </Button>
        )}
      </div>

      <StoreTable stores={stores} />

      <StoreModal
        open={isModalOpen}
        onClose={() =>
          setIsModalOpen(false)
        }
        onSubmit={handleSubmit}
      />

      {loading && (
        <p className="text-center">
          Loading stores...
        </p>
      )}
    </div>
  );
}