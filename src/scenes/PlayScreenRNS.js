import React, {Component} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  BackHandler,
  SafeAreaView,
  ImageBackground,
  StatusBar,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Sound from 'react-native-sound';
import SplashScreen from './SplashScreen';
import MusicControl, {Command} from 'react-native-music-control';
import NetInfo from '@react-native-community/netinfo';

import {
  height,
  width,
  colors,
  strings,
  assets,
  connect,
  mapStateToProps,
  mapDispatchToProps,
  log,
  okDialog,
  RenderOkDialog,
  API,
  loading,
  RenderLoader,
  constants,
  sendData,
  device_type,
  RenderStatusBar,
  RenderYesNoDialog,
  navigation,
  jsonLog,
  Text,
} from '../App';

class PlayScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songReady: false,
      bgReady: false,
      playing: true,
      totalTime: null,
      activeTime: null,
      rainBg:
        'https://slowmusicplayertracks.s3.us-west-1.amazonaws.com/5_Minutes_of_Rain_and_Thunderstorm_%28getmp3.pro%29.mp3?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC0aCmFwLXNvdXRoLTEiRzBFAiEAgPuGFWErOU5NIHL5B%2FZrD%2BSz586%2FIxHqENP7oDbX%2FLACIHbzKAC8rb3LxdNBMYtdPfPdshOb1uiXk6NMMdoPqtR2KuQCCDYQABoMNjY4NjM4Mzc4NzIwIgzeUxyD%2FLX36msIS1IqwQKrjPHicH%2FsAlJbPR%2B5czCk26DuGR5yahWExjeJm72rFmz8ArfCALr8jOuo8Fuedmtp4UhHhUyA6PkXAwOu1N4m%2BZSgHiit6PdyZw%2BzhQVEgCa%2ByJYJ%2B2YgP1jLMrDpjXgfTp9%2BroyaEIjL80%2B5ZmcZQDQ%2B7RsdgJY57wVYw8doaoKwjDTonLtlZCPHMrjgsTnD8EhFSa6fdL2rRtJ8se3eLyvTktc%2F4ru3oUp8J4JdnegPC8sU4RGS4G0nB464%2BxvdC%2BNoxsLrR2YZCHwU7wBy%2FVrOmUY5W5ZUiSvd9iUP%2BdCqzjRQtLOZoQe1A%2BcEXbsTqp8O9RsXCzUtNGmzUfnA2qd%2F95vPH7B7c803KXWpMeUtcPamBKjBpgLKTBnleBfcAQ%2FIUNMAgGWdRHDlTLp%2Bn2l6Hing9IAKHodmwqhofBgwu9SOlQY6swJlELaaU1N2AcsOQnabQWYcxYF3EGEtDNdaXkBAQK3bPYjaMcqUIOthW3JgRwlRUtORGuE64bKkZstsv62IvOUlP7C%2FfyOkvIJxD58NGBDKc22tS1gcRVrROWRN%2FgX0PKO298YcmDQQ2OaL29pfPtZ%2FJIPCxq9llhSpCl3lSRdu58yC9hV7x3IcQeG%2FTNQC20N8FHDtvQpVdtYv38DxYfYHcTfue1ugMa3zXSAiSUjkJYrNX7Tt3pYZqCyBX%2BzN8gMWqSdWtFx3Oj9GAqupBfWrNJOcKKfbujCPzBZrE3Av8UCSitXgiWjXBNYjO5c8Sl7udENtU8%2Br4X2PmEZrM6Goy8%2FzZb969K5nEcx5N0HIAn79vpfX9hnWitrekEZxAcq5BsuJsBHyX1nuU0U51jAuzu2R&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220610T203620Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43199&X-Amz-Credential=ASIAZXLPT7LQMOZ6DHBK%2F20220610%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Signature=ab63fec083f9df44cae23533ef54964952b5d46dbc449fc5623bcaab3bb45fa8',
      song: 'https://slowmusicplayertracks.s3.us-west-1.amazonaws.com/Best_Heart_Touching_Ringtone_Foreve_%28getmp3.pro%29.mp3?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC0aCmFwLXNvdXRoLTEiRzBFAiEAgPuGFWErOU5NIHL5B%2FZrD%2BSz586%2FIxHqENP7oDbX%2FLACIHbzKAC8rb3LxdNBMYtdPfPdshOb1uiXk6NMMdoPqtR2KuQCCDYQABoMNjY4NjM4Mzc4NzIwIgzeUxyD%2FLX36msIS1IqwQKrjPHicH%2FsAlJbPR%2B5czCk26DuGR5yahWExjeJm72rFmz8ArfCALr8jOuo8Fuedmtp4UhHhUyA6PkXAwOu1N4m%2BZSgHiit6PdyZw%2BzhQVEgCa%2ByJYJ%2B2YgP1jLMrDpjXgfTp9%2BroyaEIjL80%2B5ZmcZQDQ%2B7RsdgJY57wVYw8doaoKwjDTonLtlZCPHMrjgsTnD8EhFSa6fdL2rRtJ8se3eLyvTktc%2F4ru3oUp8J4JdnegPC8sU4RGS4G0nB464%2BxvdC%2BNoxsLrR2YZCHwU7wBy%2FVrOmUY5W5ZUiSvd9iUP%2BdCqzjRQtLOZoQe1A%2BcEXbsTqp8O9RsXCzUtNGmzUfnA2qd%2F95vPH7B7c803KXWpMeUtcPamBKjBpgLKTBnleBfcAQ%2FIUNMAgGWdRHDlTLp%2Bn2l6Hing9IAKHodmwqhofBgwu9SOlQY6swJlELaaU1N2AcsOQnabQWYcxYF3EGEtDNdaXkBAQK3bPYjaMcqUIOthW3JgRwlRUtORGuE64bKkZstsv62IvOUlP7C%2FfyOkvIJxD58NGBDKc22tS1gcRVrROWRN%2FgX0PKO298YcmDQQ2OaL29pfPtZ%2FJIPCxq9llhSpCl3lSRdu58yC9hV7x3IcQeG%2FTNQC20N8FHDtvQpVdtYv38DxYfYHcTfue1ugMa3zXSAiSUjkJYrNX7Tt3pYZqCyBX%2BzN8gMWqSdWtFx3Oj9GAqupBfWrNJOcKKfbujCPzBZrE3Av8UCSitXgiWjXBNYjO5c8Sl7udENtU8%2Br4X2PmEZrM6Goy8%2FzZb969K5nEcx5N0HIAn79vpfX9hnWitrekEZxAcq5BsuJsBHyX1nuU0U51jAuzu2R&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220610T203359Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIAZXLPT7LQMOZ6DHBK%2F20220610%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Signature=d78f926ed45abe89baf826ae17a87bd333e15c95c2c9bb8959645cacce251810',
      song2:
        'https://slowmusicplayertracks.s3.us-west-1.amazonaws.com/Tum_Mile_Dil_Khile_Ringtone_Raj_%28getmp3.pro%29.mp3?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC0aCmFwLXNvdXRoLTEiRzBFAiEAgPuGFWErOU5NIHL5B%2FZrD%2BSz586%2FIxHqENP7oDbX%2FLACIHbzKAC8rb3LxdNBMYtdPfPdshOb1uiXk6NMMdoPqtR2KuQCCDYQABoMNjY4NjM4Mzc4NzIwIgzeUxyD%2FLX36msIS1IqwQKrjPHicH%2FsAlJbPR%2B5czCk26DuGR5yahWExjeJm72rFmz8ArfCALr8jOuo8Fuedmtp4UhHhUyA6PkXAwOu1N4m%2BZSgHiit6PdyZw%2BzhQVEgCa%2ByJYJ%2B2YgP1jLMrDpjXgfTp9%2BroyaEIjL80%2B5ZmcZQDQ%2B7RsdgJY57wVYw8doaoKwjDTonLtlZCPHMrjgsTnD8EhFSa6fdL2rRtJ8se3eLyvTktc%2F4ru3oUp8J4JdnegPC8sU4RGS4G0nB464%2BxvdC%2BNoxsLrR2YZCHwU7wBy%2FVrOmUY5W5ZUiSvd9iUP%2BdCqzjRQtLOZoQe1A%2BcEXbsTqp8O9RsXCzUtNGmzUfnA2qd%2F95vPH7B7c803KXWpMeUtcPamBKjBpgLKTBnleBfcAQ%2FIUNMAgGWdRHDlTLp%2Bn2l6Hing9IAKHodmwqhofBgwu9SOlQY6swJlELaaU1N2AcsOQnabQWYcxYF3EGEtDNdaXkBAQK3bPYjaMcqUIOthW3JgRwlRUtORGuE64bKkZstsv62IvOUlP7C%2FfyOkvIJxD58NGBDKc22tS1gcRVrROWRN%2FgX0PKO298YcmDQQ2OaL29pfPtZ%2FJIPCxq9llhSpCl3lSRdu58yC9hV7x3IcQeG%2FTNQC20N8FHDtvQpVdtYv38DxYfYHcTfue1ugMa3zXSAiSUjkJYrNX7Tt3pYZqCyBX%2BzN8gMWqSdWtFx3Oj9GAqupBfWrNJOcKKfbujCPzBZrE3Av8UCSitXgiWjXBNYjO5c8Sl7udENtU8%2Br4X2PmEZrM6Goy8%2FzZb969K5nEcx5N0HIAn79vpfX9hnWitrekEZxAcq5BsuJsBHyX1nuU0U51jAuzu2R&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220610T203500Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIAZXLPT7LQMOZ6DHBK%2F20220610%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Signature=9e61890b15b4e21beeeea83b20b329c0aef8a01ee67d8853b3d369f5155f7e1e',
    };
    this.timer = null;
    //jsonLog({timeOut, duration});
  }
  componentDidMount() {
    MusicControl.enableBackgroundMode(true);
    // MusicControl.handleAudioInterruptions(true);
    StatusBar.setHidden(true);
    Sound.setCategory('Playback', true); // true = mixWithOthers
    // this.resume();
    this.initPlayer();
  }

  componentWillUnmount() {
    this.song.release();
    // this.bg.release();
  }

  initPlayer = async () => {
    MusicControl.on(Command.pause, () => {
      this.pause();
      MusicControl.updatePlayback({
        state: MusicControl.STATE_PAUSED, // (STATE_ERROR, STATE_STOPPED, STATE_PLAYING, STATE_PAUSED, STATE_BUFFERING)
      });
    });
    MusicControl.on(Command.play, () => {
      this.resume();
      MusicControl.updatePlayback({
        state: MusicControl.STATE_PLAYING, // (STATE_ERROR, STATE_STOPPED, STATE_PLAYING, STATE_PAUSED, STATE_BUFFERING)
      });
    });

    MusicControl.enableControl('closeNotification', true, {when: 'paused'});
    MusicControl.enableControl('play', true);
    MusicControl.enableControl('pause', true);
    MusicControl.enableControl('stop', true);
    MusicControl.enableControl('nextTrack', true);
    MusicControl.enableControl('previousTrack', true);
    // Changing track position on lockscreen
    MusicControl.enableControl('changePlaybackPosition', true);

    // Seeking
    MusicControl.enableControl('seekForward', false); // iOS only
    MusicControl.enableControl('seekBackward', false); // iOS only
    MusicControl.enableControl('seek', true); // Android only
    // MusicControl.enableControl('skipForward', false);
    // MusicControl.enableControl('skipBackward', false);
    MusicControl.enableControl('skipBackward', true, {interval: 15});
    MusicControl.enableControl('skipForward', true, {interval: 30});

    // Android Specific Options
    MusicControl.enableControl('setRating', false);
    MusicControl.enableControl('volume', true); // Only affected when remoteVolume is enabled
    MusicControl.enableControl('remoteVolume', false);

    const {rainBg, song} = this.state;
    this.song = new Sound(song, null, error => {
      if (error) {
        alert('failed to load the sound', error);
        return;
      } //

      this.song.setPan(1);
      // this.song.setNumberOfLoops(-1);
      this.song.setSpeed(0.88);
      this.setState({songReady: true, totalTime: this.song.getDuration()}, () =>
        this.resume(),
      );
    });
    // this.bg = new Sound(rainBg, null, error => {
    //   if (error) {
    //     alert('failed to load the sound', error);
    //     return;
    //   }

    //   this.bg.setVolume(0.5);
    //   this.bg.setSpeed(0.85);
    //   this.setState({bgReady: true}, () => this.resume());
    // });
  };

  subscribe = NetInfo.addEventListener(
    function (state) {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      // this.props.setConnected(state.isConnected);
    }.bind(this),
  );

  noInternet = () => {};

  exitApp = () => {
    BackHandler.exitApp();
  };

  playPause = () => {
    this.state.playing ? this.pause() : this.resume();
  };

  pause = () => {
    this.setState({playing: false});
    clearInterval(this.timer);
    MusicControl.updatePlayback({
      elapsedTime: this.state.activeTime, // (Seconds)
      state: MusicControl.STATE_PAUSED, // (STATE_ERROR, STATE_STOPPED, STATE_PLAYING, STATE_PAUSED, STATE_BUFFERING)
    });
    this.song.pause();
  };
  stop = () => {
    this.pause();
    MusicControl.updatePlayback({
      elapsedTime: this.state.totalTime - this.state.activeTime, // (Seconds)
      state: MusicControl.STATE_STOPPED, // (STATE_ERROR, STATE_STOPPED, STATE_PLAYING, STATE_PAUSED, STATE_BUFFERING)
      //
      // bufferedTime: 200, // Android Only (Seconds)
    });
    //next song or something else
  };
  resume = () => {
    const {songReady, bgReady} = this.state;
    // alert(JSON.stringify({songReady, bgReady}));
    if (songReady == false /*|| bgReady == false*/) return;

    MusicControl.setNowPlaying({
      title: 'Billie Jean',
      artwork: 'https://i.imgur.com/e1cpwdo.png', // URL or RN's image require()
      artist: 'Michael Jackson',
      album: 'Thriller',
      genre: 'Post-disco, Rhythm and Blues, Funk, Dance-pop',
      duration: this.state.totalTime, // (Seconds)
      elapsedTime: this.state.activeTime,
      description: '', // Android Only
      color: 0xffffff, // Android Only - Notification Color
      colorized: true, // Android 8+ Only - Notification Color extracted from the artwork. Set to false to use the color property instead
      date: '1983-01-02T00:00:00Z', // Release Date (RFC 3339) - Android Only
      rating: 84, // Android Only (Boolean or Number depending on the type)
      // notificationIcon: 'my_custom_icon', // Android Only (String), Android Drawable resource name for a custom notification icon
      isLiveStream: true, // iOS Only (Boolean), Show or hide Live Indicator instead of seekbar on lock screen for live streams. Default value is false.
    });

    clearInterval(this.timer);
    this.timer = setInterval(() => {
      if (this.state.activeTime == this.state.totalTime) return this.stop();

      MusicControl.updatePlayback({
        state: MusicControl.STATE_PLAYING,
        elapsedTime: this.state.activeTime,
      });
      this.setState({
        activeTime: this.state.activeTime + 1,
      });
    }, 1000);
    this.setState({playing: true});

    this.song.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });

    // this.bg.play(success => {
    //   if (success) {
    //     console.log('successfully finished playing bg');
    //   } else {
    //     console.log('playback failed due to audio decoding errors');
    //   }
    // });
  };
  seek = data => {
    this.setState({activeTime: parseInt(data)});
    this.song.setCurrentTime(parseInt(data));
  };
  render() {
    const {playing, activeTime, totalTime, progress} = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        <RenderOkDialog
          action={
            this.state.connectivityAvailable
              ? false
              : () => BackHandler.exitApp()
          }
        />
        <RenderLoader />
        <RenderYesNoDialog />

        <ImageBackground
          source={{
            uri: 'https://images.pexels.com/photos/11482693/pexels-photo-11482693.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
          }}
          style={{flex: 1, justifyContent: 'space-between'}}>
          {/* navigation */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 15,
              alignItems: 'center',
              marginVertical: 15,
            }}>
            <TouchableOpacity>
              <Image
                source={assets.back}
                style={{
                  width: 25,
                  height: 25,
                  resizeMode: 'center',
                  tintColor: 'white',
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={assets.more}
                style={{
                  width: 25,
                  height: 25,
                  resizeMode: 'center',
                  tintColor: 'white',
                }}
              />
            </TouchableOpacity>
          </View>
          {/* play controlls and info */}
          <View style={{padding: 15, backgroundColor: 'rgba(0,0,0,0.1)'}}>
            {/* song name and singer */}
            <View>
              <Text numberOfLines={1} h4 color="white" bold center>
                Mad Love
              </Text>
              <Text numberOfLines={1} color="gray" bold center>
                Mabel
              </Text>
            </View>
            {/* track line */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text color="white">{activeTime}</Text>
              <Text color="white">{totalTime}</Text>
            </View>
            <Slider
              style={{width: width - 30, height: 35}}
              minimumValue={0}
              disabled={totalTime == null}
              maximumValue={totalTime ? totalTime : 100}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              onSlidingStart={() => this.pause()}
              onSlidingComplete={() => this.resume()}
              onValueChange={data => this.seek(data)}
              value={activeTime}
            />
            {/* play pause next prev controls */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>
              {/* repeat./ */}
              <TouchableOpacity>
                <Image
                  source={assets.repeat}
                  style={{
                    width: 15,
                    height: 15,
                    resizeMode: 'center',
                    tintColor: 'white',
                  }}
                />
              </TouchableOpacity>

              {/* previous */}
              <TouchableOpacity>
                <Image
                  source={assets.previous}
                  style={{
                    width: 15,
                    height: 15,
                    resizeMode: 'center',
                    tintColor: 'white',
                  }}
                />
              </TouchableOpacity>
              {/* play pause */}
              <TouchableOpacity
                style={{
                  padding: 10,
                  borderRadius: 25,
                  backgroundColor: 'green',
                }}
                onPress={() => this.playPause()}>
                <Image
                  source={playing ? assets.pause : assets.play}
                  style={{
                    width: 15,
                    height: 15,
                    resizeMode: 'center',
                    tintColor: 'white',
                  }}
                />
              </TouchableOpacity>

              {/* next */}
              <TouchableOpacity>
                <Image
                  source={assets.next}
                  style={{
                    width: 15,
                    height: 15,
                    resizeMode: 'center',
                    tintColor: 'white',
                  }}
                />
              </TouchableOpacity>
              {/* like */}
              <TouchableOpacity>
                <Image
                  source={assets.like}
                  style={{
                    width: 15,
                    height: 15,
                    resizeMode: 'center',
                    tintColor: 'white',
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = {
  inputGroup: {
    marginVertical: 5,
  },
};

//export default LoginScreen;

export default connect(mapStateToProps, mapDispatchToProps)(PlayScreen);
