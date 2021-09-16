import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import {
  StyleSheet,
  Text,
  View,
  Platform,
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
import { getProofs } from '../../redux/proofs'

const MAX_BRIGHTNESS = 1

const Proofs = () => {
  const permission = useRef('')
  const isAvailable = useRef(false)
  const previousBrightness = useRef(0)
  const previousBrightnessMode = useRef(Brightness.BrightnessMode.AUTOMATIC)

  const activeIndex = useRef(0)

  const appState = useRef(AppState.currentState)

  const proofs = useSelector(getProofs)

  const history = useHistory()

  const onAwakeOrSleep = async nextAppState => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active' &&
      isAvailable.current &&
      permission.current === 'granted' &&
      proofs.length > 0
    ) {
      Brightness.setSystemBrightnessAsync(MAX_BRIGHTNESS)
    } else if (
      appState.current === 'active' &&
      nextAppState.match(/inactive|background/) &&
      isAvailable.current
    ) {
      await Brightness.setSystemBrightnessAsync(previousBrightness.current)
      if (Platform.OS === 'android') {
        await Brightness.setSystemBrightnessModeAsync(
          previousBrightnessMode.current
        )
      }
    }

    appState.current = nextAppState
  }

  const initializeBrightness = async () => {
    permission.current = (await Brightness.requestPermissionsAsync()).status
    isAvailable.current = await Brightness.isAvailableAsync()
    if (isAvailable.current && permission.current === 'granted') {
      previousBrightness.current = await Brightness.getSystemBrightnessAsync()
      previousBrightnessMode.current =
        await Brightness.getSystemBrightnessModeAsync()

      if (proofs.length > 0) {
        await Brightness.setSystemBrightnessAsync(MAX_BRIGHTNESS)
      }
    }
  }

  useEffect(() => {
    initializeBrightness()

    AppState.addEventListener('change', onAwakeOrSleep)

    return () => {
      AppState.removeEventListener('change', onAwakeOrSleep)
    }
  }, [])

  return (
    <View style={styles.container}>
      <Header
        placement='center'
        containerStyle={styles.header}
        backgroundColor='#16161a'
      >
        {/* <></> */}
        {/* <TouchableHighlight>
          <Icon name='menu-outline' size={30} type='ionicon' color='#fff' />
        </TouchableHighlight> */}
        <Link to='/about'>
          <Icon name='menu-outline' size={30} type='ionicon' color='#fff' />
        </Link>
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

export default Proofs
