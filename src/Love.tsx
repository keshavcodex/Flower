import { useState, useEffect, useCallback } from 'react';
import { View, Image, StyleSheet, Text, Pressable } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Love = () => {
  const imageUrl = `https://source.unsplash.com/random?`;
  const [toggleInput, setToggleInput] = useState(false);
  const [toggleTextHead, setToggleTextHead] = useState(true);
  const [toggleName, setToggleName] = useState(true);
  const [loading, setLoading] = useState(false);
  const [imageName, setImageName] = useState('');
  const [imageData, setImageData] = useState(imageUrl + imageName);

  const fetchImage = async (text: string) => {
    setLoading(true);
    try {
      const url = imageUrl + text;
      if (url.length - imageUrl.length > 2) {
        const response = await axios.get(url);
        setImageData(response.request.responseURL);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      setLoading(true);
      const textInput = await AsyncStorage.getItem('imageName');
      await fetchImage(textInput || 'flower');
      if (textInput) setImageName(textInput);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('initialization failed');
    }
  };
  const handleTextInput = (text: string) => {
    text = text.trim();
    setImageName(text);
  };
  const handleBlur = async () => {
    const res = await AsyncStorage.setItem('imageName', imageName);
    setToggleInput(false);
    fetchImage(imageName);
  };
  const handleImagePress = () => {
    if (!loading) {
      if (toggleInput) handleBlur();
      else fetchImage(imageName);
    }
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
          justifyContent: 'center',
        }}>
        <Pressable onPress={() => setToggleTextHead(!toggleTextHead)}>
          <Text
            style={{
              color: '#fff',
              fontSize: 40,
              fontWeight: '600',
              textAlign: 'center',
            }}>
            {toggleTextHead ? 'I Love You' : 'Hello'}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setToggleInput(!toggleInput)}
          style={{ paddingHorizontal: 5, paddingTop: 5 }}>
          <Entypo name={'flower'} size={40} color={'#fff'} />
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
          onBlur={handleBlur}
          style={{
            fontSize: 19,
            minHeight: 20,
            maxHeight: 500,
            marginTop: 5,
            paddingVertical: 5,
          }}
        />
      )}
      <Pressable
        android_ripple={{
          color: '#fff',
          foreground: true,
          radius: 30,
          borderless: true,
        }}
        onLongPress={() => {
          setToggleInput(!toggleInput);
        }}
        onPress={handleImagePress}
        style={styles.container}>
        <Image source={{ uri: imageData }} style={styles.image} />
      </Pressable>
      <Pressable
        android_ripple={{ color: '#ed4e7380' }}
        onPress={() => setToggleName(!toggleName)}>
        <Text
          style={{
            color: '#FFFFFF',
            fontSize: 40,
            fontWeight: '600',
            textAlign: 'center',
          }}>
          {toggleName ? 'Cutie' : 'Phool Gobi'}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 700,
  },
});

export default Love;
