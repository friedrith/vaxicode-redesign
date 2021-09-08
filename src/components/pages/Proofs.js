import React, { useEffect, useRef } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableHighlight,
  FlatList,
} from 'react-native'
import { Icon } from 'react-native-elements'
import { Link } from 'react-router-native'

import * as Brightness from 'expo-brightness'
import { Header } from 'react-native-elements'

import Button from '../atoms/Button'
import Proof from '../molecules/Proof'

const proofs = [
  {
    name: 'Thibault Friedrich',
  },
  {
    name: 'Paria Majidi',
  },
]

export default () => {
  const status = useRef('foo')

  useEffect(() => {
    ;(async () => {
      status.current = (await Brightness.requestPermissionsAsync()).status
    })()
  }, [])

  const onPress = () => {
    if (status.current === 'granted') {
      Brightness.setSystemBrightnessAsync(1)
    } else {
      Alert.alert('Alert Title', status.current, [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ])
    }
  }

  return (
    <View style={styles.container}>
      <Header placement='right' containerStyle={styles.header}>
        <Link to='/scan'>
          <Icon name='add-outline' size={30} type='ionicon' color='#fff' />
        </Link>

        <></>
        <TouchableHighlight>
          <Icon
            name='ellipsis-vertical-outline'
            size={30}
            type='ionicon'
            color='#fff'
          />
        </TouchableHighlight>
      </Header>
      <View style={styles.list}>
        <FlatList
          data={proofs}
          renderItem={({ item }) => <Proof name={item.name} />}
          keyExtractor={item => item.name}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16161a',
  },
  header: {
    borderBottomColor: 'transparent',
    backgroundColor: 'transparent',
  },
  list: {
    paddingTop: 15,
    flex: 1,
  },
})
