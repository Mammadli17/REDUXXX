import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, Theme } from '@react-navigation/native';
import React from 'react';
import Detail from '../src/Detail';
import TodoList from '../src/TodoList';
import tab from './Tab';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const dark = useSelector((state: any) => state.themeSlice.dark)
  const theme: Theme = {
    dark: dark,
    colors: {
        background: dark ? '#1c1c1c' : '#fff',
        text: "blue",
        primary: "yellow",
        card: 'black',
        border: 'green',
        notification: 'green'
    },

}
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        <Stack.Screen name="Tab" component={tab} options={{ headerShown: false }} />
        <Stack.Screen name="Det" component={Detail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
