import { useContext, useEffect, useState } from 'react';
import GasStationList from '../Components/GasStationList/GasStationList';
import Preferences from '../Components/User/Preferences';
import Context from '../context';
import {
  getCrrLocation,
  getGasStationById,
  getGasStations,
} from '../api/gasStation';
import Loading from '../Components/UI/Loading';
import TopNavHome from '../Components/TopNav/TopNavHome';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { pathname } = useLocation();
  const isFavouritePage = pathname == '/favourite';
  const { user, token } = useAuth();
  const [isList, setIsList] = useState(true);
  const [isLoading, setIsloading] = useState(true);
  const [favourites, setFavourites] = useState();
  const { gasStation, setGasStation, userLatLng, setUserLatLng } =
    useContext(Context);
  const [preferences, setPreferences] = useState({
    sort: 'Distance',
    recent: false,
    fuelType: 'Regular',
    Amenities: [],
  });

  useEffect(() => {
    if (!user) return;

    if (isFavouritePage) {
      setIsloading(true);
      setFavourites();

      getFavouriteStations(user.favourite);
      return;
    }
    if (gasStation) return;

    getStationsNearBy();
  }, [user, pathname]);

  useEffect(() => {
    if (!user?.favourite || !user?.favourite.length) {
      setIsloading(false);
      return;
    }
    if (user?.favourite.length !== favourites?.length) return;
    setIsloading(false);
  }, [favourites]);

  const getStationsNearBy = async () => {
    try {
      const crrLatLng = await getCrrLocation();
      setUserLatLng(crrLatLng);
      const stationList = await getGasStations(crrLatLng);
      setGasStation(stationList);
      setIsloading(false);
    } catch (e) {
      alert(e.message);
    }
  };
  const getFavouriteStations = async (locations) => {
    locations.forEach(async (locationId) => {
      try {
        const station = await getGasStationById(locationId, token);
        setFavourites((prev) => (prev ? [...prev, station] : [station]));
      } catch (error) {
        alert(error);
        return;
      }
    });
  };

  return (
    <>
      <TopNavHome isList={isList} setIsList={setIsList} />
      <Preferences
        isList={isList}
        preferences={preferences}
        setPreferences={setPreferences}
      />
      {isLoading ? (
        <Loading bgColor='bg-inherit' />
      ) : (
        <GasStationList isList={isList} preferences={preferences} />
      )}
    </>
  );
}
