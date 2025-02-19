import React, { type FC, Fragment, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../styles/Colors.ts';
import { useImagePicker } from '../../utils/hooks/useImagePiker.tsx';
import { useSelector } from 'react-redux';
import {
  profileActions,
  profileSelector,
} from '../../store/profile/profileSlice.ts';
import ButtonCustom from '../../components/ButtonCustom.tsx';
import { useActions } from '../../utils/hooks/useActions.ts';
import { Screen } from '../../components/base/Screen.tsx';
import {AutoImage} from '../../components/base/AutoImage.tsx';

interface AuthScreenProps {}

const AuthScreen: FC<AuthScreenProps> = (): React.JSX.Element => {
  const { setIsOnboarding, setSaveUser } = useActions(profileActions);
  const { isOnboarding, account } = useSelector(profileSelector);
  const [name, setName] = useState(account === null ? '' : account.userName);
  const [age, setAge] = useState(account === null ? '' : account.userAge);

  const { pickFromGallery, imageUri } = useImagePicker();

  const onSubmit = () => {
    setSaveUser({
      userName: name,
      userAge: age,
      userEmail: '',
      userAvatar: imageUri as string,
    });

    setAge('');
    setName('');
    setIsOnboarding(true);
  };

  return (
    <Screen
      statusBarStyle="light-content"
      preset="auto"
      backgroundColor={Colors.black}
      safeAreaEdges={['top', 'bottom']}
      contentContainerStyle={styles.container}
    >
      {/*<KeyboardView isScroll>*/}
      <View style={styles.image}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            if (!isOnboarding) {
              pickFromGallery();
            }
          }}
          style={{
            overflow: 'hidden',
            width: 200,
            height: 200,
            backgroundColor: Colors.backgroundLight,
            borderRadius: 200 / 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {imageUri !== null ? (
            <AutoImage
              resizeMode={'cover'}
              style={{ width: 200, height: 200 }}
              source={{ uri: `${imageUri}` }}
            />
          ) : (
            <AutoImage
              resizeMode={'cover'}
              style={{
                width: account === null ? 100 : 200,
                height: account === null ? 100 : 200,
              }}
              source={
                account === null
                  ? require('../../assets/img-finance/image-picker/gallery.png')
                  : { uri: `${account.userAvatar}` }
              }
            />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.form}>
        <Text style={{ color: Colors.gray, marginBottom: 8 }}>
          Enter your name
        </Text>
        <TextInput
          style={styles.input}
          editable={!isOnboarding}
          placeholderTextColor={Colors.gray}
          placeholder={'Enter the name...'}
          value={name}
          onChangeText={setName}
        />
        <Text style={{ color: Colors.gray, marginBottom: 8 }}>
          How old are you
        </Text>
        <TextInput
          editable={!isOnboarding}
          style={styles.input}
          placeholderTextColor={Colors.gray}
          placeholder={'Enter the text...'}
          keyboardType={'numeric'}
          value={age}
          onChangeText={setAge}
        />
      </View>
      <Fragment>
        {!isOnboarding && (
          <ButtonCustom
            style={{ position: 'absolute', bottom: 20, alignSelf: 'center' }}
            disabled={!name || !age || !imageUri}
            onPress={onSubmit}
            title={'Go!'}
          />
        )}
      </Fragment>
      {/*</KeyboardView>*/}
    </Screen>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: Colors.black,
  },
  image: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 34,
  },
  form: {
    width: '100%',
  },
  input: {
    paddingHorizontal: 25,
    borderRadius: 30,
    backgroundColor: Colors.backgroundLight,
    fontWeight: '600',
    color: Colors.white,
    fontSize: 16,
    height: 60,
    marginBottom: 40,
  },
});
export default AuthScreen;
