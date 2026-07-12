import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "../../../components/ui/Button";
import FormField from "../../../components/shared/FormField";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";

import {
  transferStockSchema,
  type TransferStockFormData,
} from "../validation/inventory.validation";

import type { Product } from "../../products/types/product.types";
import type { Store } from "../../store/types/store.types";
import type { TransferStockRequest } from "../types/inventory.types";

interface TransferStockFormProps {
  products: Product[];
  stores: Store[];

  onSubmit: (
    data: TransferStockRequest
  ) => Promise<void>;

  onCancel: () => void;
}

export default function TransferStockForm({
  products,
  stores,
  onSubmit,
  onCancel,
}: TransferStockFormProps) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TransferStockFormData>({
    resolver: zodResolver(transferStockSchema),
  });

  const submit = async (
    data: TransferStockFormData
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
          error={errors.productId?.message}
          {...register("productId")}
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
        label="Source Store"
        required
      >
        <Select
          defaultValue=""
          error={errors.sourceStoreId?.message}
          {...register("sourceStoreId")}
        >
          <option value="">
            Select Source Store
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
        label="Destination Store"
        required
      >
        <Select
          defaultValue=""
          error={errors.destinationStoreId?.message}
          {...register("destinationStoreId")}
        >
          <option value="">
            Select Destination Store
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
        label="Quantity"
        required
      >
        <Input
          type="number"
          placeholder="Enter quantity"
          {...register("quantity", {
            valueAsNumber: true,
          })}
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
          Transfer Stock
        </Button>
      </div>
    </form>
  );
}