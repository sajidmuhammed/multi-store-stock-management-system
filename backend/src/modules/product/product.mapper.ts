import { IProduct } from "./product.model";

export const mapProduct = (product: IProduct) => ({
  id: product._id.toString(),
  name: product.name,
  sku: product.sku,
  createdAt: product.createdAt,
  updatedAt: product.updatedAt,
});
