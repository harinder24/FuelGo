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
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';

export default function Home() {
  const { pathname } = useLocation();
  const isFavouritePage = pathname == '/favourite';
  const { user, token } = useAuth();
  const [isList, setIsList] = useState(true);
  const [isLoading, setIsloading] = useState(true);
  const [favourites, setFavourites] = useState([]);
  const { gasStation, setGasStation, userLatLng, setUserLatLng } =
    useContext(Context);
  const [preferences, setPreferences] = useState({
    sort: 'Distance',
    recent: false,
    fuelType: 'Regular',
    Amenities: [],
  });
  useEffect(() => {
    fetchInitialStations();
  }, [user.id, pathname]);

  useEffect(() => {
    fetchFavourite();
  }, [user.favourite]);

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
  const getFavourites = () => {
    user.favourite?.map(async (placeId) => {
      try {
        const placeInfo = await getGasStationById(placeId, token);
        setFavourites((prev) => [...prev, placeInfo]);
      } catch (error) {
        alert(error);
      }
    });
  };

  const fetchFavourite = () => {
    if (!user) return;
    if (!isFavouritePage) return;

    setIsloading(true);

    setFavourites([]);
    getFavourites();
  };
  const fetchInitialStations = () => {
    if (!user) return;

    if (isFavouritePage) {
      setIsloading(true);
      setFavourites([]);
      getFavourites();
      return;
    }

    if (gasStation) return;

    setIsloading(true);
    getStationsNearBy();
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
        <GasStationList
          isList={isList}
          isFavouritePage={isFavouritePage}
          favourites={favourites}
          preferences={preferences}
        />
      )}
    </>
  );
}
