import { type FC } from 'react';
import { StyleSheet, Text } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Colors from '../../styles/Colors.ts';

interface HomeScreenProps {}

const HistoryScreen:FC<HomeScreenProps> = (): React.JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>HISTORY</Text>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: Colors.black,
  },
});
export default HistoryScreen;
