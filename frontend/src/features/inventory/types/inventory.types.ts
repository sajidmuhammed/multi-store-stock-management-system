export interface InventoryItem {
  id: string;

  quantity: number;

  product: {
    _id: string;
    name: string;
    sku: string;
  };

  store: {
    _id: string;
    name: string;
  };

  createdAt: string;
  updatedAt: string;
}

export interface AdjustStockRequest {
  productId: string;
  storeId: string;
  change: number;
}

export interface TransferStockRequest {
  productId: string;
  sourceStoreId: string;
  destinationStoreId: string;
  quantity: number;
}