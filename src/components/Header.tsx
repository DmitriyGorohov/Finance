import { type FC } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Colors from '../styles/Colors.ts'
import {IconComponent} from './icon/IconComponent.tsx';

interface HeaderProps {
  onPress: () => void
  color?: string;
}

const Header: FC<HeaderProps> = ({ onPress, color }): React.JSX.Element => {

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          left: 0,
          top: 5,
        }}
        activeOpacity={0.8}
        onPress={onPress}
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
      {/*<Text*/}
      {/*  style={{*/}
      {/*    fontSize: 22,*/}
      {/*    color: Colors.white,*/}
      {/*    textAlign: 'center',*/}
      {/*  }}*/}
      {/*>*/}
      {/*  {title}*/}
      {/*</Text>*/}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 32,
  },
})
export default Header
