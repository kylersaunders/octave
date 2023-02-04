import React, {
  useState,
  useEffect,
  useMemo,
  useId,
  useRef,
  useImperativeHandle,
  useLayoutEffect,
} from 'react';
import debounce from 'lodash.debounce';
import { parseResults } from '../../utils/helperFunctions';
import { getLocalSearch } from '../../utils/endpointFunctions';

// //map state
// function mapStateToProps(state) {
//   return {
//     // workoutSections: state.buildWorkout.value,
//     // workoutTemplate: state.buildWorkout.template,
//     // workoutResult: state.buildWorkout.result,
//     workoutSeeds: state.buildWorkout.seeds,
//   };
// }

const SearchResults = (props) => {
  const {
    sectionId,
    updateShowSearchDiv,
    updateSeedTracks,
    updateSeedTracksNames,
  } = props;
  const [localSearchResults, updateLocalSearchResults] = useState([]);
  const searchString = useRef();
  const debounceSearch = useMemo(() => debounce(search, 900), []);

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, []);

  async function search() {
    if (searchString.current.value) {
      let results = await getLocalSearch(searchString.current.value);
      results = parseResults(results);
      updateLocalSearchResults(results);
      searchString.current.value = '';
    }
  }

  return (
    <>
      <br />
      <label>Search Spotify</label>
      <input
        type='text'
        id={sectionId}
        ref={searchString}
        name={`seed`}
        placeholder='click search'
        onKeyUp={debounceSearch}
      ></input>
      {(localSearchResults.length ? true : false) && (
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Artists</th>
              <th>Popularity</th>
              <th>Mins</th>
              <th>BPM</th>
              <th>{sectionId}</th>
            </tr>
          </thead>
          <tbody>
            {(localSearchResults.length ? true : false) &&
              localSearchResults.map((x) => {
                const {
                  preview_url,
                  id,
                  name,
                  popularity,
                  artists_names,
                  duration_ms,
                } = x;
                return (
                  <tr>
                    <td>
                      <audio
                        controls
                        src={preview_url}
                        id={'prev' + id}
                      ></audio>
                    </td>
                    <td>{name}</td>
                    <td>{artists_names}</td>
                    <td>{popularity}</td>
                    <td>{(duration_ms / 1000 / 60).toFixed(2)}</td>
                    <td>TBD</td>
                    <td>
                      <button
                        id={`${id}`}
                        type='button'
                        value='Use as base vibe'
                        onClick={(e) => {
                          e.preventDefault();
                          updateSeedTracks((prev) => {
                            if (prev[sectionId]) {
                              prev[sectionId] += `,${id}`;
                            } else {
                              prev[sectionId] = `${id}`;
                            }
                            return prev;
                          });
                          updateSeedTracksNames((prev) => {
                            if (prev[sectionId]) {
                              prev[
                                sectionId
                              ] += `, ${name} by ${artists_names}`;
                            } else {
                              prev[sectionId] = `${name} by ${artists_names}`;
                            }
                            return prev;
                          });
                          updateShowSearchDiv(false);
                        }}
                      ></button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default SearchResults;
