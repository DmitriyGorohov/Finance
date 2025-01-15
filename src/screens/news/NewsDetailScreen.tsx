import React from 'react';
import { Image, ScrollView, StyleSheet, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Colors from '../../styles/Colors.ts';
import { NewsDetailRouteProps } from '../../types/stacksType/MainStackParams.ts';
import Header from '../../components/Header.tsx';

const NewsDetailScreen = (): React.JSX.Element => {
  const {
    params: { news },
  } = useRoute<NewsDetailRouteProps>();
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={news.image} style={styles.image} />
        <Text
          style={{
            color: Colors.pinkText,
            fontSize: 24,
            fontWeight: '700',
            textAlign: 'center',
            marginBottom: 20,
            paddingHorizontal: 30,
          }}
        >
          {news.title}
        </Text>
        <Text
          style={{
            color: Colors.white,
            fontSize: 22,
            fontWeight: '700',
            textAlign: 'center',
          }}
        >
          {news.description}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  image: {
    marginTop: 20,
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 16,
    marginBottom: 20,
  },
});
export default NewsDetailScreen;
