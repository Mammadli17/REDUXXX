import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

const FavoritePage = () => {
  const favorites = useSelector((state: any) => state.favoritesSlice.favorites);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Favorite Items</Text>
      {favorites.length > 0 ? (
        favorites.map((item: any) => (
          <View key={item.id} style={styles.item}>
            <Image source={{ uri: item.avatar }} style={styles.itemImage} />
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.noFavorites}>No favorite items.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  itemDescription: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
  noFavorites: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default FavoritePage;
