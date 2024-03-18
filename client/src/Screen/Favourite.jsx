import { useState } from 'react';
import GasStationList from '../Components/GasStationList/GasStationList';
import TopNavHome from '../Components/TopNav/TopNavHome';
import Loading from '../Components/UI/Loading';
import Preferences from '../Components/User/Preferences';

export default function Favourite() {
  const [isList, setIsList] = useState(true);
  const [preferences, setPreferences] = useState();
  const [isLoading, setIsloading] = useState(true);
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
