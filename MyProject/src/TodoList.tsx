import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { AppDispatch, StateType } from '../redux';
import { deleteById, getTodos, updateTodo } from '../redux/slices/todoSlice';
import Length from './Length';
import CreateTodo from './CreateTodo';
import { toggleFavorite } from '../redux/slices/favoritesSlice';

const TodoList = ({ navigation }: any) => {
  const dark = useSelector((state: any) => state.themeSlice.dark)
  const dispatch = useDispatch<AppDispatch>();

  const { loading, error, todos } = useSelector((state: StateType) => state.todosSlice);
  const { favorites } = useSelector((state: StateType) => state.favoritesSlice);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [filteredTodos, setFilteredTodos] = useState(todos);

  const remov = (id: any) => {
    dispatch(deleteById(id));
    console.log(id);
  };

  const update = () => {
    dispatch(updateTodo({ id: selectedItemId, title, description }));
    setModalVisible(false);
    setTitle('');
    setDescription('');
  };

  const toggleFavoriteTodo = (id: any) => {
    dispatch(toggleFavorite(id));
  };

  useEffect(() => {
    dispatch(getTodos());
    console.log("sks");
  }, []);

  useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);

  const refresh = () => {
    dispatch(getTodos());
    setFilteredTodos(todos);
  };

  const openUpdateModal = (id: any) => {
    setSelectedItemId(id);
    setModalVisible(true);
  };

  const originalProducts = todos;

  const myFunc = (value: any) => {
    const filteredData = originalProducts.filter((item: any) => item.title.toLowerCase().includes(value.toLowerCase()));
    setFilteredTodos(filteredData);
  };

  return (
    <View style={styles.container}>
      <Length />
      <TextInput
        style={{ borderWidth: 2, width: 300, borderRadius: 30, color: "black" }}
        placeholder='Search'
        placeholderTextColor={'black'}
        onChangeText={myFunc}
      />
      {loading === 'pending' ? (
        <ActivityIndicator style={styles.loadingIndicator} />
      ) : (
        <View style={styles.listContainer}>
          <FlatList
            refreshing={false}
            onRefresh={refresh}
            contentContainerStyle={styles.listContent}
            data={filteredTodos} // Use filteredTodos instead of todos
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate('Det', { item: item })}>
                <View style={styles.itemContainer}>
                  <Image source={{ uri: item.avatar }} style={styles.itemImage} />
                  <View style={styles.itemContent}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Button title='Remove' onPress={() => remov(item.id)} color='red' />
                    <Button title='Update' onPress={() => openUpdateModal(item.id)} color='blue' />
                    <Button
                      title={favorites.some((fav) => fav.id === item.id) ? 'Remove Favorite' : 'Add Favorite'}
                      onPress={() => toggleFavoriteTodo(item.id)}
                      color={favorites.some((fav) => fav.id === item.id) ? 'red' : 'green'}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
      <CreateTodo />
      <Modal visible={modalVisible} animationType='slide'>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Update Todo</Text>
          <TextInput
            style={styles.input}
            placeholder='Enter title'
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder='Enter description'
            value={description}
            onChangeText={setDescription}
          />
          <Button title='Update' onPress={update} />
          <Button title='Cancel' onPress={() => setModalVisible(false)} color='gray' />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
  },
  loadingIndicator: {
    marginTop: 50,
  },
  listContainer: {
    flex: 1,
    width: '100%',
  },
  listContent: {
    paddingVertical: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  itemImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 50,
  },
  itemContent: {
    backgroundColor: 'gray',
    padding: 10,
    flex: 1,
    borderRadius: 10,
  },
  itemTitle: {
    fontSize: 20,
    color: 'white',
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: 'black',
  },
});

export default TodoList;
