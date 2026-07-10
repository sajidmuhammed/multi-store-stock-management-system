import { Schema, model, Document } from "mongoose";

export interface IProduct extends Document {
    name: string;
    sku: string;
    createdAt: Date;
    updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
    {
        name: { type: String, required: true,
            trim: true
        },
        sku: { type: String, required: true, unique: true,
            uppercase: true, trim: true
        }
    },
    { timestamps: true },
)

export const Product = model<IProduct>("Product", productSchema);
