import userModel from "../model/user.js";
import localitiesModel from "../model/localities.js";
import stationModel from "../model/station.js";
import dotenv from "dotenv";
import axios from "axios";
import jwt from "jsonwebtoken";

dotenv.config();
const sendUserData = async (req, res) => {
  if (req?.decodedEmail) {
    const foundUser = await userModel.findOne({ email: req.decodedEmail });
    if (foundUser) {
      const data = foundUser;

      return res.status(201).json({ success: true, data: data });
    }
  }
  return res.status(401).json({ success: false });
};
async function getGasStations(req, res) {

  const { latitude, longitude } = req.body;
  let radius = 2000;
 
    let apiUrl = 
     `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=gas_station&key=${process.env.GOOGLE_API_KEY}`;
     //'https://places.googleapis.com/v1/places:searchNearby'
    let gasStations = [];
    let nextPageToken = null;
    try {
      do {
        if (nextPageToken) {
          apiUrl += `&pageToken=${nextPageToken}`;
        }

        const responseData = await axios.get(apiUrl);;

        gasStations = gasStations.concat(responseData.data.results);
        nextPageToken = responseData.data.next_page_token;
      
      } while (nextPageToken);
    } catch (error) {
      console.log(error);
    }
    return res.status(201).json({ success: true, data: gasStations });
    gasStations.map(async (station) => {
      const gs = await getGasStation(
        station.geometry.location.lat,
        station.geometry.location.lng
      );
      if (gs.length !== 0) {
      } else {
        const photoRef = station.photos[0].photo_reference;

        const imageUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${400}&photoreference=${photoRef}&key=${
          process.env.GOOGLE_API_KEY
        }`;

        // try {
        //   const response = await axios.get(imageUrl);
        //   const imageLink = response.request.res.responseUrl;
        //   const newStation = new stationModel(body);
        //   newStation.name = station.name;
        //   newStation.profileImg = imageLink;
        //   newStation.address = station.vicinity;
        //   newStation.placeId = station.place_id;
        //   newStation.latlng.latitude = station.geometry.location.lat;
        //   newStation.latlng.longitude = station.geometry.location.lng;
        //   newStation.googleRating.rating = station.rating;
        //   newStation.googleRating.totalRating = station.user_ratings_total;
        //   newStation.price.diesel.price = 0;
        //   newStation.price.midGrade.price = 0;
        //   newStation.price.premium.price = 0;
        //   newStation.price.regular.price = 0;
        //   newStation.amenities.airPump.isValid = false
        //   newStation.amenities.atm.isValid = false
        //   newStation.amenities.carWash.isValid = false
        //   newStation.amenities.convenienceStore.isValid = false
        //   newStation.amenities.evChargingStation.isValid = false
        //   newStation.amenities.truckStop.isValid = false

        //   // newStation.location = {
        //   //   type: "Point",
        //   //   coordinates: [
        //   //     newStation.region.longitude,
        //   //     newStation.region.latitude,
        //   //   ],
        //   // };
        //   // await newStation.save();
        // } catch (error) {
        //   console.error("Axios error:", error);
        // }
      }
    });
    return res.status(201).json({ success: true, data: gasStations });
  // }
}

async function getGasStation(latitude, longitude) {
  const specificStation = await localitiesModel.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [longitude, latitude],
        },

        distanceField: "distance",
        maxDistance: 0,
      },
    },
  ]);
  return specificStation;
}

export { sendUserData, getGasStations };
