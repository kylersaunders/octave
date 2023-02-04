module.exports = {
  logIn: async () => {
    return await fetch('/login', { mode: 'no-cors' })
      .then((auth) => auth.json())
      .then((auth) => {
        console.log('auth', auth);
        return auth;
      });
  },
  getSearch: async (e) => {
    let params = new URLSearchParams('q=' + e.target.form[0].value).toString();

    return await fetch(`/api/search?q=${params}`)
      .then((data) => data.json())
      .then((data) => {
        // console.log('data', data);
        return data.tracks.items;
      });
  },
  getLocalSearch: async (term) => {
    let params = new URLSearchParams('q=' + term + '&limit=5').toString();

    return await fetch(`/api/search?q=${params}`)
      .then((data) => data.json())
      .then((data) => {
        console.log('data', data);
        return data.tracks.items;
      });
  },
  createPlaylist: async (name) => {
    let newPlaylistParams = {
      name: name,
      public: false,
      collaborative: false,
    };
    // console.log('new', JSON.stringify(newPlaylistParams));
    const newP = await fetch(`/api/createPlaylist`, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPlaylistParams),
    })
      .then((response) => response.json())
      .then((response) => {
        // console.log('data', response);
        return response;
      });
    return newP;
    // e.target.form[0].value = '';
  },
  getRecommendations: async (queryString) => {
    return await fetch(`/api/getRecommendations?${queryString}`)
      .then((data) => data.json())
      .then((data) => {
        return data.tracks;
      });
  },
  buildWorkout: async (queryString) => {
    return await fetch(`/api/buildWorkout?${queryString}`)
      .then((data) => data.json())
      .then((data) => {
        return data;
      });
  },
  getMyPlaylists: async (playlistOffset, limit) => {
    // const limit = document.getElementById('playlistLimit')?.value || 10;
    let lists = await fetch(
      `/api/getUsersPlaylists?offset=${playlistOffset}&limit=${limit}`
    )
      .then((data) => data.json())
      .then((data) => data.items);
    return lists.map((x) => {
      const tracks = x.tracks.total;
      const image_url = x.images[2]?.url;
      const public_vis = x.public;
      const id = x.id;
      const name = x.name;
      return { id, name, public_vis, image_url, tracks };
    });
  },
  getPlaylistTracks: async (e) => {
    const playlist_id = e.target.id;
    let listTracks = await fetch(`/api/getTracks?id=${playlist_id}`)
      .then((data) => data.json())
      .then((data) => {
        return data.items;
      });
    return listTracks.map((x) => {
      return x.track;
    });
  },
  addToPlaylist: async (tracksToAdd, playlistId) => {
    let newAdds = tracksToAdd.map((x) => `spotify:track:${x}`);
    return await fetch(`/api/addItemsToPlaylist?list=${playlistId}`, {
      method: 'post',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uris: newAdds }),
    })
      .then((response) => response.json())
      .then((response) => {
        // console.log('data', response);
        return response;
      });
  },
  deletePlaylist: async (id) => {
    fetch(`/api/deletePlaylist?list=${id}`, { method: 'delete' });
  },
};
