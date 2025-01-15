import React from 'react';
import {
  FlatList,
  Image,
  ImageRequireSource,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';

import { profileSelector } from '../../store/profile/profileSlice.ts';

import Colors from '../../styles/Colors.ts';
import { navigateToScreen } from '../../helpers/navigateHelper.ts';
import Screens from '../../navigation/consts/screens.ts';
import { newsData } from '../../utils/common.ts';
import { IconComponent } from '../../components/icon/IconComponent.tsx';

const HomeScreen = (): React.JSX.Element => {
  const { account } = useSelector(profileSelector);

  const NewsCard = ({
    title,
    image,
    id,
    description,
  }: {
    id: string;
    title: string;
    description: string;
    image: ImageRequireSource;
  }) => {
    return (
      <View style={styles.card}>
        <Image source={image} style={styles.image} />
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity
          onPress={() =>
            navigateToScreen(Screens.NEWS, {
              news: { id, title, image, description },
            })
          }
          style={styles.buttonNews}
        >
          <IconComponent icon={'arrowGo'} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text
          numberOfLines={1}
          style={{
            color: Colors.white,
            fontSize: 24,
            fontWeight: '600',
            width: '50%',
          }}
        >{`Hello ${account?.userName}!`}</Text>
        <TouchableOpacity activeOpacity={0.8} style={styles.button}>
          <Text
            style={{ color: Colors.white, fontSize: 18, fontWeight: '800' }}
          >
            History
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          paddingHorizontal: 16,
          borderRadius: 12,
          backgroundColor: Colors.background,
          width: '100%',
          height: 200,
          marginBottom: 20,
        }}
      />
      <View style={styles.wrapper}>
        <TouchableOpacity
          onPress={() => navigateToScreen(Screens.INCOME)}
          activeOpacity={0.8}
          style={[styles.tab, { marginRight: 12 }]}
        >
          <Text
            style={{ color: Colors.white, fontSize: 18, fontWeight: '800' }}
          >
            Income
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigateToScreen(Screens.EXPAND)}
          activeOpacity={0.8}
          style={styles.tab}
        >
          <Text
            style={{ color: Colors.white, fontSize: 18, fontWeight: '800' }}
          >
            Expense
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 30, paddingHorizontal: 16, flex: 1 }}>
        <Text style={styles.newsTitle}>News</Text>
        <FlatList
          data={newsData}
          renderItem={({ item }) => (
            <NewsCard
              description={item.description}
              id={item.id}
              title={item.title}
              image={item.image}
            />
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: Colors.black,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  newsTitle: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 15,
  },
  button: {
    paddingVertical: 8,
    borderRadius: 30,
    backgroundColor: Colors.background,
    paddingHorizontal: 40,
  },
  tab: {
    paddingVertical: 3,
    borderRadius: 30,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 130,
    resizeMode: 'cover',
    borderRadius: 16,
  },
  title: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 60,
    fontSize: 18,
    color: Colors.black,
    fontWeight: 'bold',
  },
  buttonNews: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export default HomeScreen;
