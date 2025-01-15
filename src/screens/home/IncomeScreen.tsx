import React, { type FC } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header.tsx';

interface IncomeScreenProps {}

const IncomeScreen: FC<IncomeScreenProps> = (): React.JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
export default IncomeScreen;
