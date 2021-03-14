// mongoDB Object Modelling
import mongoose from "mongoose";

const rotaSchema = new mongoose.Schema({
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
      employeeId: {
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
});

const Rota = mongoose.model("Rota", rotaSchema);

export default Rota;
