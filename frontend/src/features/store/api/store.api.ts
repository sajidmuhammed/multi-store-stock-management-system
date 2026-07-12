import api from "../../../config/axios";

import type {
  Store,
  CreateStoreRequest,
} from "../types/store.types";

export const getStores = async (): Promise<Store[]> => {
  const response = await api.get("/stores");

  return response.data.data;
};

export const getStoreById = async (
  id: string
): Promise<Store> => {
  const response = await api.get(`/stores/${id}`);

  return response.data.data;
};

export const createStore = async (
  data: CreateStoreRequest
): Promise<Store> => {debugger
  const response = await api.post(
    "/stores",
    data
  );

  return response.data.data;
};