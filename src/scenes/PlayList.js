import React, {Component} from 'react';

import {
  View,
  Image,
  TouchableOpacity,
  BackHandler,
  SafeAreaView,
  ImageBackground,
  StatusBar,
  FlatList,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Sound from 'react-native-sound';
import SplashScreen from './SplashScreen';
import MusicControl, {Command} from 'react-native-music-control';
import NetInfo from '@react-native-community/netinfo';

import moment from 'moment';
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

class PlayList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
    };
    this.timer = null;
    //jsonLog({timeOut, duration});
  }
  componentDidMount() {
    // MusicControl.enableBackgroundMode(true);
    // MusicControl.handleAudioInterruptions(true);
    StatusBar.setHidden(false);
    // Sound.setCategory('Playback', true); // true = mixWithOthers
    // this.resume();
    sendData(this, 'get', API.songs, {}, this.playlistFetch);
  }

  playlistFetch = (obj, data) => {
    obj.setState({songs: data});
  };

  componentWillUnmount() {
    //this.songrelease();
    // this.bg.release();
  }

  subscribe = NetInfo.addEventListener(
    function (state) {
      console.log('Connection type-', state.type);
      console.log('Is connected?', state.isConnected);
      this.props.setConnected(state.isConnected);
    }.bind(this),
  );

  noInternet = () => {};

  exitApp = () => {
    BackHandler.exitApp();
  };

  renderSong = (item, index) => {
    const {filename, title, cover, duration_, genere} = item;
    return (
      <TouchableOpacity
        style={{
          marginVertical: 5,
          marginHorizontal: 10,
          borderRadius: 5,
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#323232',
        }}
        onPress={() =>
          this.props.navigation.navigate('playScreen', {
            item,
            songs: this.state.songs,
            activeSongIndex: index,
          })
        }>
        <Image
          source={{uri: API.cover(cover)}}
          style={{width: 30, height: 30, borderRadius: 5}}
        />
        <View
          style={{
            padding: 10,
            flex: 1,
          }}>
          <Text color="white" h4 bold marq speed={0.2} marqueeOnStart loop>
            {title}
          </Text>
          <Text color="white">
            {' '}
            {moment.utc(duration_ * 1000).format('mm:ss')}
          </Text>
        </View>
        {/* <Image
          source={assets.love}
          style={{width: 15, height: 15, tintColor: 'white'}}
        /> */}
      </TouchableOpacity>
    );
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

        <FlatList
          data={this.state.songs}
          renderItem={({item, index}) => {
            return this.renderSong(item, index);
          }}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(PlayList);
