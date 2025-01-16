import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../styles/Colors.ts';
import { useSelector } from 'react-redux';
import { profileSelector } from '../../store/profile/profileSlice.ts';

const HistoryScreen = (): React.JSX.Element => {
  const { history } = useSelector(profileSelector);

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          color: Colors.white,
          fontSize: 32,
          marginBottom: 20,
          textAlign: 'center',
        }}
      >
        History
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {history && history.map((item) => {
          return (
            <View
              key={item.id}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: 12,
                backgroundColor: item.status ? Colors.green : Colors.red,
                paddingHorizontal: 16,
                paddingVertical: 20,
                marginBottom: 24,
              }}
            >
              <Text
                style={{ color: Colors.white, fontSize: 16, fontWeight: '500' }}
              >
                {item.task}
              </Text>
              <Text
                style={{ color: Colors.white, fontSize: 16, fontWeight: '500' }}
              >
                {item.total} $
              </Text>
            </View>
          );
        })}
      </ScrollView>
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
