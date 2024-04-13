import { Schema, model, models } from 'mongoose';

const ReservationSchema = new Schema(
  {
    email: { type: String, required: true },

    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },

    favorite: { type: Boolean, required: true, default: false },

    image: { type: String, required: true },

    location: { type: Object, required: true },

    guests: { type: Number, required: true },
    rooms: { type: Number, required: true },
    bathrooms: { type: String, required: true },

    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    price: { type: Number, required: true },
    total: { type: Number, required: true },
    days: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Reservation =
  models?.Reservation || model('Reservation', ReservationSchema);
