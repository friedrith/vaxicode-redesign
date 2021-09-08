import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'

export default ({ ...props }) => <Button style={styles.button} {...props} />

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#7f5af0',
    color: '#fffffe',
  },
})
