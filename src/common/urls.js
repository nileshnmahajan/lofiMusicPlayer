import constants from './Constants';
export default {
  songs: 'https://music.pressbuddy.in/api/musics',
  play: fn => `https://music.pressbuddy.in/api/music/play/${fn}`,
  cover: fn => `https://music.pressbuddy.in/api/music/cover/${fn}`,
  youtubeVodeoIcon: id => `https://img.youtube.com/vi/${id}/0.jpg`,
  videoData: id =>
    `https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=${id}&key=${constants.googleCloudApiKey}`,
  searchVideo: (q, maxResults) =>
    `https://www.googleapis.com/youtube/v3/search?q=${q}&maxResults=${maxResults}&key=${constants.googleCloudApiKey}`,
  playlistItems: playlistId =>
    `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${playlistId}&key=${constants.googleCloudApiKey}`,

  groups: 'https://ytcinemas.pressbuddy.in/api/group/index',
};
