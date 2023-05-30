import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { length as lengthdispatch } from '../redux/slices/todoSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../redux'
import { Colors } from 'react-native/Libraries/NewAppScreen'

const Length = () => {

  const dark = useSelector((state: any) => state.themeSlice.dark)
    
    let dispatch = useDispatch<AppDispatch>();
    let { length,todos } = useSelector<any, any>(state => state.todosSlice);


    useEffect(() => {

        dispatch(lengthdispatch());
    }, [todos])
  return (
    <View style={{alignItems:"center",justifyContent:"center",marginTop:80}}>
     <Text style={{fontSize:25,  color: dark ? "#fff" : "#1c1c1c"}}> NUMBER OF CUSTOMOR : {length} </Text>
    </View>
  )
}

export default Length