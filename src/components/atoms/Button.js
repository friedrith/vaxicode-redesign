import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

export default ({ title, onPress }) => (
  <TouchableOpacity style={styles.button}>
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#7f5af0',
    padding: 10,
    borderRadius: 5,
  },
  title: {
    color: '#fffffe',
    fontSize: 23,
    textAlign: 'center',
    fontFamily: 'Jost-Medium',
  },
})
