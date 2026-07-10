import { Request, Response } from "express";

import productService from "./product.service";

import { asyncHandler } from "../../shared/utils/async-handler";

import { sendSuccess } from "../../shared/response/api-response";

import { HTTP_STATUS } from "../../shared/constants/http_status";

class ProductController {

  createProduct = asyncHandler(
    async (req: Request, res: Response) => {

      const product = await productService.createProduct(req.body);

      return sendSuccess(
        res,
        HTTP_STATUS.CREATED,
        "Product created successfully.",
        product
      );

    }
  );

  getProducts = asyncHandler(
    async (_req: Request, res: Response) => {

      const products = await productService.getProducts();

      return sendSuccess(
        res,
        HTTP_STATUS.OK,
        "Products fetched successfully.",
        products
      );

    }
  );

  getProductById = asyncHandler(
    async (req: Request, res: Response) => {

      const product = await productService.getProductById(
        req.params.id as string
      );

      return sendSuccess(
        res,
        HTTP_STATUS.OK,
        "Product fetched successfully.",
        product
      );

    }
  );

}

export default new ProductController();

