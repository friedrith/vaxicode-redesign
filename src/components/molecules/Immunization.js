import React, { useRef, useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default ({ immunization }) => (
  <View style={styles.container}>
    <View style={styles.doseNumber}>
      <Text style={styles.doseNumberLabel}>Dose</Text>
      <Text style={styles.doseNumberValue}>{immunization.doseNumber}</Text>
    </View>
    <View style={styles.content}>
      <Text style={styles.name}>{immunization.vaccinName}</Text>
      <Text style={styles.title}>{immunization.date}</Text>

      <Text style={styles.place}>{immunization.place}</Text>
      <Text style={styles.title}>Lot {immunization.lot}</Text>
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderRadius: 10,
    backgroundColor: '#94a1b2',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  },
  doseNumber: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingRight: 8,
    paddingLeft: 8,
  },
  doseNumberLabel: {
    fontSize: 15,
    color: '#010101',
    textAlign: 'center',
    fontFamily: 'Jost-Medium',
  },
  doseNumberValue: {
    fontSize: 25,
    color: '#010101',
    textAlign: 'center',
    fontFamily: 'Jost-Medium',
  },
  title: {
    fontSize: 16,
    color: '#010101',
    textAlign: 'left',
    fontFamily: 'Jost-Medium',
  },
  place: {
    fontSize: 16,
    color: '#010101',
    textAlign: 'left',
    fontFamily: 'Jost-Medium',
    paddingTop: 10,
    paddingBottom: 10,
  },
  name: {
    fontSize: 15,
    color: '#010101',
    textAlign: 'left',
    fontFamily: 'Jost-Medium',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
})
