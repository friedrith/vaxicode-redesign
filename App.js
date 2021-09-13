import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { NativeRouter, BackButton, Route } from 'react-router-native'
import { useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import { store, persistor } from './src/redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import Scan from './src/components/pages/Scan'
import Proofs from './src/components/pages/Proofs'

export default () => {
  const [loaded] = useFonts({
    'Jost-Medium': require('./src/assets/fonts/Jost-Medium.ttf'),
  })

  if (!loaded) {
    return null
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <SafeAreaView style={styles.container}>
            <StatusBar style='light' />
            <GestureHandlerRootView style={{ flex: 1 }}>
              <NativeRouter>
                <BackButton>
                  <Route exact path='/' component={Proofs} />
                  <Route exact path='/scan' component={Scan} />
                </BackButton>
              </NativeRouter>
            </GestureHandlerRootView>
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
