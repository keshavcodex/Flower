import { useState, useEffect, useCallback } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  ScrollView,
  RefreshControl,
  Pressable,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Love = () => {
  const imageUrl = `https://source.unsplash.com/random?`;
  const [toggleInput, setToggleInput] = useState(false);
  const [toggleTextHead, setToggleTextHead] = useState(true);
  const [toggleName, setToggleName] = useState(true);
  const [imageName, setImageName] = useState('rose');
  const [imageData, setImageData] = useState(imageUrl + imageName);
  const [refreshing, setRefreshing] = useState(false);

  const fetchImage = async (url: string) => {
    if (url.length - imageUrl.length > 2) {
      const response = await axios.get(url);
      setImageData(response.request.responseURL);
    }
  };
  useEffect(() => {
    try {
      async () => {
        const textInput = await AsyncStorage.getItem('imageName');
        console.log('textInput', textInput);
        if (textInput) setImageName(textInput);
      };
    } catch (error) {}
  }, []);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await AsyncStorage.setItem('imageName', imageName);
      fetchImage(imageUrl + imageName);
      setRefreshing(false);
    } catch (error) {
      setRefreshing(false);
      console.log(error);
    }
  };
  
  // setTimeout(() => {
  //   fetchImage(imageUrl + imageName);
  // }, 8000);

  useEffect(() => {
    fetchImage(imageUrl + imageName);
  }, []);

  const handleTextInput = (text: string) => {
    text = text.trim();
    setImageName(text);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#ed4e73',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingHorizontal: 70,
        }}>
        <Pressable onPress={() => setToggleTextHead(!toggleTextHead)}>
          <Text
            style={{
              color: '#fff',
              fontSize: 40,
              fontWeight: '600',
              textAlign: 'center',
            }}>
            {toggleTextHead ? 'I Love You' : 'Hello Cutie'}
          </Text>
        </Pressable>
        <Pressable onPress={() => setToggleInput(!toggleInput)}>
          <Entypo name={'flower'} size={30} color={'#fff'} />
        </Pressable>
      </View>
      {toggleInput && (
        <TextInput
          value={imageName}
          textColor={'#000'}
          placeholder="Write notes..."
          mode="outlined"
          underlineColor={'red'}
          outlineColor={'red'}
          selectionColor={'red'}
          activeOutlineColor={'red'}
          activeUnderlineColor={'red'}
          cursorColor={'#000'}
          onChangeText={handleTextInput}
          onBlur={() => setToggleInput(false)}
          style={{
            fontSize: 19,
            minHeight: 20,
            maxHeight: 500,
            marginTop: 10,
            paddingVertical: 10,
          }}
        />
      )}
      <View style={{ marginTop: 40 }}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={styles.container}>
            <Image source={{ uri: imageData }} style={styles.image} />
          </View>
        </ScrollView>
      </View>
      <Pressable onPress={() => setToggleName(!toggleName)}>
        <Text
          style={{
            color: '#fff',
            fontSize: 40,
            fontWeight: '600',
            textAlign: 'center',
            justifyContent: 'flex-end',
          }}>
          {toggleName ? 'Prachi' : 'Phool Gobi'}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  image: {
    width: '100%',
    height: 600,
  },
});

export default Love;
