import api from "../../../config/axios";

import type {
  InventoryItem,
  AdjustStockRequest,
  TransferStockRequest,
} from "../types/inventory.types";

export const getInventory = async (
  threshold?: number
): Promise<InventoryItem[]> => {
  const response = await api.get("/inventory", {
    params: { threshold },
  });

  return response.data.data;
};

export const adjustStock = async (
  data: AdjustStockRequest
) => {
  await api.patch("/inventory/adjust", data);
};

export const transferStock = async (
  data: TransferStockRequest
) => {
  await api.post("/inventory/transfer", data);
};