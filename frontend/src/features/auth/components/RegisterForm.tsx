import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import FormField from "../../../components/shared/FormField";

import {
  registerSchema,
  type RegisterFormData,
} from "../validation/auth.schema";

import * as authApi from "../api/auth.api";

export default function RegisterForm() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setLoading(true);

      await authApi.register({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      navigate("/login");
      toast.success("Registration successful! Please login.");
    }catch(error){
      toast.error((error as Error).message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-md p-8">
      <h1 className="mb-2 text-center text-3xl font-bold">
        Register
      </h1>

      <p className="mb-6 text-center text-gray-500">
        Create your shopper account
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <FormField
          label="Full Name"
          required
          error={errors.name?.message}
        >
          <Input
            placeholder="Enter your full name"
            {...register("name")}
          />
        </FormField>

        <FormField
          label="Email"
          required
          error={errors.email?.message}
        >
          <Input
            type="email"
            placeholder="Enter your email"
            {...register("email")}
          />
        </FormField>

        <FormField
          label="Password"
          required
          error={errors.password?.message}
        >
          <Input
            type="password"
            placeholder="Enter your password"
            {...register("password")}
          />
        </FormField>

        <FormField
          label="Confirm Password"
          required
          error={errors.confirmPassword?.message}
        >
          <Input
            type="password"
            placeholder="Confirm your password"
            {...register("confirmPassword")}
          />
        </FormField>

        <Button
          type="submit"
          loading={loading}
          className="w-full"
        >
          Register
        </Button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </Card>
  );
}