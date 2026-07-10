import { Request, Response } from "express";

import storeService from "./store.service";

import { asyncHandler } from "../../shared/utils/async-handler";
import { sendSuccess } from "../../shared/response/api-response";

import { HTTP_STATUS } from "../../shared/constants/http_status";

class StoreController {

  createStore = asyncHandler(
    async (req: Request, res: Response) => {

      const store = await storeService.createStore(req.body);

      return sendSuccess(
        res,
        HTTP_STATUS.CREATED,
        "Store created successfully.",
        store
      );
    }
  );

  getStores = asyncHandler(
    async (_req: Request, res: Response) => {

      const stores = await storeService.getStores();

      return sendSuccess(
        res,
        HTTP_STATUS.OK,
        "Stores fetched successfully.",
        stores
      );
    }
  );

  getStoreById = asyncHandler(
    async (req: Request, res: Response) => {

      const store = await storeService.getStoreById(
        req.params.id as string
      );

      return sendSuccess(
        res,
        HTTP_STATUS.OK,
        "Store fetched successfully.",
        store
      );
    }
  );

}

export default new StoreController();