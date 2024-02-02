import React, { useState, useEffect } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';

const AutocompleteComponent = () => {
    const [address, setAddress] = useState('');
    const [isOptions, setIsOptions] = useState(true);
    const ref = React.useRef(null);

    useEffect(()=>{
setIsOptions(true)
    },[address])


    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsOptions(false)
        }
      };
  
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      // Clean up the event listener when component unmounts
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
    const handleSelect = async (value) => {
      setAddress(value);
      try {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        console.log('Selected Place:', { address: value, latLng });
        setIsOptions(false)
      } catch (error) {
        console.error('Error selecting place:', error);
      }
    };
 
    return (
      <div className=' h-full flex-1 bg-inherit rounded-lg' ref={ref}>
        <PlacesAutocomplete
        
          value={address}
          onChange={setAddress}
          onSelect={handleSelect}
       
          
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div className='w-full h-full bg-inherit rounded-lg'>
              <input
             
                {...getInputProps({
                  placeholder: ' Enter address',
                  className: 'w-full h-full bg-inherit border-lightMode-border border-[0px]  pl-2 rounded-inherit focus-visible:outline-0 rounded-lg'
                })}
              />
             {isOptions && address && 
              <div id='autocomplete-dropdown' className="autocomplete-dropdown-container bg-inherit h-[100px] overflow-auto pl-2  mt-2 mr-2 w-full">
                {loading && <div>Loading...</div>}
                
                {suggestions.map((suggestion,i) => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  return (
                    <div
                    key={i}
                    className='w-full'
                      {...getSuggestionItemProps(suggestion, {
                        className
                      })}
                    >
                      <span className='text-md cursor-pointer py-6 w-full '>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
}
            </div>
          )}
        </PlacesAutocomplete>
  </div>
    );
  };

export default AutocompleteComponent;
