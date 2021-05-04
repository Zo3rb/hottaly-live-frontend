import { Fragment } from 'react';
import GeocodeEarthAutocomplete from 'react-geocode-earth-autocomplete';

import { Input } from 'reactstrap';

export default function App({ location, locationSetter }) {

    // Creating State for address and add API KEY
    const MY_API_KEY = "ge-990aac3175662b78";

    return (
        <Fragment>
            <label htmlFor="location-input" className="form-label">Location: </label>
            <GeocodeEarthAutocomplete
                searchOptions={{
                    api_key: MY_API_KEY
                }}
                value={location}
                onChange={(newAddress) => {
                    locationSetter(newAddress);
                }}
                onSelect={(newAddress) => {
                    // do an api call
                    locationSetter(newAddress);
                }}
            >
                {
                    ({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
                        return (
                            <div className="mb-3">
                                <Input
                                    id="location-input"
                                    className="form-control"
                                    {...getInputProps({
                                        placeholder: 'Search Places ...',
                                        className: 'location-search-input',
                                    })}
                                />
                                <div className="autocomplete-dropdown-container">
                                    {loading && <div>Loading...</div>}
                                    {suggestions.map(suggestion => {
                                        const className = suggestion.active
                                            ? 'suggestion-item--active'
                                            : 'suggestion-item';
                                        // inline style for demonstration purpose
                                        const style = suggestion.active
                                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                            : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                        return (
                                            <div
                                                {...getSuggestionItemProps(suggestion, {
                                                    className,
                                                    style,
                                                })}
                                            >
                                                <span>{suggestion.description}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )
                    }
                }
            </GeocodeEarthAutocomplete>
        </Fragment>
    );
};
