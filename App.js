import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { NativeRouter, BackButton, Route } from 'react-router-native'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { store, persistor } from './src/redux/store'
import { PersistGate } from 'redux-persist/integration/react'

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
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <SafeAreaView style={styles.container}>
            <StatusBar style='light' />
            <NativeRouter>
              <BackButton>
                <Route exact path='/' component={Proofs} />
                <Route exact path='/scan' component={Scan} />
              </BackButton>
            </NativeRouter>
          </SafeAreaView>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
