import mongoose from "mongoose";
const localitiesSchema = {
  region: {
    longitude: {
      type: Number,
    },
    latitude: {
      type: Number,
    },
  },
};

const localitiesModel = mongoose.model("Localities", localitiesSchema);

export default localitiesModel;
