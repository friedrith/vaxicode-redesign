import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import ClosablePage from 'components/templates/ClosablePage'
import { primaryHue1, fontFamily } from 'styles'

import i18n, { addTranslation } from 'locales/i18n'

addTranslation({
  en: {
    about: 'About',
  },
  fr: {
    about: 'À propos',
  },
})

const About = () => {
  return (
    <ClosablePage>
      <View style={styles.content}>
        <Text style={styles.general}>{i18n.t('about')}</Text>
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
    color: primaryHue1,
    textAlign: 'center',
    fontFamily,
  },
})

export default About
