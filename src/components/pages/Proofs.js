import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { StyleSheet, Text, View, FlatList, AppState } from 'react-native'
import { Icon } from 'react-native-elements'
import { Link, useHistory } from 'react-router-native'

import * as Brightness from 'expo-brightness'
import { Header } from 'react-native-elements'
import useEventListener from '@use-it/event-listener'

import Button from '../atoms/Button'
import Proof from '../molecules/Proof'
import { getProofs } from '../../redux/proofs'

const MAX_BRIGHTNESS = 1

const isAwaking = (appState, nextAppState) =>
  appState.match(/inactive|background/) && nextAppState === 'active'

const Proofs = () => {
  const activeIndex = useRef(0)

  const appState = useRef(AppState.currentState)

  const proofs = useSelector(getProofs)

  const history = useHistory()

  const initializeBrightness = async () => {
    if (proofs.length > 0) {
      await Brightness.setBrightnessAsync(MAX_BRIGHTNESS)
    }
  }

  const onAwake = async nextAppState => {
    if (isAwaking(appState.current, nextAppState)) {
      await initializeBrightness
    }

    appState.current = nextAppState
  }

  useEffect(() => {
    initializeBrightness()
  }, [])

  useEventListener('change', onAwake, AppState)

  return (
    <View style={styles.container}>
      <Header
        placement='center'
        containerStyle={styles.header}
        backgroundColor='#16161a'
      >
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
