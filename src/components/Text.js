import * as React from 'react';
import {Text} from 'react-native';
import MarqueeText from 'react-native-marquee';
const MyText = ({
  h1,
  h2,
  h3,
  h4,
  h5,
  p,
  bold,
  medium,
  light,
  thin,
  italic,
  title,
  style,
  children,
  center,
  color,
  fontSize,
  u,
  marq,
  ...rest
}) => {
  const stl = [
    {fontFamily: 'JosefinSans-Regular', color: 'black'},
    h1 && {fontSize: 48},
    h2 && {fontSize: 32},
    h3 && {fontSize: 20},
    h4 && {fontSize: 18},
    h5 && {fontSize: 16},
    p && {fontSize: 12},
    u && {textDecorationLine: 'underline'},
    fontSize && {fontSize},
    color && {color},
    center && {textAlign: 'center'},
    bold && {fontFamily: 'JosefinSans-Bold'},
    medium && {fontFamily: 'JosefinSans-Medium'},
    light && {fontFamily: 'JosefinSans-Light'},
    thin && {fontFamily: 'JosefinSans-Thin'},
    italic && {fontStyle: 'italic'},
    style,
  ];

  if (marq)
    return (
      <MarqueeText style={stl} {...rest}>
        {children}
      </MarqueeText>
    );
  return (
    <Text style={stl} {...rest}>
      {children}
    </Text>
  );
};

export default MyText;
