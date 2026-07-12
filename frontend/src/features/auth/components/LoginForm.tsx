import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import FormField from "../../../components/shared/FormField";

import {
  loginSchema,
  type LoginFormData,
} from "../validation/auth.schema";

import * as authApi from "../api/auth.api";
import { useAuth } from "../hooks/useAuth";

export default function LoginForm() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);

      const response = await authApi.login(data);

      login(response.token, response.user);

      navigate("/products");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-md p-8">
      <h1 className="mb-2 text-center text-3xl font-bold">
        Login
      </h1>

      <p className="mb-6 text-center text-gray-500">
        Sign in to your account
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
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

        <Button
          type="submit"
          loading={loading}
          className="w-full"
        >
          Login
        </Button>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-blue-600 hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </Card>
  );
}