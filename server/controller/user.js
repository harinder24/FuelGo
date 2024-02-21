import userModel from "../model/user.js";
import localitiesModel from "../model/localities.js";
import dotenv from "dotenv";
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
  let radius = 50000;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.GOOGLE_API_KEY}`;
  const url2 = `https://maps.googleapis.com/maps/api/place/details/output?&type=gas_station`
  

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.status === "OK") {
      const results = data.results;
      let localitiesArray = []
      if (results.length > 0) {
        for (const component of results[0].address_components) {
          if (component.types.includes("administrative_area_level_1")) {
           localitiesArray[1] = component.long_name
           
          }
          if (component.types.includes("administrative_area_level_2")) {
           
            localitiesArray[0] = component.long_name
          }
          if (component.types.includes("country")) {
           
            localitiesArray[2] = component.long_name
          }
        }
        const foundLocality = await userModel.findOne({ locality: localitiesArray.join(" ") });
        if(foundLocality){
          return res.status(201).json({ success: true, data: localitiesArray });  
          
        }else{
          const newLocality = new localitiesModel({
            locality : localitiesArray.join(" ") 
          });
          await newLocality.save();

        }
      }

      return res.status(201).json({ success: true, data: localitiesArray });
    } else {
      console.error("Error:", data.status);

      return res
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
}

export { sendUserData, getGasStations };
