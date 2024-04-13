import { Schema, model, models } from 'mongoose';

const ListSchema = new Schema(
  {
    email: { type: String, required: true },
    favorite: { type: Boolean, default: false, required: true },
    category: { type: String, required: true },
    location: { type: Object, required: true },
    image: { type: String },

    title: { type: String, required: true },
    description: {
      type: String,
      required: true,
      default:
        'In this captivating scene, the morning sun casts a soft, golden glow over a serene landscape nestled deep within the heart of the wilderness. Towering evergreen trees stand tall, their lush foliage creating a verdant canopy overhead. Wisps of mist gently rise from the forest floor, adding an ethereal quality to the tranquil scene.',
    },

    guests: { type: Number, required: true },
    rooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },

    price: { type: Number, required: true },
  },
  { timestamps: true }
);

export const List = models?.List || model('List', ListSchema);
