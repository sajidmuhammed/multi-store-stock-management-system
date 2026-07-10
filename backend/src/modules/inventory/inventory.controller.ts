import { Request, Response } from "express";

import inventoryService from "./inventory.service";

import { asyncHandler } from "../../shared/utils/async-handler";
import { sendSuccess } from "../../shared/response/api-response";

import { HTTP_STATUS } from "../../shared/constants/http_status";

class InventoryController {

  adjustStock = asyncHandler(
    async (req: Request, res: Response) => {

      const inventory = await inventoryService.adjustStock(
        req.body
      );

      return sendSuccess(
        res,
        HTTP_STATUS.OK,
        "Stock adjusted successfully.",
        inventory
      );

    }
  );


  transferStock = asyncHandler(
    async (req: Request, res: Response) => {

      const transfer = await inventoryService.transferStock(
        req.body
      );

      return sendSuccess(
        res,
        HTTP_STATUS.OK,
        "Stock transferred successfully.",
        transfer
      );

    }
  );


  getInventory = asyncHandler(
    async (req: Request, res: Response) => {

      const threshold =
        req.query.threshold !== undefined
          ? Number(req.query.threshold)
          : undefined;

      const inventory =
        await inventoryService.getInventory(
          threshold
        );

      return sendSuccess(
        res,
        HTTP_STATUS.OK,
        "Inventory fetched successfully.",
        inventory
      );

    }
  );

}

export default new InventoryController();