import { Schema, model, Document, Types } from "mongoose";

export interface IStock extends Document {
  productId: Types.ObjectId;
  storeId: Types.ObjectId;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

const stockSchema = new Schema<IStock>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    storeId: {
      type: Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);


stockSchema.index(
  {
    productId: 1,
    storeId: 1,
  },
  {
    unique: true,
  }
);

export const Stock = model<IStock>(
  "Stock",
  stockSchema
);