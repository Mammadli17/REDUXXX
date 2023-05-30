import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TodoList from '../src/TodoList';
import DarkMode from '../src/DarkMode';

import Fav from '../src/Fav';

const Tabs = createBottomTabNavigator();

const Tab = () => {
    return (
    
        <>
        <Tabs.Navigator>
            <Tabs.Screen name='TodoList' component={TodoList} options={{headerShown:false}}/>
            <Tabs.Screen name='Dark' component={DarkMode} options={{headerShown:false}}/>
            <Tabs.Screen name='Fav' component={Fav} options={{headerShown:false}}/>
        </Tabs.Navigator>
        </>
        
      )
}

export default Tab