import { useMemo, useState } from "react";

import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import FormField from "../../../components/shared/FormField";

import InventoryTable from "../components/InventoryTable";
import AdjustStockModal from "../components/AdjustStockModal";
import TransferStockModal from "../components/TransferStockModal";

import { useInventory } from "../hooks/useInventory";
import { useProducts } from "../../products/hooks/useProducts";
import { useStores } from "../../store/hooks/useStores";

import { useAuth } from "../../auth/hooks/useAuth";

import { UserRole } from "../../../types/common.types";

import type {
  AdjustStockRequest,
  TransferStockRequest,
} from "../types/inventory.types";

export default function InventoryPage() {
  const { user } = useAuth();

  const {
    inventory,
    loading,
    adjust,
    transfer,
    reload,
  } = useInventory();

  const { products } = useProducts();

  const { stores } = useStores();

  const [threshold, setThreshold] =
    useState("");

  const [
    adjustModalOpen,
    setAdjustModalOpen,
  ] = useState(false);

  const [
    transferModalOpen,
    setTransferModalOpen,
  ] = useState(false);

  const applyFilter = async () => {
    await reload(
      threshold
        ? Number(threshold)
        : undefined
    );
  };

  const handleAdjust = async (
    data: AdjustStockRequest
  ) => {
    await adjust(data);
  };

  const handleTransfer = async (
    data: TransferStockRequest
  ) => {
    await transfer(data);
  };

  const canManageInventory = useMemo(
    () => user?.role === UserRole.ADMIN,
    [user]
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Inventory
        </h1>

        {canManageInventory && (
          <div className="flex gap-3">
            <Button
              onClick={() =>
                setAdjustModalOpen(true)
              }
            >
              Adjust Stock
            </Button>

            <Button
              onClick={() =>
                setTransferModalOpen(true)
              }
            >
              Transfer Stock
            </Button>
          </div>
        )}
      </div>

      <div className="flex items-end gap-4">
        <div className="w-56">
          <FormField label="Low Stock Threshold">
            <Input
              type="number"
              value={threshold}
              onChange={(e) =>
                setThreshold(
                  e.target.value
                )
              }
              placeholder="Example: 10"
            />
          </FormField>
        </div>

        <Button onClick={applyFilter}>
          Apply
        </Button>
      </div>

      {loading ? (
        <p>Loading inventory...</p>
      ) : (
        <InventoryTable
          inventory={inventory}
        />
      )}

      <AdjustStockModal
        open={adjustModalOpen}
        onClose={() =>
          setAdjustModalOpen(false)
        }
        products={products}
        stores={stores}
        onSubmit={handleAdjust}
      />

      <TransferStockModal
        open={transferModalOpen}
        onClose={() =>
          setTransferModalOpen(false)
        }
        products={products}
        stores={stores}
        onSubmit={handleTransfer}
      />
    </div>
  );
}