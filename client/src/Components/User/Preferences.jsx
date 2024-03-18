import { useContext, useEffect, useState } from 'react';
import BgBlackOpacity from '../../Components/BgBlackOpacity';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Context from '../../context';

const PREFERENCES = [
  { title: 'Recently updated' },
  { title: 'Sort', options: ['Distance', 'Rating', 'Price'] },
  {
    title: 'Fuel type',
    options: ['Regular', 'Mid-grade', 'Premium', 'Diesel'],
  },
  {
    title: 'Amenities',
    options: [
      'Car wash',
      'Air pump',
      'Convenience store',
      'Ev charging station',
      'Atm',
    ],
  },
];

export default function Preferences({
  isList,
  setGasStation,
  preferences,
  setPreferences,
}) {
  const [crrPref, setCrrPref] = useState([
    false,
    0,
    0,
    [false, false, false, false, false],
  ]);
  useEffect(() => {
    console.log('crrPref', crrPref);
  }, [crrPref]);
  const [crrOptions, setCrrOptions] = useState();
  const { setGasStationPreference, gasStation } = useContext(Context);
  console.log(gasStation);
  const applyPrefFilter = () => {
    const stationsFiltered = [...gasStation];
  };

  //TODO:
  const [bgPopUp, setBgPopUp] = useState(false);
  const [target, setTarget] = useState(null);
  const [preferencePopUp, setPreferencePopUp] = useState(false);

  useEffect(() => {
    if (gasStation) {
      const amenitiesMapping = {
        'Car wash': 'carWash',
        'Air pump': 'airPump',
        'Convenience store': 'convenienceStore',
        'Ev charging station': 'evChargingStation',
        Atm: 'atm',
      };
      let gasStationClone = [...gasStation];
      //  console.log(preferences.Amenities);

      gasStationClone = gasStationClone.filter((station) => {
        return preferences.Amenities.every((amenity) => {
          const amenityName = amenity.name;
          const amenityKey = amenitiesMapping[amenityName];
          return amenityKey
            ? station.amenities[amenityKey]?.isValid === true
            : true;
        });
      });

      if (preferences.sort === 'Distance') {
        gasStationClone.sort((a, b) => {
          const distanceA = parseFloat(a.distanceFromUser.replace(' km', ''));
          const distanceB = parseFloat(b.distanceFromUser.replace(' km', ''));

          if (distanceA < distanceB) {
            return -1;
          } else if (distanceA > distanceB) {
            return 1;
          } else {
            return 0;
          }
        });
      }
      // console.log(gasStationClone);
      setGasStationPreference(gasStationClone);
    }
  }, [preferences, gasStation]);
  // useEffect(() => {
  //   console.log(preferences);
  // }, [preferences]);
  const preferencesBtn = ['Recently updated', 'Sort', 'Fuel type', 'Amenities'];
  const preferenceData = [
    ['Verifierd', 'Not verified'],
    ['Distance', 'Rating', 'Price'],
    ['Regular', 'Mid-grade', 'Premium', 'Diesel'],
    ['Car wash', 'Air pump', 'Convenience store', 'Ev charging station', 'Atm'],
  ];
  function preferenceOnclickHandler(i) {
    if (i === 0) {
      setPreferences({ ...preferences, recent: !preferences.recent });
    } else {
      setBgPopUp(true);
      setTarget(i);
      setPreferencePopUp(true);
    }
  }
  function bgPopUpOnClick() {
    setBgPopUp(false);
    setPreferencePopUp(false);
  }
  return (
    <>
      <div
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        className='h-8 w-full flex flex-row my-4 min-[520px]:justify-evenly max-[520px]:w-screen max-[520px]:overflow-x-auto max-[520px]:gap-x-4 max-[520px]:px-4'
      >
        {bgPopUp && (
          <div
            className=' absolute top-0 w-screen h-screen z-40'
            onClick={() => bgPopUpOnClick()}
          >
            <BgBlackOpacity isTransparent={true} />
          </div>
        )}
        <div className='w-full h-8 flex flex-row min-[520px]:justify-evenly max-[520px]:w-screen max-[520px]:overflow-x-auto max-[520px]:gap-x-4 max-[520px]:px-4 '>
          {preferencesBtn.map((item, i) => {
            if (!isList && item === 'Sort') {
              return <></>;
            }
            return (
              <div key={item} className=' relative max-[520px]:static  h-full'>
                <div
                  onClick={() => preferenceOnclickHandler(i)}
                  key={item}
                  className={`h-full px-2 text-lightMode-header  ${
                    i === 0 && preferences.recent ? 'bgbtn' : 'sbg'
                  } 
                ${i === 1 && preferences.sort !== 'Distance' ? 'bgbtn' : 'sbg'} 
               ${
                 i === 2 && preferences.fuelType !== 'Regular' ? 'bgbtn' : 'sbg'
               }
              ${i === 3 && preferences.Amenities.length !== 0 ? 'bgbtn' : 'sbg'}
              ${i === 4 && preferences.Distance !== 5 ? 'bgbtn' : 'sbg'}
              rounded-lg flex flex-row items-center justify-center text-xs gap-x-1 cursor-pointer ${
                i !== 0 && ' w-[90px]'
              }`}
                >
                  <div>{item}</div>

                  {i === 0 ? (
                    // <VerifiedOutlinedIcon sx={{ fontSize: 16 }} />
                    <></>
                  ) : (
                    <KeyboardArrowDownOutlinedIcon sx={{ fontSize: 16 }} />
                  )}
                </div>

                {preferencePopUp && target === i && (
                  <PreferencePopUp
                    preferenceData={preferenceData}
                    bgPopUpOnClick={bgPopUpOnClick}
                    i={i}
                    setPreferences={setPreferences}
                    preferences={preferences}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className='w-full'>
        <div className='w-full flex flex-col'>
          <div className='w-full flex justify-evenly max-[415px]:justify-start overflow-x-auto gap-x-2 px-4'>
            {PREFERENCES.map((item, i) => {
              if (i == 1 && !isList) {
                return;
              }
              const { title, options } = item;

              return (
                <PreferenceItem
                  key={title}
                  title={title}
                  options={options}
                  itemIndex={i}
                  setCrrPopUp={setCrrOptions}
                  crrPref={crrPref}
                  setCrrPref={setCrrPref}
                />
              );
            })}
          </div>
          <div className='w-full flex'>
            <PreferenceOptions
              crrPopUp={crrOptions}
              setCrrPopUp={setCrrOptions}
              crrPref={crrPref}
              setCrrPref={setCrrPref}
            />
          </div>
        </div>
      </div>
    </>
  );
}
function PreferenceItem({
  title,
  options,
  itemIndex,
  setCrrPopUp,
  crrPref,
  setCrrPref,
}) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!itemIndex) {
      return;
    }
    if (itemIndex == 3) {
      if (crrPref[itemIndex].includes(true)) {
        setIsActive(true);
        return;
      }
      setIsActive(false);
      return;
    }
    setIsActive(crrPref[itemIndex]);
  }, [crrPref]);
  const handlePopUp = () => {
    if (!options) {
      setIsActive(!isActive);
      setCrrPref((prev) => {
        return prev.map((pref, i) => (i ? pref : !pref));
      });
      return;
    }
    setCrrPopUp(itemIndex);
  };
  return (
    <button
      type='button'
      onClick={handlePopUp}
      className={`w-[90px] ${
        !options && 'w-[150px]'
      } h-[40px] mb-4 flex justify-between items-center th text-xs ${
        isActive ? 'bgbtn' : 'sbg'
      } px-3 py-1 rounded-lg`}
    >
      {title}
      {options && <KeyboardArrowDownOutlinedIcon sx={{ fontSize: 16 }} />}
    </button>
  );
}
function PreferenceOptions({ crrPopUp, setCrrPopUp, crrPref, setCrrPref }) {
  const [popUpState, setPopUpState] = useState();
  useEffect(() => {
    setPopUpState(crrPref[crrPopUp]);
  }, [crrPopUp]);
  const isMultipleSelection = crrPopUp == 3;
  const closePopUp = () => {
    setCrrPopUp();
  };
  const saveNewPref = () => {
    setCrrPref((prev) => {
      return prev.map((pref, i) => (crrPopUp == i ? popUpState : pref));
    });
    closePopUp();
  };
  const resetPref = () => {
    setPopUpState(0);
    if (isMultipleSelection) {
      setCrrPref((prev) => {
        return prev.map((pref, i) =>
          crrPopUp == i ? [false, false, false, false, false] : pref
        );
      });
      closePopUp();
      return;
    }
    setCrrPref((prev) => {
      return prev.map((pref, i) => (crrPopUp == i ? 0 : pref));
    });
    closePopUp();
  };
  const handlePopUpState = (optIndex, isMultipleSelection) => {
    if (!isMultipleSelection) {
      setPopUpState(optIndex);
      return;
    }
    if (!popUpState) {
      setPopUpState([false, false, false, false, false]);
    }
    setPopUpState((prev) => {
      return prev.map((option, i) => (i == optIndex ? !option : option));
    });
  };
  return PREFERENCES.map((item, i) => {
    const { title, options } = item;
    const popUpActive = crrPopUp == i;

    return (
      <>
        {popUpActive && (
          <div
            onClick={closePopUp}
            className='absolute top-0 w-screen h-screen'
          >
            <BgBlackOpacity isTransparent={true} />
          </div>
        )}
        <div key={title} className='w-full h-fit flex flex-col items-center'>
          {popUpActive && (
            <div className='sbg z-20 min-[521px]:mb-[-390px] rounded-lg shadow-[0px_0px_6px_#e2e8f033] dark:shadow-[2px_2px_8px_#182335]  th w-[350px] caret-transparent max-[520px]:bottom-0 max-[520px]:left-0 max-[520px]:mt-0 max-[520px]:w-screen max-[520px]:rounded-b-none max-[520px]:absolute'>
              <div className='flex justify-between text-2xl font-[500] p-4 pb-2 border-b-[1px] cborder'>
                <div className='flex-1'>{title}</div>
                <div className=' cursor-pointer flex items-center'>
                  <CloseOutlinedIcon onClick={closePopUp} />
                </div>
              </div>
              <ul className='border-b-[1px] cborder '>
                {options.map((option, j) => {
                  return (
                    <li
                      key={option}
                      onClick={() => handlePopUpState(j, isMultipleSelection)}
                      className='flex items-center px-4 py-[12.5px] cursor-pointer'
                    >
                      <div className='flex-1 text-[16px]'>{option}</div>
                      <div
                        className={`w-4 h-4 flex items-center justify-center ${
                          isMultipleSelection ? ' rounded-sm' : 'rounded-full'
                        } fbg`}
                      >
                        {isMultipleSelection && popUpState && popUpState[j] && (
                          <div className='w-2 h-2 rounded-sm bgbtn'></div>
                        )}

                        {!isMultipleSelection && popUpState == j && (
                          <div className='w-2 h-2 rounded-full bgbtn'></div>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className='flex flex-row justify-between p-4 gap-x-4'>
                <div
                  onClick={resetPref}
                  className=' flex-1 p-3 px-4 bgbtn2 rounded-lg cursor-pointer text-center'
                >
                  Reset
                </div>
                <div
                  onClick={saveNewPref}
                  className=' flex-1 p-3 px-4 bgbtn rounded-lg cursor-pointer text-center'
                >
                  Apply
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  });
}

export function PreferencePopUp({
  preferenceData,
  bgPopUpOnClick,
  i,
  setPreferences,
  preferences,
}) {
  const defaultAmenitiesValue = [
    {
      id: 0,
      name: 'Car wash',
      preferred: false,
    },
    {
      id: 1,
      name: 'Air pump',
      preferred: false,
    },
    {
      id: 2,
      name: 'Convenience store',
      preferred: false,
    },
    {
      id: 3,
      name: 'Ev charging station',
      preferred: false,
    },
    {
      id: 4,
      name: 'Atm',
      preferred: false,
    },
  ];
  const [header, setHeader] = useState('');
  const [radioValue, setRadioValue] = useState(null);
  const [ammenitiesValue, setAmmenitiesValue] = useState(defaultAmenitiesValue);
  const [bottom, setBottom] = useState(0);
  const [distanceValues, setDistanceValues] = useState([5]);

  useEffect(() => {
    if (i === 1) {
      setHeader('Sort');
      setRadioValue(preferences.sort);
      setBottom('-284.6px');
    } else if (i === 2) {
      setHeader('Fuel type');
      setRadioValue(preferences.fuelType);
      setBottom('-333.6px');
    } else if (i === 3) {
      setHeader('Amenities');
      const newAmmentiesValue = [...defaultAmenitiesValue];

      preferences.Amenities.map((item) => {
        newAmmentiesValue[item.id].preferred = true;
      });
      setAmmenitiesValue(newAmmentiesValue);
      setBottom('-382.6px');
    } else if (i === 4) {
      setBottom('-237.6px');
      setDistanceValues([preferences.Distance]);
      setHeader('Distance');
    }
  }, []);

  function amenitiesHandler(i) {
    const newAmmentiesValue = [...ammenitiesValue];
    const pref = newAmmentiesValue[i].preferred;
    newAmmentiesValue[i].preferred = !pref;
    setAmmenitiesValue(newAmmentiesValue);
  }

  function applyHandler() {
    if (i === 1) {
      setPreferences({ ...preferences, sort: radioValue });
      bgPopUpOnClick();
    } else if (i === 2) {
      setPreferences({ ...preferences, fuelType: radioValue });
      bgPopUpOnClick();
    } else if (i === 3) {
      const ammenitiesValueArray = [];
      const newAmmentiesValue = [...ammenitiesValue];

      newAmmentiesValue.map((item) => {
        if (item.preferred) {
          ammenitiesValueArray.push(item);
        }
      });
      setPreferences({ ...preferences, Amenities: ammenitiesValueArray });
      bgPopUpOnClick();
    } else if (i === 4) {
      setPreferences({ ...preferences, Distance: distanceValues[0] });
      bgPopUpOnClick();
    }
  }

  function resetHandler() {
    if (i === 1) {
      setPreferences({ ...preferences, sort: 'Distance' });
      bgPopUpOnClick();
    } else if (i === 2) {
      setPreferences({ ...preferences, fuelType: 'Regular' });
      bgPopUpOnClick();
    } else if (i === 3) {
      setPreferences({ ...preferences, Amenities: [] });
      bgPopUpOnClick();
    } else if (i === 4) {
      setPreferences({ ...preferences, Distance: 5 });
      bgPopUpOnClick();
    }
  }

  return (
    <div
      // style={{ bottom: bottom }}
      className={`absolute bottom-[${bottom}] mt-8 ${
        i < 2 ? 'left-[-90%]' : 'right-[-90%]'
      } ${
        i === 4 && 'right-[0%]'
      }  sbg z-[41] rounded-lg shadow-[0px_0px_6px_#e2e8f033]  dark:shadow-[2px_2px_8px_#182335]  th w-[350px] caret-transparent max-[520px]:bottom-0 max-[520px]:left-0 max-[520px]:mt-0 max-[520px]:w-screen rounded-b-none`}
    >
      <div className='flex flex-row justify-between text-2xl font-[500] p-4 pb-2 '>
        <div className=''>{header}</div>
        <div
          onClick={() => bgPopUpOnClick()}
          className=' cursor-pointer absolute right-3 top-2 '
        >
          <CloseOutlinedIcon />
        </div>
      </div>
      <div className='border-b-[1px] cborder'></div>

      <div>
        {preferenceData[i].map((item, j) => {
          return (
            <div
              onClick={() => {
                if (i === 3) {
                  amenitiesHandler(j);
                } else {
                  setRadioValue(item);
                }
              }}
              key={item}
              className='flex flex-row items-center justify-between px-4 py-[12.5px] cursor-pointer'
            >
              <div className=' text-[16px]'>{item}</div>

              <div className=' relative'>
                {i === 3 ? (
                  <>
                    <div className='w-4 h-4 rounded-[2px] fbg'></div>
                    {ammenitiesValue[j].preferred === true && (
                      <div className='w-2 h-2 rounded-[2px] bgbtn absolute top-1 left-1'></div>
                    )}
                  </>
                ) : (
                  <>
                    <div className='w-4 h-4 rounded-full fbg'></div>
                    {radioValue === item && (
                      <div className='w-2 h-2 rounded-full bgbtn absolute top-1 left-1'></div>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className='border-b-[1px] cborder  '></div>
      <div className='flex flex-row justify-between p-4 gap-x-4'>
        <div
          onClick={() => resetHandler()}
          className=' flex-1 p-3 px-4 bgbtn2 rounded-lg cursor-pointer text-center'
        >
          Reset
        </div>
        <div
          onClick={() => applyHandler()}
          className=' flex-1 p-3 px-4 bgbtn rounded-lg cursor-pointer text-center'
        >
          Apply
        </div>
      </div>
    </div>
  );
}
