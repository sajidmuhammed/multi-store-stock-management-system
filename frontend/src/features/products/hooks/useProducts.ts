import { useEffect, useState } from "react";

import * as productApi from "../api/product.api";

import type {
  CreateProductRequest,
  Product,
} from "../types/product.types";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    try {
      setLoading(true);

      const data = await productApi.getProducts();

      setProducts(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const create = async (
    product: CreateProductRequest
  ) => {
    await productApi.createProduct(product);

    await loadProducts();
  };

  return {
    products,
    loading,
    create,
    reload: loadProducts,
  };
}