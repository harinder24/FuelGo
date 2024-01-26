import React, { useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';


const AutocompleteComponent = () => {
    const [address, setAddress] = useState('');

    const handleSelect = async (value) => {
      setAddress(value);
      try {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        console.log('Selected Place:', { address: value, latLng });
      } catch (error) {
        console.error('Error selecting place:', error);
      }
    };
  
    return (
     
        <PlacesAutocomplete
          value={address}
          onChange={setAddress}
          onSelect={handleSelect}
       
          
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div className='w-full h-full bg-inherit'>
              <input
                {...getInputProps({
                  placeholder: ' Enter address',
                  className: 'w-full h-full bg-inherit border-lightMode-border border-[1px] rounded-sm pl-2'
                })}
              />
             { address && 
              <div id='autocomplete-dropdown' className="autocomplete-dropdown-container bg-inherit h-[100px] overflow-hidden pl-2">
                {loading && <div>Loading...</div>}
                
                {suggestions.map((suggestion) => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className
                      })}
                    >
                      <span className='text-md cursor-pointer py-2'>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
}
            </div>
          )}
        </PlacesAutocomplete>
   
    );
  };

export default AutocompleteComponent;
