import React, { useState, useEffect, useId } from 'react';
//import helper functions
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
  const [localSearchTerms, updateLocalSearchTerms] = useState('');
  const [localSearchResults, updateLocalSearchResults] = useState([]);

  async function searchByLetter(e) {
    if (e.key === 'Meta') return;
    if (e.key === 'Backspace') {
      updateLocalSearchTerms((prev) => {
        let temp = prev.split('');
        temp.pop();
        temp = temp.join('');
        return temp;
      });
      return;
    }
    updateLocalSearchTerms((prev) => {
      return (prev += e.key);
    });
    console.log(e.key, ' vs ', localSearchTerms);
  }

  useEffect(async () => {
    if (localSearchTerms) {
      let results = await getLocalSearch(localSearchTerms);
      results = parseResults(results);
      updateLocalSearchResults(results);
    }
  }, [localSearchTerms]);

  return (
    <>
      <form>
        <label>Search Spotify</label>
        <input
          type='text'
          id={sectionId}
          name={`seed`}
          placeholder='click search'
          onKeyDown={searchByLetter}
        ></input>
      </form>
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
