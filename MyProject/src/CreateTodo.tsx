import { Button, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux'

import { postTodo } from '../redux/slices/todoSlice'

const CreateTodo = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [todo, setTodo] = useState<string>('');

  const dispatch = useDispatch<AppDispatch>();

  const addHandle = () => {
    if (todo.trim() === '') {
      // Eksik veri kontrolü yapabilirsiniz
      return;
    }

    const newTodo: any = {
      title: todo,
      completed: false
    };

    dispatch(postTodo(newTodo));
    setModalVisible(false);
    setTodo('');
  };

  return (
    <View style={styles.container}>
      <Modal
      style={{borderColor:"black"}}
        visible={modalVisible}
        animationType='slide'
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.textInput}
              placeholder='Enter todo...'
              value={todo}
              onChangeText={setTodo}
            />
            <TouchableOpacity style={styles.addButton} onPress={addHandle}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Button title='Add Customer' onPress={() => setModalVisible(true)} />
    </View>
  );
}

export default CreateTodo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 10,
    color:"red"
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});
