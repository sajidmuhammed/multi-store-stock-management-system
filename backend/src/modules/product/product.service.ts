import { Product } from "./product.model";
import { mapProduct } from "./product.mapper";

import { CreateProductInput } from "./product.validation";

import { AppError } from "../../shared/errors/app_error";
import { HTTP_STATUS } from "../../shared/constants/http_status";
import { ERROR_CODES } from "../../shared/constants/error_codes";
import { logger } from "../../shared/logger/logger";

class ProductService {
  async createProduct(data: CreateProductInput) {
    const existingProduct = await Product.exists({
      sku: data.sku,
    });

    if (existingProduct) {
      throw new AppError(
        HTTP_STATUS.CONFLICT,
        "A product with this SKU already exists.",
        ERROR_CODES.DUPLICATE_RESOURCE
      );
    }

    const product = await Product.create({
      name: data.name,
      sku: data.sku,
    });

    logger.info(
      `Product created. ID=${product.id}, SKU=${product.sku}`
    );

    return mapProduct(product);
  }

  async getProducts() {
    const products = await Product.find()
      .sort({ createdAt: -1 });

    return products.map(mapProduct);
  }

  async getProductById(productId: string) {
    const product = await Product.findById(productId);

    if (!product) {
      throw new AppError(
        HTTP_STATUS.NOT_FOUND,
        "Product not found.",
        ERROR_CODES.PRODUCT_NOT_FOUND
      );
    }

    return mapProduct(product);
  }
}

export default new ProductService();