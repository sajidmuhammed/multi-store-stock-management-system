import { useState } from "react";

import Button from "../../../components/ui/Button";

import ProductTable from "../components/ProductTable";
import ProductModal from "../components/ProductModal";

import { useProducts } from "../hooks/useProducts";

import { useAuth } from "../../auth/hooks/useAuth";

import { UserRole } from "../../../types/common.types";

import type {
  CreateProductRequest,
  Product,
} from "../types/product.types";

export default function ProductsPage() {
  const { user } = useAuth();

  const {
    products,
    loading,
    create,
  } = useProducts();

  const [open, setOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState<Product>();

  const handleCreate = () => {
    setSelectedProduct(undefined);
    setOpen(true);
  };

  const handleEdit = (
    product: Product
  ) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleSubmit = async (
    data: CreateProductRequest
  ) => {
      await create(data);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Products
        </h1>

        {user?.role === UserRole.ADMIN && (
          <Button onClick={handleCreate}>
            Add Product
          </Button>
        )}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ProductTable
          products={products}
          onEdit={handleEdit}
        />
      )}

      <ProductModal
        open={open}
        product={selectedProduct}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}