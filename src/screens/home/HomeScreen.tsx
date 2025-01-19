import React from 'react';
import {
  FlatList,
  Image,
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
import { IconComponent } from '../../components/icon/IconComponent.tsx';
import Navigation from '../../navigation/navigation.ts';
import Tabs from '../../navigation/consts/tabs.ts';

const HomeScreen = (): React.JSX.Element => {
  const { account, summary, articles } = useSelector(profileSelector);

  const NewsCard = ({
    title,
    image,
    id,
    description,
  }: {
    id: number;
    title: string;
    description: string;
    image: string;
  }) => {
    return (
      <View style={styles.card}>
        <Image source={{ uri: `${image}` }} style={styles.image} />
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
        <TouchableOpacity
          onPress={() => {
            Navigation.replace(Tabs.HISTORY);
          }}
          activeOpacity={0.8}
          style={styles.button}
        >
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
          padding: 16,
          backgroundColor: Colors.background,
          width: '100%',
          height: 200,
          marginBottom: 20,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View>
            <Text style={{ color: Colors.gray, fontSize: 10 }}>Balance</Text>
            <Text
              style={{ color: Colors.white, fontSize: 18, marginBottom: 6 }}
            >
              {summary.statusTrue - summary.statusFalse} USD
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ marginRight: 16 }}>
              <Text style={{ color: Colors.white, textAlign: 'center', fontSize: 10 }}>Income</Text>
              <Text
                style={{
                  padding: 6,
                  color: Colors.white,
                  fontSize: 12,
                  marginBottom: 6,
                  backgroundColor: Colors.green,
                  borderRadius: 30,
                }}
              >
                {`${summary.statusTrue === undefined ? 0 : summary.statusTrue}`} USD
              </Text>
            </View>
            <View>
              <Text style={{ color: Colors.white, textAlign: 'center', fontSize: 10 }}>Expense</Text>
              <Text
                style={{
                  padding: 6,
                  color: Colors.white,
                  fontSize: 12,
                  marginBottom: 6,
                  backgroundColor: Colors.red,
                  borderRadius: 30,
                }}
              >
                {`${summary.statusFalse === undefined ? 0 : summary.statusFalse}`} USD
              </Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
          <IconComponent icon={'grafic'} />
        </View>
      </View>
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
      <View style={{ marginTop: 30, flex: 1 }}>
        <Text style={styles.newsTitle}>News</Text>
        <FlatList
          data={articles}
          renderItem={({ item }) => (
            <NewsCard
              description={item.content}
              id={item.id}
              title={item.title}
              image={item.img}
            />
          )}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
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
