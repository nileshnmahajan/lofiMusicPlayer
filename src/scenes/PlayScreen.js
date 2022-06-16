import React, {Component} from 'react';
import TrackPlayer, {
  useProgress,
  Capability,
  Event,
} from 'react-native-track-player';
import moment from 'moment';
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
import PlayList from './PlayList';
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

import ActionSheet, {SheetManager} from 'react-native-actions-sheet';

class PlayScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songReady: false,
      bgReady: false,
      playing: true,
      totalTime: 60,
      activeTime: null,
      song: null,
      title: null,
      genere: null,
      duration_: 0,
      cover: null,
    };
    this.timer = null;
    //jsonLog({timeOut, duration});
  }
  componentDidMount() {
    // MusicControl.enableBackgroundMode(true);
    // MusicControl.handleAudioInterruptions(true);
    StatusBar.setHidden(true);
    // Sound.setCategory('Playback', true); // true = mixWithOthers
    // this.resume();
    const {
      filename: song,
      title,
      genere,
      duration_,
      cover,
    } = this.props.route.params.item;
    this.setState({title, song, genere, duration_, cover});
    this.initPlayer();
  }

  componentWillUnmount() {
    this.stop();
    //this.songrelease();
    // this.bg.release();
  }

  initPlayer = async () => {
    await TrackPlayer.setupPlayer();
    TrackPlayer.addEventListener(Event.RemotePause, () => this.pause());
    TrackPlayer.addEventListener(Event.RemotePlay, () => this.resume());

    // TrackPlayer.updateOptions({
    //   waitForBuffer: true,
    //   stopWithApp: true,
    //   // Media controls capabilities
    //   capabilities: [
    //     Capability.Play,
    //     Capability.Pause,
    //     Capability.SkipToNext,
    //     Capability.SkipToPrevious,
    //   ],
    //   likeOptions: [],

    //   // Capabilities that will show up when the notification is in the compact form on Android
    //   compactCapabilities: [
    //     Capability.Play,
    //     Capability.Pause,
    //     Capability.SkipToNext,
    //   ],

    //   // Icons for the notification on Android (if you don't like the default ones)
    //   // playIcon: require('./play-icon.png'),
    //   // pauseIcon: require('./pause-icon.png'),
    //   // stopIcon: require('./stop-icon.png'),
    //   // previousIcon: require('./previous-icon.png'),
    //   // nextIcon: require('./next-icon.png'),
    //   // icon: require('./notification-icon.png'),
    // });

    const {title, song, genere, duration_, cover} = this.state;

    await TrackPlayer.add({
      id: 'trackId',
      url: API.play(song),
      title: title,
      artist: genere,
      artwork: API.cover(cover),
      duration: duration_,
    });

    // Start playing it
    this.resume();
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
    TrackPlayer.pause();
  };

  stop = () => {
    this.pause();
    TrackPlayer.stop();
    //next song or something else
  };
  resume = async () => {
    await TrackPlayer.setRate(0.88);
    await TrackPlayer.play();
    clearInterval(this.timer);
    this.timer = setInterval(async () => {
      if (this.state.activeTime == this.state.totalTime) return this.stop();
      const d = await TrackPlayer.getPosition();
      this.setState({
        activeTime: d,
      });
    }, 1000);
    this.setState({playing: true});
  };

  seek = async position => {
    const {title, song, genere, duration_, cover} = this.state;
    if (position) {
      try {
      } catch (e) {
        alert(e);
      }
      this.setState({activeTime: position});
      TrackPlayer.seekTo(position);
    }
    // //this.songsetCurrentTime(parseInt(data));
  };
  render() {
    const {title, song, genere, duration_, cover} = this.state;
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
          style={{
            flex: 1,
            justifyContent: 'space-between',
            backgroundColor: 'rgba(0,0,0,0.85)',
          }}>
          {/* navigation */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 15,
              alignItems: 'center',
              marginVertical: 15,
            }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={{
                backgroundColor: 'rgba(0,0,0,0.05)',
                borderRadius: 15,
                padding: 5,
              }}>
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
            <TouchableOpacity
              style={{
                backgroundColor: 'rgba(0,0,0,0.05)',
                borderRadius: 25,
                padding: 6,
              }}
              onPress={() => SheetManager.show('helloworld_sheet')}>
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
          <Image
            source={{
              uri: API.cover(cover),
            }}
            style={{
              width: width - 30,
              height: width - 30,
              alignSelf: 'center',
              borderRadius: 10,
              resizeMode: 'cover',
            }}
          />

          {/* play controlls and info */}
          <View style={{padding: 15, backgroundColor: 'rgba(0,0,0,0.1)'}}>
            {/* song name and singer */}
            <View>
              <Text numberOfLines={1} h4 color="white" bold center>
                {title}
              </Text>
              <Text numberOfLines={1} color="gray" bold center>
                {genere}
              </Text>
            </View>
            {/* track line */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text color="white">
                {moment.utc(activeTime * 1000).format('mm:ss')}
              </Text>

              <Text color="white"> 
                {moment.utc(duration_ * 1000).format('mm:ss')}
              </Text>
            </View>
            <Slider
              style={{width: width - 30, height: 35}}
              minimumValue={0}
              disabled={false}
              maximumValue={parseInt(duration_)}
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
                  padding: 20,
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
          <ActionSheet id="helloworld_sheet">
            <View
              style={{
                width,
                height: height * 0.7,
                backgroundColor: 'black',
              }}></View>
          </ActionSheet>
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

const Main = props => {
  const progress = useProgress();
  return <PlayScreen {...props} progress={progress} />;
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayScreen);
