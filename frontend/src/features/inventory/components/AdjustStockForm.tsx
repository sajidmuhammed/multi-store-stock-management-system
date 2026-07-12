import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "../../../components/ui/Button";
import FormField from "../../../components/shared/FormField";
import Select from "../../../components/ui/Select";
import Input from "../../../components/ui/Input";

import {
  adjustStockSchema,
  type AdjustStockFormData,
} from "../validation/inventory.validation";

import type { Product } from "../../products/types/product.types";
import type { Store } from "../../store/types/store.types";
import type { AdjustStockRequest } from "../types/inventory.types";

interface AdjustStockFormProps {
  products: Product[];
  stores: Store[];

  onSubmit: (
    data: AdjustStockRequest
  ) => Promise<void>;

  onCancel: () => void;
}

export default function AdjustStockForm({
  products,
  stores,
  onSubmit,
  onCancel,
}: AdjustStockFormProps) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdjustStockFormData>({
    resolver: zodResolver(adjustStockSchema),
  });

  const submit = async (
    data: AdjustStockFormData
  ) => {
    try {
      setLoading(true);

      await onSubmit(data);

      reset();
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="space-y-5"
    >
      <FormField
        label="Product"
        required
      >
        <Select
          defaultValue=""
          {...register("productId")}
          error={errors.productId?.message}
        >
          <option value="">
            Select Product
          </option>

          {products.map((product) => (
            <option
              key={product.id}
              value={product.id}
            >
              {product.name}
            </option>
          ))}
        </Select>
      </FormField>

      <FormField
        label="Store"
        required
      >
        <Select
          defaultValue=""
          {...register("storeId")}
          error={errors.storeId?.message}
        >
          <option value="">
            Select Store
          </option>

          {stores.map((store) => (
            <option
              key={store.id}
              value={store.id}
            >
              {store.name}
            </option>
          ))}
        </Select>
      </FormField>

      <FormField
        label="Stock Change"
        required
      >
        <Input
          type="number"
          placeholder="Example: 10 or -5"
          {...register("change")}
        />
      </FormField>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          loading={loading}
        >
          Adjust Stock
        </Button>
      </div>
    </form>
  );
}