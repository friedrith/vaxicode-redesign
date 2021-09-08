import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default () => (
  <View style={styles.container}>
    <Text style={styles.scan}>Scan the QR code on your vaccination proof</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16161a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  scan: {
    fontSize: 25,
    color: '#94A1B2',
    textAlign: 'center',
    fontFamily: 'Jost-Medium',
  },
})
