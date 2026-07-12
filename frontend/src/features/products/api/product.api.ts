import api from "../../../config/axios";

import type {
  Product,
  CreateProductRequest,
} from "../types/product.types";

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get("/products");

  return response.data.data;
};

export const getProductById = async (
  id: string
): Promise<Product> => {
  const response = await api.get(`/products/${id}`);

  return response.data.data;
};

export const createProduct = async (
  data: CreateProductRequest
): Promise<Product> => {
  const response = await api.post(
    "/products",
    data
  );

  return response.data.data;
};