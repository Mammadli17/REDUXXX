import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Detail = ({ navigation, route }: any) => {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#555',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
});

export default Detail;
