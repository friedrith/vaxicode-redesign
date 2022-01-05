import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Linking } from 'react-native'

import ClosablePage from 'components/templates/ClosablePage'
import { primaryHue1, primary, fontFamily } from 'styles'
import { TouchableWithoutFeedback } from 'react-native'
import Icon from 'components/atoms/Icon'

import i18n, { addTranslation } from 'locales/i18n'

addTranslation({
  en: {
    about: 'This app has been implemented by',
    wantToHireMe: 'Want to hire me?',
  },
  fr: {
    about: 'Cette app a été implémentée par',
    wantToHireMe: 'Travaillons ensemble ?',
  },
})

const About = () => {
  const openGithub = async () => {
    await Linking.openURL('https://github.com/friedrith')
  }

  const openLinkedin = async () => {
    await Linking.openURL('https://www.linkedin.com/in/thibault-friedrich/')
  }

  return (
    <ClosablePage>
      <View style={styles.content}>
        <Text style={styles.general}>{i18n.t('about')}</Text>
        <Text style={styles.white}>Thibault FRIEDRICH</Text>
        <Text style={styles.general}>{i18n.t('wantToHireMe')}</Text>
        <View style={styles.logos}>
          <View style={styles.logo}>
            <TouchableWithoutFeedback onPress={openGithub}>
              <Icon name='logo-github' size={40} />
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.logo}>
            <TouchableWithoutFeedback onPress={openLinkedin}>
              <Icon name='logo-linkedin' size={40} />
            </TouchableWithoutFeedback>
          </View>
        </View>
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
    padding: 10,
  },
  white: {
    fontSize: 23,
    color: primary,
    textAlign: 'center',
    fontFamily,
    paddingTop: 10,
    paddingBottom: 30,
  },
  logos: {
    paddingTop: 20,
    display: 'flex',
    flexDirection: 'row',
  },
  logo: {
    padding: 10,
  },
})

export default About
