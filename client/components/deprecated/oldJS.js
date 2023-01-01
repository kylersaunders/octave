//switchboard based on click
// const handleClick = async (e) => {
//   e.preventDefault();
//   switch (e.target.name) {
//     case 'login':
//       fetch('/login');
//     // let login = await logIn();
//     // setLoggedIn(() => {
//     //   return login;
//     // });
//     case 'getSearchSubmit':
//       let sResults = await getSearch(e);
//       // console.log('sResults', sResults);
//       sResults = parseResults(sResults);
//       updateSearchResults(() => {
//         return sResults;
//       });
//       return;
//     case 'createPlaylist':
//       createPlaylist(e);
//       return;
//     case 'getRecommendations':
//       const queryString = buildRecQueryString(e);
//       let recs = await getRecommendations(queryString);
//       recs = parseResults(recs);
//       updateRecommendations(() => {
//         return recs;
//       });
//       return;
//     case 'getMyPlaylists':
//       console.log('getting');
//       let lists = await getMyPlaylists(playlistOffset);
//       updatePlaylists(() => {
//         return lists;
//       });
//       incrementPlaylistOffset((prev) => {
//         return prev + 1;
//       });
//       return;
//     case 'getPlaylistTracks':
//       let listTracks = await getPlaylistTracks(e);
//       listTracks = parseResults(listTracks);
//       updatePTracks(() => {
//         return listTracks;
//       });
//       return;
//     case 'addToPlaylist':
//       addToPlaylist(tracksToAdd);
//       return;
//     default:
//       console.log('Nothing scheduled for this click', e.target.name);
//       return;
//   }
// };
