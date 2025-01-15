import React, { type FC } from 'react';
import { StyleSheet } from 'react-native';
import Header from '../../components/Header.tsx';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ExpenseScreenProps {}

const ExpenseScreen: FC<ExpenseScreenProps> = (): React.JSX.Element => {
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
export default ExpenseScreen;
