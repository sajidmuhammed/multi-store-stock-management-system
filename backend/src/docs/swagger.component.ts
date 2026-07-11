/**
 * @openapi
 * components:
 *
 *   schemas:
 *
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           example: John Doe
 *         email:
 *           type: string
 *           example: john@test.com
 *         password:
 *           type: string
 *           example: Password@123
 *
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         sku:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     CreateProductRequest:
 *       type: object
 *       required:
 *         - name
 *         - sku
 *       properties:
 *         name:
 *           type: string
 *         sku:
 *           type: string
 *
 *     Store:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *
 *     CreateStoreRequest:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *
 *     Inventory:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         quantity:
 *           type: integer
 *         product:
 *           $ref: '#/components/schemas/Product'
 *         store:
 *           $ref: '#/components/schemas/Store'
 *
 *     AdjustStockRequest:
 *       type: object
 *       required:
 *         - productId
 *         - storeId
 *         - change
 *       properties:
 *         productId:
 *           type: string
 *         storeId:
 *           type: string
 *         change:
 *           type: integer
 *
 *     TransferStockRequest:
 *       type: object
 *       required:
 *         - productId
 *         - sourceStoreId
 *         - destinationStoreId
 *         - quantity
 *       properties:
 *         productId:
 *           type: string
 *         sourceStoreId:
 *           type: string
 *         destinationStoreId:
 *           type: string
 *         quantity:
 *           type: integer
 */

export {};