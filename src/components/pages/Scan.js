import React, { useState, useEffect, useRef } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  Vibration,
} from 'react-native'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-native'

import { Camera } from 'expo-camera'
import { Icon, BottomSheet } from 'react-native-elements'
import { BarCodeScanner } from 'expo-barcode-scanner'
import QRCode from 'react-native-qrcode-svg'
import RBSheet from 'react-native-raw-bottom-sheet'

import parserQrCode from '../../utils/parserQrCode'
import Button from '../atoms/Button'
import { addProof } from '../../redux/proofs'

const ONE_SECOND_IN_MS = 1000

export default () => {
  const [hasPermission, setHasPermission] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back)
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
    const { x, y, width, height } = event.nativeEvent.layout
    setCameraWidth(width)
  }

  return (
    <View style={styles.container}>
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
          type={type}
          barCodeScannerSettings={{
            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
          }}
          onBarCodeScanned={scanned}
        >
          {/* <Icon
            name='qr-code-outline'
            style={styles.scanIcon}
            color='white'
            type='ionicon'
            size={300}
            iconStyle={styles.scanIcon}
          /> */}
        </Camera>
      </View>
      <RBSheet
        ref={bottomPanel}
        height={300}
        openDuration={1000}
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16161a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
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
