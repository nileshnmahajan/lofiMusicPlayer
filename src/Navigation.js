import React, {useRef, Component} from 'react';

import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import PlayScreen from './scenes/PlayScreen';
import PlayListScren from './scenes/PlayList';

import SplashScreen from './scenes/SplashScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

import {theme} from './App';

const DrawerNavigator = () => {
  const offset = useSharedValue(0);

  return (
    <Drawer.Navigator
      // hideStatusBar
      drawerType="slide"
      overlayColor="transparent"
      drawerStyle={styles.drawerStyles}
      contentContainerStyle={{flex: 1}}
      drawerContentOptions={{
        activeBackgroundColor: 'transparent',
        activeTintColor: 'white',
        inactiveTintColor: 'white',
      }}
      sceneContainerStyle={{backgroundColor: 'transparent'}}
      drawerContent={props => {
        setProgress(props.progress);
        return <DrawerContent {...props} />;
      }}>
      <Drawer.Screen name="Screens">
        {props => <Screens {...props} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

const Navigation = () => {
  const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef();
  return (
    <NavigationContainer
      theme={theme}
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.getCurrentRoute().name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.getCurrentRoute().name;
        if (previousRouteName !== currentRouteName) {
          // The line below uses the expo-firebase-analytics tracker
          // https://docs.expo.io/versions/latest/sdk/firebase-analytics/
          // Change this line to use another Mobile analytics SDK
          console.log(
            'Screen changed: ' + previousRouteName + '->' + currentRouteName,
          );
          //fetch coin on screen chnage only when user is logged in
        }

        // Save the current route name for later comparison
        routeNameRef.current = currentRouteName;
      }}>
      <Stack.Navigator
        initialRouteName={'PlayListScreen'}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="PlayListScreen" component={PlayListScren} />
        <Stack.Screen name="playScreen" component={PlayScreen} />
        <Stack.Screen name="drawerNavigation" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
