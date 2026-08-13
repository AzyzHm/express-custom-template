import { Schema, model, Document } from 'mongoose';

export interface IItem extends Document {
  name: string;
  description?: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

const itemSchema = new Schema<IItem>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    quantity: { type: Number, required: true, min: 0, default: 0 },
  },
  { timestamps: true },
);

export const ItemModel = model<IItem>('Item', itemSchema);
