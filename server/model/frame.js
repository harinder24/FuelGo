import mongoose from "mongoose";
const frameSchema = new mongoose.Schema({
  link: {  
      type: String,
  },
  isPurchasebale : {
    type: Boolean
  },
  levelCap : {
    type: Number
  },
});

const frameModel = mongoose.model("Avatar", frameSchema);
export default frameModel;
