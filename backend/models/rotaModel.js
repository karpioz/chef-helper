// mongoDB Object Modelling
import mongoose from "mongoose";

const rotaSchema = new mongoose.Schema(
  {
    weeklyRota: [
      {
        dayId: {
          type: Number,
        },
        day: {
          type: String,
        },
        date: {
          type: String,
        },

        employees: [
          {
            nameId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
            },
            start: {
              type: String,
            },
            finish: {
              type: String,
            },
            isOff: {
              type: Boolean,
              default: false,
            },
          },
        ],
      },
    ],
    weekStart: {
      type: String,
    },
  },
  { timestamps: true }
);

const Rota = mongoose.model("Rota", rotaSchema);

export default Rota;
