import mongoose from "mongoose";
const stationSchema = new mongoose.Schema({
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: { type: [Number], required: true },
  },
  latlng: {
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
  },
  name: {
    type: String,
  },
  profileImg: {
    type: String,
  },
  address: {
    type: String,
  },
  price: {
    regular: {
      price: {
        type: Number,
      },
      timeStamp: {
        type: Number,
      },
      email: {
        type: String,
      },
    },
    midGrade: {
      price: {
        type: Number,
      },
      timeStamp: {
        type: Number,
      },
      email: {
        type: String,
      },
    },
    premium: {
      price: {
        type: Number,
      },
      timeStamp: {
        type: Number,
      },
      email: {
        type: String,
      },
    },
    diesel: {
      price: {
        type: Number,
      },
      timeStamp: {
        type: Number,
      },
      email: {
        type: String,
      },
    },
  },
  amenities: {
    carWash: {
      isValid: {
        type: Boolean,
      },
      valid: {
        type: Number,
      },
      notValid: {
        type: Number,
      },
    },
    atm: {
      isValid: {
        type: Boolean,
      },
      valid: {
        type: Number,
      },
      notValid: {
        type: Number,
      },
    },
    airPump: {
      isValid: {
        type: Boolean,
      },
      valid: {
        type: Number,
      },
      notValid: {
        type: Number,
      },
    },
    convenienceStore: {
      isValid: {
        type: Boolean,
      },
      valid: {
        type: Number,
      },
      notValid: {
        type: Number,
      },
    },
    evChargingStation: {
      isValid: {
        type: Boolean,
      },
      valid: {
        type: Number,
      },
      notValid: {
        type: Number,
      },
    },
    truckStop: {
      isValid: {
        type: Boolean,
      },
      valid: {
        type: Number,
      },
      notValid: {
        type: Number,
      },
    },
  },
  googleRating: {
    rating:{
        type : Number
    },
    totalRating:{
        type: Number
    }
  },
  placeId: {
    type: String
  }

});

stationSchema.index({ location: "2dsphere" });
const stationModel = mongoose.model("Station", stationSchema);
export default stationModel;