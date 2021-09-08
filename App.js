import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { NativeRouter, Route, Link } from 'react-router-native'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'
import { StatusBar } from 'expo-status-bar'

import Scan from './src/components/pages/Scan'
import Proofs from './src/components/pages/Proofs'

const fetchFonts = () =>
  Font.loadAsync({
    'Jost-Medium': require('./src/assets/fonts/Jost-Medium.ttf'),
  })

export default () => {
  const [fontloaded, setfontloaded] = useState(false)

  if (!fontloaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setfontloaded(true)
        }}
        onError={console.warn}
      />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='light' />
      <NativeRouter>
        <Route exact path='/' component={Proofs} />
      </NativeRouter>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
})
