import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import FormField from "../../../components/shared/FormField";

import {
  storeSchema,
  type StoreFormData,
} from "../validation/store.schema";

import type { CreateStoreRequest } from "../types/store.types";

interface StoreFormProps {
  onSubmit: (
    data: CreateStoreRequest
  ) => Promise<void>;
  onCancel: () => void;
}

export default function StoreForm({
  onSubmit,
  onCancel,
}: StoreFormProps) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StoreFormData>({
    resolver: zodResolver(storeSchema),
  });

  const handleFormSubmit = async (
    data: StoreFormData
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
        label="Store Name"
        required
        error={errors.name?.message}
      >
        <Input
          placeholder="Enter store name"
          {...register("name")}
        />
      </FormField>

      <FormField
        label="Location"
        required
        error={errors.location?.message}
      >
        <Input
          placeholder="Enter location"
          {...register("location")}
        />
      </FormField>

      <div className="flex justify-end gap-3 pt-2">
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
          Create Store
        </Button>
      </div>
    </form>
  );
}