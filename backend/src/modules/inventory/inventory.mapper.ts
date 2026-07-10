import { IStock } from "./stock.model";

export const mapInventory = (stock: IStock) => ({
  id: stock._id.toString(),

  productId: stock.productId,

  storeId: stock.storeId,

  quantity: stock.quantity,

  createdAt: stock.createdAt,

  updatedAt: stock.updatedAt,
});

