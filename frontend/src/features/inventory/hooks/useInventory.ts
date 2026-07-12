import { useEffect, useState } from "react";

import * as inventoryApi from "../api/inventory.api";

import type {
  InventoryItem,
  AdjustStockRequest,
  TransferStockRequest,
} from "../types/inventory.types";

export function useInventory() {
  const [inventory, setInventory] = useState<
    InventoryItem[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const loadInventory = async (
    threshold?: number
  ) => {
    try {
      setLoading(true);

      const data =
        await inventoryApi.getInventory(
          threshold
        );

      setInventory(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInventory();
  }, []);

  const adjust = async (
    request: AdjustStockRequest
  ) => {
    await inventoryApi.adjustStock(request);

    await loadInventory();
  };

  const transfer = async (
    request: TransferStockRequest
  ) => {
    await inventoryApi.transferStock(request);

    await loadInventory();
  };

  return {
    inventory,
    loading,
    adjust,
    transfer,
    reload: loadInventory,
  };
}