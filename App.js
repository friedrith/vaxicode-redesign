import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.scan}>
        Open up App.js to start working on your app!
      </Text>
      <StatusBar style='auto' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16161a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scan: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Jost-Medium',
  },
})
