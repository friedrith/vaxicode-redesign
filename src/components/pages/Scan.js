import React, { useState, useRef } from 'react'
import { StyleSheet, Text, View, TextInput, Vibration } from 'react-native'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-native'

import RBSheet from 'react-native-raw-bottom-sheet'

import parserQrCode from 'utils/parserQrCode'
import Button from 'components/atoms/Button'
import { addProof } from 'redux/proofs'
import ClosablePage from 'components/templates/ClosablePage'
import Camera from 'components/molecules/Camera'
import {
  backgroundColor,
  backgroundColorHue1,
  primary,
  primaryHue1,
  fontFamily,
  secondary,
} from 'styles'

import i18n, { tr, addTranslation } from 'locales/i18n'

addTranslation({
  en: {
    scan: 'Scan the QR code on your vaccination proof.',
    qrCodeNotValid: `The QR code is not a valid SHC QR code. But you can still save
    it as another country vaccine passport.`,
    detected: 'Vaccination proof detected',
    save: 'Save',
    name: 'Name',
  },
  fr: {
    scan: 'Scanner le QR code sur votre preuve vaccinale.',
    qrCodeNotValid: `Le QR code n'est pas un QR code SHC valide. Mais vous pouvez quand même le sauvegarder comme un passeport vaccinale étranger.`,
    detected: 'Preuve de vaccination détectée',
    save: 'Sauvegarder',
    name: 'Nom',
  },
})

const Scan = () => {
  const barCodeScanned = useRef('')
  const camera = useRef()

  // const [cameraWidth, setCameraWidth] = useState(300)

  const bottomPanel = useRef()

  const [proof, setProof] = useState('')

  const dispatch = useDispatch()

  const history = useHistory()

  const onScan = ({ data }) => {
    if (data === barCodeScanned.current) {
      return ''
    }

    Vibration.vibrate()

    camera.current.pausePreview()
    barCodeScanned.current = data
    setProof(parserQrCode(data))
    bottomPanel.current.open()
  }

  const onBottomPanelClose = () => {
    barCodeScanned.current = ''
    setProof('')
    camera.current.resumePreview()
  }

  const onSaveProof = () => {
    dispatch(addProof(proof))
    history.goBack()
  }

  const onChangeText = text => {
    setProof({
      ...proof,
      payload: { name: text },
    })
  }

  return (
    <ClosablePage>
      <View style={styles.content}>
        <Text style={styles.scan}>{tr('scan')}</Text>
        <Camera ref={camera} onScan={onScan} />
        <RBSheet
          ref={bottomPanel}
          height={300}
          openDuration={500}
          onClose={onBottomPanelClose}
          customStyles={{ container: styles.bottomPanel }}
        >
          <View style={styles.bottomPanelContent}>
            {proof.parsingFailed ? (
              <View>
                <Text style={styles.bottomPanelFailed}>
                  {tr('qrCodeNotValid')}
                </Text>
                <TextInput
                  style={styles.input}
                  autofocus
                  placeholder={tr('name')}
                  editable
                  maxLength={40}
                  placeholderTextColor={primaryHue1}
                  onChangeText={onChangeText}
                />
              </View>
            ) : (
              <View>
                <Text style={styles.bottomPanelTitle}>{tr('detected')}</Text>
                <Text style={styles.bottomPanelName}>{proof.name}</Text>
                <Text style={styles.bottomPanelBirthday}>
                  {i18n.toTime('date.formats.short', proof.birthDay)}
                </Text>
              </View>
            )}
          </View>
          <Button title={tr('save')} onPress={onSaveProof} />
        </RBSheet>
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
  input: {
    backgroundColor: backgroundColorHue1,
    color: primary,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  scan: {
    fontSize: 23,
    color: primaryHue1,
    textAlign: 'center',
    fontFamily,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  scanIcon: {
    opacity: 0.3,
  },

  bottomPanel: {
    padding: 20,
    backgroundColor,
    display: 'flex',
    flexDirection: 'column',
  },
  bottomPanelContent: {
    flex: 1,
  },
  bottomPanelTitle: {
    fontSize: 18,
    color: secondary,
    textAlign: 'center',
    fontFamily,
  },
  bottomPanelFailed: {
    fontSize: 18,
    color: primary,
    textAlign: 'center',
    fontFamily,
  },
  bottomPanelName: {
    fontSize: 35,
    color: primary,
    textAlign: 'center',
    fontFamily,
    paddingTop: 20,
  },
  bottomPanelBirthday: {
    fontSize: 20,
    color: primaryHue1,
    textAlign: 'center',
    fontFamily,
    paddingTop: 10,
  },
})

export default Scan
