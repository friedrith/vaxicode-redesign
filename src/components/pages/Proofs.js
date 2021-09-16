import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { StyleSheet, Text, View, FlatList, AppState } from 'react-native'
import { Link, useHistory } from 'react-router-native'
import * as Brightness from 'expo-brightness'
import useEventListener from '@use-it/event-listener'

import Button from 'components/atoms/Button'
import Proof from 'components/molecules/Proof'
import Page from 'components/templates/Page'
import Header from 'components/molecules/Header'
import Icon from 'components/atoms/Icon'
import { getProofs } from 'redux/proofs'
import { primary, fontFamily } from 'styles'

import { tr, addTranslation } from 'locales/i18n'

addTranslation({
  en: {
    myImmunizations: 'My Immunizations',
    addProof: 'Add proof',
  },
  fr: {
    myImmunizations: 'Mes Immunisations',
    addProof: 'Ajouter une preuve',
  },
})

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
    <Page>
      <Header>
        <Link to='/about'>
          <Icon name='menu-outline' />
        </Link>
        <Text style={styles.title}>{tr('myImmunizations')}</Text>
        <Link to='/scan'>
          <Icon name='add-outline' />
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
              <Button
                title={tr('addProof')}
                onPress={() => history.push('/scan')}
                icon={<Icon name='add-outline' />}
              />
            </Link>
          </View>
        )}
      </View>
    </Page>
  )
}
const styles = StyleSheet.create({
  title: {
    color: primary,
    textAlign: 'left',
    fontFamily,
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
