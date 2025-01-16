import React, { type FC, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useSelector } from 'react-redux';
import { profileSelector } from '../../store/profile/profileSlice.ts';
import Colors from '../../styles/Colors.ts';

interface EnabledScreenProps {}

const EnabledScreen: FC<EnabledScreenProps> = (): React.JSX.Element => {
  const { policyPath } = useSelector(profileSelector);
  const [isPolicy, setIsPolicy] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsPolicy(true);
    }, 2000);
  }, [isPolicy]);

  return (
    <View style={styles.container}>
      {isPolicy && (
        <Text style={{ fontSize: 28, fontWeight: '500', color: Colors.white }}>
          {policyPath}
        </Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    backgroundColor: Colors.black,
  },
});
export default EnabledScreen;
