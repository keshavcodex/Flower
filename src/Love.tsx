import { useState, useEffect, useCallback } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  ScrollView,
  RefreshControl,
} from 'react-native';
import axios from 'axios';

const Love = () => {
  const imageUrl = 'https://source.unsplash.com/random?love';
  const [imageData, setImageData] = useState(imageUrl);
  const [refreshing, setRefreshing] = useState(false);

  const fetchImage = async () => {
    const response = await axios.get(imageUrl);
    setImageData(response.request.responseURL);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      fetchImage();
      setRefreshing(false);
    }, 1000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      fetchImage();
    }, 250000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#ed4e73',
      }}>
      <Text style={{ fontSize: 40, fontWeight: '600', textAlign: 'center' }}>
        I Love You
      </Text>
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
      <Text
        style={{
          fontSize: 40,
          fontWeight: '600',
          textAlign: 'center',
          justifyContent: 'flex-end',
        }}>
        Prachi
      </Text>
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
