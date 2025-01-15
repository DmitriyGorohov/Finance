import { type FC } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../styles/Colors.ts';
import Header from '../../components/Header.tsx';

interface HomeScreenProps {}

const HomeScreen: FC<HomeScreenProps> = (): React.JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <Header onPress={() => null} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
  },
});
export default HomeScreen;
