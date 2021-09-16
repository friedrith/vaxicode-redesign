import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, TextInput, Vibration } from 'react-native'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-native'

import { Camera } from 'expo-camera'
import { BarCodeScanner } from 'expo-barcode-scanner'
import RBSheet from 'react-native-raw-bottom-sheet'

import parserQrCode from '../../utils/parserQrCode'
import Button from '../atoms/Button'
import { addProof } from '../../redux/proofs'
import ClosablePage from '../molecules/ClosablePage'

const Scan = () => {
  const [hasPermission, setHasPermission] = useState(null)
  const barCodeScanned = useRef('')
  const camera = useRef()

  const [cameraWidth, setCameraWidth] = useState(300)

  const bottomPanel = useRef()

  const [proof, setProof] = useState('')

  const dispatch = useDispatch()

  const history = useHistory()

  useEffect(() => {
    ;(async () => {
      const { status } = await Camera.requestPermissionsAsync()
      setHasPermission(status === 'granted')

      if (status !== 'granted') {
        history.goBack()
      }
    })()
  }, [])

  if (hasPermission === null) {
    return <View />
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  const scanned = ({ data }) => {
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

  const changeCameraWidth = event => {
    const { width } = event.nativeEvent.layout
    setCameraWidth(width)
  }

  return (
    <ClosablePage>
      <View style={styles.content}>
        <Text style={styles.scan}>
          Scan the QR code on your vaccination proof.
        </Text>

        <View style={styles.cameraContainer} onLayout={changeCameraWidth}>
          <Camera
            ref={camera}
            style={{
              ...styles.camera,
              width: cameraWidth,
              height: cameraWidth,
            }}
            type={Camera.Constants.Type.back}
            barCodeScannerSettings={{
              barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
            }}
            onBarCodeScanned={scanned}
          ></Camera>
        </View>
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
                  The QR code is not a valid SHC QR code. But you can still save
                  it as another country vaccine passport.
                </Text>
                <TextInput
                  style={styles.input}
                  autofocus
                  placeholder='Name'
                  editable
                  maxLength={40}
                  placeholderTextColor='#94a1b2'
                  onChangeText={onChangeText}
                />
              </View>
            ) : (
              <View>
                <Text style={styles.bottomPanelTitle}>
                  Vaccination proof detected
                </Text>
                <Text style={styles.bottomPanelName}>{proof.name}</Text>
                <Text style={styles.bottomPanelBirthday}>{proof.birthDay}</Text>
              </View>
            )}
          </View>
          <Button title='Save' onPress={onSaveProof} />
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
    backgroundColor: '#242629',
    color: '#fffffe',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  scan: {
    fontSize: 23,
    color: '#94A1B2',
    textAlign: 'center',
    fontFamily: 'Jost-Medium',
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
  },
  scanIcon: {
    opacity: 0.3,
  },
  cameraContainer: {
    borderRadius: 5,
    overflow: 'hidden',
  },
  camera: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomPanel: {
    padding: 20,
    backgroundColor: '#16161a',
    display: 'flex',
    flexDirection: 'column',
  },
  bottomPanelContent: {
    flex: 1,
  },
  bottomPanelTitle: {
    fontSize: 18,
    color: '#2cb67d',
    textAlign: 'center',
    fontFamily: 'Jost-Medium',
  },
  bottomPanelFailed: {
    fontSize: 18,
    color: '#fffffe',
    textAlign: 'center',
    fontFamily: 'Jost-Medium',
  },
  bottomPanelName: {
    fontSize: 35,
    color: '#fffffe',
    textAlign: 'center',
    fontFamily: 'Jost-Medium',
    paddingTop: 20,
  },
  bottomPanelBirthday: {
    fontSize: 20,
    color: '#94a1b2',
    textAlign: 'center',
    fontFamily: 'Jost-Medium',
    paddingTop: 10,
  },
})

export default Scan
