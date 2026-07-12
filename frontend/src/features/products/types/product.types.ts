export interface Product {
  id: string;
  name: string;
  sku: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductRequest {
  name: string;
  sku: string;
}

export interface UpdateProductRequest {
  name: string;
  sku: string;
}