import { Schema, model, models } from 'mongoose';

const ListSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },

    category: { type: String, required: true },
    location: { type: Object, required: true },
    image: { type: String },

    title: { type: String, required: true },
    description: { type: String, required: true },

    guests: { type: Number, required: true },
    rooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },

    price: { type: Number, required: true },
  },
  { timestamps: true }
);

export const List = models?.List || model('List', ListSchema);
