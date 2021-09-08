import React, { useRef, useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native'

import { Icon } from 'react-native-elements'

export default ({ name }) => {
  const [isExpanded, expand] = useState(false)

  const [rotateAnimation, setRotateAnimation] = useState(new Animated.Value(0))

  const toggle = () => {
    console.log(isExpanded)
    Animated.timing(rotateAnimation, {
      toValue: isExpanded ? 0 : 1,
      duration: 250,
      useNativeDriver: false,
    }).start()
    expand(!isExpanded)
  }

  const interpolateRotating = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  })

  const interpolateHeight = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 400],
  })

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggle}>
        <View style={styles.header}>
          <Text style={styles.title}>{name}</Text>
          <Animated.View
            style={[
              styles.animation,
              // { opacity: fadeAnim },
              { transform: [{ rotate: interpolateRotating }] },
            ]}
          >
            <Icon
              name='chevron-down-outline'
              size={30}
              type='ionicon'
              color='#fff'
            />
          </Animated.View>
        </View>
      </TouchableOpacity>
      <Animated.View style={[styles.content, { height: interpolateHeight }]} />
    </View>
  )
}

const padding = 15

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#242629',
    borderRadius: 7,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    padding: padding,
  },
  animation: {},
  title: {
    fontSize: 25,
    color: '#fffffe',
    textAlign: 'left',
    fontFamily: 'Jost-Medium',
    flex: 1,
  },
  content: {
    height: 400,
  },
  icon: {
    transform: [{ rotate: '0deg' }],
  },
  iconExpanded: {
    transform: [{ rotate: '180deg' }],
  },
  content: {},
})
