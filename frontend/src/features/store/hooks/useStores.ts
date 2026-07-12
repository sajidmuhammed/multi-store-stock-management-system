import { useEffect, useState } from "react";

import * as storeApi from "../api/store.api";

import type {
  Store,
  CreateStoreRequest,
} from "../types/store.types";

export function useStores() {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);

  const loadStores = async () => {
    try {
      setLoading(true);

      const data = await storeApi.getStores();

      setStores(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStores();
  }, []);

  const create = async (
    store: CreateStoreRequest
  ) => {
    await storeApi.createStore(store);

    await loadStores();
  };

  return {
    stores,
    loading,
    create,
    reload: loadStores,
  };
}