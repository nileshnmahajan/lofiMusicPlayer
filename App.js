import React, {Component} from 'react';

import {View} from 'react-native';
import Sound from 'react-native-sound';

class MainView extends Component {
  constructor(props) {
    super(props);
    Sound.setCategory('Playback', true); // true = mixWithOthers
  }

  componentDidMount() {
    this.ding = new Sound(
      'https://cloud.pressbuddy.in/index.php/s/wmCZjLGLDNe42CE/download',
      null,
      error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        } //

        // Position the sound to the full right in a stereo field
        this.ding.setPan(1);
        this.ding.setCurrentTime(2.5);
        this.ding.setNumberOfLoops(-1);
        this.ding.setSpeed(0.88);
        this.ding.play(success => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
      },
    );

    this.bg = new Sound(
      'https://cloud.pressbuddy.in/index.php/s/Yj2otJWGgwLidjA/download',
      null,
      error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        this.bg.setVolume(0.5);
        this.bg.setSpeed(0.85);

        this.bg.play(success => {
          if (success) {
            console.log('successfully finished playing bg');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
      },
    );
  }

  componentWillUnmount() {
    this.ding.release();
    this.bg.release();
  }
  render() {
    return <View></View>;
  }
}

export default MainView;

// import React, {Component} from 'react';
// import {Text} from 'react-native';
// import Sound from 'react-native-sound';
// import MusicControl, {Command} from 'react-native-music-control';

// const resultIcons = {
//   '': '',
//   pending: '?',
//   playing: '\u25B6',
//   win: '\u2713',
//   fail: '\u274C',
// };
// const url =
//   'https://raw.githubusercontent.com/zmxv/react-native-sound-demo/master/advertising.mp3';
// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }
//   componentDidMount() {
//     //
//     MusicControl.enableBackgroundMode(true);
//     // MusicControl.handleAudioInterruptions(true);
//     MusicControl.on(Command.pause, () => {
//       MusicControl.updatePlayback({
//         state: MusicControl.STATE_PAUSED, // (STATE_ERROR, STATE_STOPPED, STATE_PLAYING, STATE_PAUSED, STATE_BUFFERING)
//       });
//     });
//     MusicControl.on(Command.play, () => {
//       MusicControl.updatePlayback({
//         state: MusicControl.STATE_PLAYING, // (STATE_ERROR, STATE_STOPPED, STATE_PLAYING, STATE_PAUSED, STATE_BUFFERING)
//       });
//     });
//     MusicControl.setNowPlaying({
//       title: 'Billie Jean',
//       artwork: 'https://i.imgur.com/e1cpwdo.png', // URL or RN's image require()
//       artist: 'Michael Jackson',
//       album: 'Thriller',
//       genre: 'Post-disco, Rhythm and Blues, Funk, Dance-pop',
//       duration: 294, // (Seconds)
//       description: '', // Android Only
//       color: 0xffffff, // Android Only - Notification Color
//       colorized: true, // Android 8+ Only - Notification Color extracted from the artwork. Set to false to use the color property instead
//       date: '1983-01-02T00:00:00Z', // Release Date (RFC 3339) - Android Only
//       rating: 84, // Android Only (Boolean or Number depending on the type)
//       // notificationIcon: 'my_custom_icon', // Android Only (String), Android Drawable resource name for a custom notification icon
//       isLiveStream: true, // iOS Only (Boolean), Show or hide Live Indicator instead of seekbar on lock screen for live streams. Default value is false.
//     });
//     MusicControl.enableControl('closeNotification', true, {when: 'paused'});
//     MusicControl.enableControl('play', true);
//     MusicControl.enableControl('pause', true);
//     MusicControl.enableControl('stop', true);
//     MusicControl.enableControl('nextTrack', true);
//     MusicControl.enableControl('previousTrack', true);

//     // Changing track position on lockscreen
//     MusicControl.enableControl('changePlaybackPosition', true);

//     // Seeking
//     MusicControl.enableControl('seekForward', false); // iOS only
//     MusicControl.enableControl('seekBackward', false); // iOS only
//     MusicControl.enableControl('seek', true); // Android only
//     // MusicControl.enableControl('skipForward', false);
//     // MusicControl.enableControl('skipBackward', false);
//     MusicControl.enableControl('skipBackward', true, {interval: 15});
//     MusicControl.enableControl('skipForward', true, {interval: 30});

//     // Android Specific Options
//     MusicControl.enableControl('setRating', false);
//     MusicControl.enableControl('volume', true); // Only affected when remoteVolume is enabled
//     MusicControl.enableControl('remoteVolume', false);

//     // iOS Specific Options
//     MusicControl.enableControl('enableLanguageOption', false);
//     MusicControl.enableControl('disableLanguageOption', false);

//     setTimeout(() => {
//       MusicControl.updatePlayback({
//         state: MusicControl.STATE_PLAYING, // (STATE_ERROR, STATE_STOPPED, STATE_PLAYING, STATE_PAUSED, STATE_BUFFERING)
//         speed: 1, // Playback Rate
//         elapsedTime: 103, // (Seconds)
//         bufferedTime: 200, // Android Only (Seconds)
//         volume: 10, // Android Only (Number from 0 to maxVolume) - Only used when remoteVolume is enabled
//         maxVolume: 10, // Android Only (Number) - Only used when remoteVolume is enabled
//         rating: MusicControl.RATING_PERCENTAGE, // Android Only (RATING_HEART, RATING_THUMBS_UP_DOWN, RATING_3_STARS, RATING_4_STARS, RATING_5_STARS, RATING_PERCENTAGE)
//       });
//     }, 2500);
//   }
//   render() {
//     return <Text>hello</Text>;
//   }
// }

// export default App;
