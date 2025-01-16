import React, { type FC, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../components/Header.tsx';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../styles/Colors.ts';
import { KeyboardView } from '../../components/base/KeyboardView.tsx';
import ButtonCustom from '../../components/ButtonCustom.tsx';
import { navigateToBack } from '../../helpers/navigateHelper.ts';
import { categoriesE } from '../../utils/common.ts';
import {useActions} from '../../utils/hooks/useActions.ts';
import {profileActions} from '../../store/profile/profileSlice.ts';

interface ExpenseScreenProps {}

const ExpenseScreen: FC<ExpenseScreenProps> = (): React.JSX.Element => {
  const actions = useActions(profileActions);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [task, setTask] = useState('');
  const [sum, setSum] = useState('');



  const renderItem = ({ item }: { item: { id: string; title: string } }) => (
    <TouchableOpacity
      style={[
        styles.item,
        selectedCategory === item.title
          ? styles.selectedItem
          : styles.unselectedItem,
      ]}
      onPress={() => setSelectedCategory(item.title)}
    >
      <Text
        style={[
          styles.itemText,
          selectedCategory === item.title
            ? styles.selectedText
            : styles.unselectedText,
        ]}
      >
        {item.title}
      </Text>
      <View
        style={[
          styles.circle,
          selectedCategory === item.title
            ? styles.selectedCircle
            : styles.unselectedCircle,
        ]}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ButtonCustom
        style={{
          position: 'absolute',
          bottom: 20,
          alignSelf: 'center',
          zIndex: 999,
        }}
        disabled={!task || !sum || selectedCategory === null}
        onPress={() => {
          navigateToBack()
          actions.setHistory({
            id: Number(Math.random()) as number,
            total: sum,
            task: selectedCategory ?? '',
            status: false,
          });
        }}
        title="Go"
      />
      <KeyboardView isScroll>
        <Text
          style={{
            color: Colors.white,
            fontSize: 32,
            marginBottom: 20,
            textAlign: 'center',
          }}
        >
          Expense
        </Text>
        <View style={styles.form}>
          <Text
            style={{
              color: Colors.gray,
              fontSize: 16,
              paddingLeft: 20,
              marginBottom: 8,
            }}
          >
            Add task
          </Text>
          <TextInput
            placeholderTextColor={Colors.gray}
            placeholder="..."
            style={styles.input}
            value={task}
            onChangeText={setTask}
          />
        </View>
        <View style={styles.form}>
          <Text
            style={{
              color: Colors.gray,
              fontSize: 16,
              paddingLeft: 20,
              marginBottom: 8,
            }}
          >
            Income amount
          </Text>
          <TextInput
            placeholderTextColor={Colors.gray}
            placeholder="..."
            style={styles.input}
            value={sum}
            onChangeText={setSum}
          />
        </View>
        <View style={styles.form}>
          <Text
            style={{
              color: Colors.gray,
              fontSize: 16,
              paddingLeft: 20,
              marginBottom: 8,
            }}
          >
            Category
          </Text>
          <FlatList
            data={categoriesE}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </KeyboardView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  form: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    color: Colors.white,
    fontSize: 16,
    backgroundColor: Colors.backgroundLight,
    borderRadius: 30,
    paddingHorizontal: 26,
    paddingVertical: 18,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 10,
  },
  selectedItem: {
    backgroundColor: Colors.backgroundLight,
  },
  unselectedItem: {
    backgroundColor: Colors.backgroundLight,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '500',
  },
  selectedText: {
    color: Colors.white,
  },
  unselectedText: {
    color: Colors.white,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
  },
  selectedCircle: {
    borderColor: Colors.background,
    backgroundColor: Colors.background,
  },
  unselectedCircle: {
    borderColor: Colors.gray,
    backgroundColor: 'transparent',
  },
});
export default ExpenseScreen;
