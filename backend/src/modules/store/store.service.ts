import { Store } from "./store.model";
import { mapStore } from "./store.mappers";
import { CreateStoreInput } from "./store.validation";

import { AppError } from "../../shared/errors/app_error";
import { HTTP_STATUS } from "../../shared/constants/http_status";
import { ERROR_CODES } from "../../shared/constants/error_codes";
import { logger } from "../../shared/logger/logger";

class StoreService {

  async createStore(data: CreateStoreInput) {

    const existingStore = await Store.exists({
      name: data.name,
    });

    if (existingStore) {
      throw new AppError(
        HTTP_STATUS.CONFLICT,
        "Store already exists.",
        ERROR_CODES.DUPLICATE_RESOURCE
      );
    }

    const store = await Store.create({
      name: data.name,
    });

    logger.info(
      `Store created. ID=${store._id}`
    );

    return mapStore(store);
  }

  async getStores() {

    const stores = await Store.find().sort({
      createdAt: -1,
    });

    return stores.map(mapStore);
  }

  async getStoreById(storeId: string) {

    const store = await Store.findById(storeId);

    if (!store) {
      throw new AppError(
        HTTP_STATUS.NOT_FOUND,
        "Store not found.",
        ERROR_CODES.STORE_NOT_FOUND
      );
    }

    return mapStore(store);
  }

}

export default new StoreService();