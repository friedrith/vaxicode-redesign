import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PropTypes from 'prop-types'

import { primaryHue1, fontFamily, ternary } from 'styles'

const Immunizations = ({ immunization }) => (
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
    backgroundColor: primaryHue1,
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
    color: ternary,
    textAlign: 'center',
    fontFamily,
  },
  doseNumberValue: {
    fontSize: 25,
    color: ternary,
    textAlign: 'center',
    fontFamily,
  },
  title: {
    fontSize: 16,
    color: ternary,
    textAlign: 'left',
    fontFamily,
  },
  place: {
    fontSize: 16,
    color: ternary,
    textAlign: 'left',
    fontFamily,
    paddingTop: 10,
    paddingBottom: 10,
  },
  name: {
    fontSize: 15,
    color: ternary,
    textAlign: 'left',
    fontFamily,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
})

Immunizations.propTypes = {
  immunization: PropTypes.shape({
    doseNumber: PropTypes.number.isRequired,
    vaccinName: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    place: PropTypes.string.isRequired,
    lot: PropTypes.string.isRequired,
  }).isRequired,
}

export default Immunizations
