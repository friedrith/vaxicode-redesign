import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableHighlight,
  FlatList,
  AppState,
} from 'react-native'
import { Icon } from 'react-native-elements'
import { Link, useHistory } from 'react-router-native'

import * as Brightness from 'expo-brightness'
import { Header } from 'react-native-elements'

import Button from '../atoms/Button'
import Proof from '../molecules/Proof'
import { getProofs, getId } from '../../redux/proofs'

export default () => {
  const permission = useRef('')

  const activeIndex = useRef(0)

  const appState = useRef(AppState.currentState)

  const proofs = useSelector(getProofs)

  const history = useHistory()

  const onAwake = nextAppState => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active' &&
      permission.current === 'granted' &&
      proofs.length > 0
    ) {
      Brightness.setSystemBrightnessAsync(1)
    }

    appState.current = nextAppState
  }

  useEffect(() => {
    ;(async () => {
      permission.current = (await Brightness.requestPermissionsAsync()).status

      if (permission.current === 'granted' && proofs.length > 0) {
        Brightness.setSystemBrightnessAsync(1)
      }
    })()

    AppState.addEventListener('change', onAwake)

    return () => {
      AppState.removeEventListener('change', onAwake)
    }
  }, [])

  return (
    <View style={styles.container}>
      <Header
        placement='center'
        containerStyle={styles.header}
        backgroundColor='#16161a'
      >
        <TouchableHighlight>
          <Icon name='menu-outline' size={30} type='ionicon' color='#fff' />
        </TouchableHighlight>
        <Text style={styles.title}>My Immunizations</Text>
        <Link to='/scan'>
          <Icon name='add-outline' size={30} type='ionicon' color='#fff' />
        </Link>
      </Header>
      <View style={styles.list}>
        {proofs.length > 0 ? (
          <FlatList
            data={proofs}
            renderItem={({ item, index }) => (
              <Proof proof={item} expanded={index === activeIndex.current} />
            )}
          />
        ) : (
          <View style={styles.content}>
            <Link to='/scan'>
              <Button title='Add proof' onPress={() => history.push('/scan')} />
            </Link>
          </View>
        )}
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
    backgroundColor: '#16161a',
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    color: '#fffffe',
    textAlign: 'left',
    fontFamily: 'Jost-Medium',
    fontSize: 17,
    textTransform: 'uppercase',
    flex: 1,
    paddingTop: 5,
    paddingBottom: 5,
  },
  list: {
    paddingTop: 15,
    flex: 1,
  },
  content: {
    display: 'flex',
    flex: 1,
    alignItems: 'stretch',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 15,
  },
})
