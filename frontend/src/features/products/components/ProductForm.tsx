import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import FormField from "../../../components/shared/FormField";

import {
  productSchema,
  type ProductFormData,
} from "../validation/product.schema";

import type {
  CreateProductRequest,
  Product,
} from "../types/product.types";

interface ProductFormProps {
  initialValues?: Product;
  onSubmit: (
    data: CreateProductRequest
  ) => Promise<void>;
  onCancel: () => void;
}

export default function ProductForm({
  initialValues,
  onSubmit,
  onCancel,
}: ProductFormProps) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      sku: "",
    },
  });

  useEffect(() => {
    if (initialValues) {
      reset({
        name: initialValues.name,
        sku: initialValues.sku,
      });
    }
  }, [initialValues, reset]);

  const handleFormSubmit = async (
    data: ProductFormData
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
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-5"
    >
      <FormField
        label="Product Name"
        required
        error={errors.name?.message}
      >
        <Input
          placeholder="Enter product name"
          {...register("name")}
        />
      </FormField>

      <FormField
        label="SKU"
        required
        error={errors.sku?.message}
      >
        <Input
          placeholder="Enter SKU"
          {...register("sku")}
        />
      </FormField>

      <div className="flex justify-end gap-3 pt-4">
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
          {initialValues
            ? "Update Product"
            : "Create Product"}
        </Button>
      </div>
    </form>
  );
}