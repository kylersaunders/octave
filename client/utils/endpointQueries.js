module.exports = {
  trackAttributes: [
    'acousticness',
    'danceability',
    'duration_ms',
    'energy',
    'instrumentalness',
    'key',
    'liveness',
    'loudness',
    'mode',
    'popularity',
    'speechiness',
    'tempo',
    'time_signature',
    'valence',
  ],
  buildRecQueryString: (e) => {
    // const recType = //target, max, min
    //required
    const seed = e.target.id; //up to 5 artists, tracks, genres
    //limits
    const limit = document.getElementById('recLimit').value || 20; //1<=100, 20
    //attributes to filter on
    const acousticness = document.getElementById('minBPM').value; //0 to 1
    const danceability = document.getElementById('minBPM').value; //0 to 1
    const duration_ms = document.getElementById('minBPM').value; //0 to 1
    const energy = document.getElementById('minBPM').value; //0 to 1
    const instrumentalness = document.getElementById('minBPM').value; //0 to 1
    const key = document.getElementById('minBPM').value; //0 to 1
    const liveness = document.getElementById('minBPM').value; //0 to 1
    const loudness = document.getElementById('minBPM').value; //0 to 1
    const mode = document.getElementById('minBPM').value; //0 to 1
    const popularity = document.getElementById('minBPM').value; //0 to 1
    const speechiness = document.getElementById('minBPM').value; //0 to 1
    const tempo = document.getElementById('minBPM').value; //0 to 1
    const time_signature = document.getElementById('minBPM').value; //0 to 1
    const valence = document.getElementById('minBPM').value; //0 to 1
    let queryString = `seed=${seed}&min=${min}&max=${max}`;
    console.log('queryString', queryString);
    return queryString;
  },
};
