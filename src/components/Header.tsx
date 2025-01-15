import { type FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../styles/Colors.ts';
import { IconComponent } from './icon/IconComponent.tsx';
import {navigateToBack} from '../helpers/navigateHelper.ts';

interface HeaderProps {
  color?: string;
}

const Header: FC<HeaderProps> = ({ color }): React.JSX.Element => (
  <View style={styles.container}>
    <TouchableOpacity
      style={{
        position: 'absolute',
        left: 0,
        top: 5,
      }}
      activeOpacity={0.8}
      onPress={navigateToBack}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <IconComponent icon={'back'} />
        <Text
          style={{
            marginLeft: 10,
            fontSize: 16,
            fontWeight: '700',
            color: color ?? Colors.white,
          }}
        >
          Back
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 32,
  },
});
export default Header;
