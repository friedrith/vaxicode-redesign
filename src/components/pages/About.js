import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import ClosablePage from '../molecules/ClosablePage'

const About = () => {
  return (
    <ClosablePage>
      <View style={styles.content}>
        <Text style={styles.general}>This application ...</Text>
      </View>
    </ClosablePage>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  general: {
    fontSize: 23,
    color: '#94A1B2',
    textAlign: 'center',
    fontFamily: 'Jost-Medium',
  },
})

export default About
