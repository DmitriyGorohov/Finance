import React, { FC } from 'react';
import { View, ImageStyle, Image } from 'react-native';
import { IconProps } from './iconsProps.ts';
import { iconsList } from './icons/index.ts';

const ROOT: ImageStyle = {
  resizeMode: 'contain',
};

export const IconComponent: FC<IconProps> = ({
  style: styleOverride,
  icon,
  containerStyle,
}) => (
  <View style={containerStyle}>
    <Image style={[ROOT, styleOverride]} source={iconsList[icon]} />
  </View>
);
