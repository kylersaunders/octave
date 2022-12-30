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
  // buildRecQueryString: (e) => {
  //   //  recType = //target, max, min
  //   //required
  //    seed = e.target.id; //up to 5 artists, tracks, genres
  //   //limits
  //    limit = document.getElementById('recLimit').value || 20; //1<=100, 20
  //   //attributes to filter on
  //    acousticness = document.getElementById('minBPM').value; //0 to 1
  //    danceability = document.getElementById('minBPM').value; //0 to 1
  //    duration_ms = document.getElementById('minBPM').value; //0 to 1
  //    energy = document.getElementById('minBPM').value; //0 to 1
  //    instrumentalness = document.getElementById('minBPM').value; //0 to 1
  //    key = document.getElementById('minBPM').value; //0 to 1
  //    liveness = document.getElementById('minBPM').value; //0 to 1
  //    loudness = document.getElementById('minBPM').value; //0 to 1
  //    mode = document.getElementById('minBPM').value; //0 to 1
  //    popularity = document.getElementById('minBPM').value; //0 to 1
  //    speechiness = document.getElementById('minBPM').value; //0 to 1
  //    tempo = document.getElementById('minBPM').value; //0 to 1
  //    time_signature = document.getElementById('minBPM').value; //0 to 1
  //    valence = document.getElementById('minBPM').value; //0 to 1
  //   let queryString = `seed=${seed}&min=${min}&max=${max}`;
  //   console.log('queryString', queryString);
  //   return queryString;
  // },
  buildShortRecQueryString: (obj) => {
    const query = {
      seed_tracks: '11dFghVXANMlKmJXsNCbNl',
      limit: 50, //1<=100, 20
      //attributes to filter on
      //  acousticness = document.getElementById('minBPM').value; //0 to 1
      //  danceability = document.getElementById('minBPM').value; //0 to 1
      max_duration_ms: 1000 * 60 * 5, //nothing over five minutes
      //  energy = document.getElementById('minBPM').value; //0 to 1
      max_instrumentalness: '.35', //filter out tracks likely to be instrumental
      //  key = document.getElementById('minBPM').value; //0 to 1
      //  liveness = document.getElementById('minBPM').value; //0 to 1
      //  loudness = document.getElementById('minBPM').value; //0 to 1
      //  mode = document.getElementById('minBPM').value; //0 to 1
      min_popularity: 25,
      //  speechiness = document.getElementById('minBPM').value; //0 to 1
      max_tempo: obj.max_tempo * 4,
      min_tempo: obj.min_tempo * 4,
      //  time_signature = document.getElementById('minBPM').value; //0 to 1
      //  valence = document.getElementById('minBPM').value; //0 to 1
    };
    let queryString = '';
    Object.keys(query).forEach((x) => {
      queryString += x + '=' + query[x] + '&';
    });
    queryString = queryString.slice(0, queryString.length - 1);
    console.log('queryString', queryString);
    return queryString;
  },
};
