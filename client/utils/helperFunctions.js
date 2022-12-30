module.exports = {
  parseResults: (data) => {
    const output = [];
    if (data) {
      data.forEach((x) => {
        const { preview_url, id, name, popularity, artists, duration_ms } = x;
        const l = artists.length - 1;
        let artists_names = artists[0].name;
        if (l === 0) {
          //nothing
        } else if (l === 1) {
          artists_names += ' & 1 other';
        } else {
          artists_names += ' & ' + l + ' others';
        }
        output.push({
          preview_url,
          id,
          name,
          popularity,
          artists_names,
          duration_ms,
        });
      });
    }
    console.log('output', output);
    return output;
  },
  randomBuild: (tracks, obj) => {
    let ms = obj.target_duration_mins * 1000 * 60;
    let over = obj.target_time_over * 1000;
    const output = [];
    while (ms > over) {
      console.log('over', ms);
      const temp = Math.floor(Math.random() * tracks.length);
      output.push(tracks[temp]);
      ms -= tracks[temp].duration_ms;
      // while (ms < -over) {
      //   console.log('under');
      //   const del = output.pop();
      //   ms += del.duration_ms;
      // }
    }

    return output;
  },
  playIcon:
    'https://img.freepik.com/premium-vector/play-button-icon-symbol-transparent-background-video-audio-player-vector-illustration_350225-118.jpg?w=2000',
};
