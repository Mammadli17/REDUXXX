import { StyleSheet, Switch, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../redux'
import { changeTheme } from '../redux/slices/ThemeSlice'

const ThemeScreeen = () => {
    const dark = useSelector((state: any) => state.themeSlice.dark)
    const dispatch = useDispatch<AppDispatch>()
    const handleTheme = () => {
        dispatch(changeTheme())
    }

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Switch value={dark} onChange={handleTheme} />
        </SafeAreaView>
    )
}

export default ThemeScreeen

const styles = StyleSheet.create({})