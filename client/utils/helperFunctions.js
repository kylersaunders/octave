module.exports = {
  parseResults: (data) => {
    const output = [];
    if (data) {
      data.forEach((x) => {
        const { preview_url, id, name, popularity, artists, duration_ms } = x;
        let artists_names = [];
        artists.forEach((y) => {
          const { name } = y;
          artists_names.push(name);
        });
        (artists_names = artists_names.join(', ')),
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
    // console.log('output', output);
    return output;
  },
  playIcon:
    'https://img.freepik.com/premium-vector/play-button-icon-symbol-transparent-background-video-audio-player-vector-illustration_350225-118.jpg?w=2000',
};
