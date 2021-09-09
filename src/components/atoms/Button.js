import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

export default ({ title, onPress, small = false, style, basic, icon }) => (
  <TouchableOpacity
    style={{
      ...styles.button,
      ...(small ? styles.small : {}),
      ...(basic ? styles.basic : {}),
      ...style,
    }}
    onPress={onPress}
  >
    {icon}
    <Text
      style={{
        ...(small ? styles.titleSmall : styles.title),
        ...(icon ? styles.withIcon : styles.withoutIcon),
      }}
    >
      {title}
    </Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#7f5af0',
    padding: 10,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  small: {
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
  },
  basic: {
    backgroundColor: '#242629',
  },
  title: {
    color: '#fffffe',
    fontSize: 23,
    textAlign: 'center',
    fontFamily: 'Jost-Medium',
  },
  titleSmall: {
    color: '#fffffe',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Jost-Medium',
  },
  withIcon: {
    paddingLeft: 10,
  },
})
