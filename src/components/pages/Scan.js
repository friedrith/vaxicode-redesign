import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'

import { Camera } from 'expo-camera'
import { Icon } from 'react-native-elements'
import { BarCodeScanner } from 'expo-barcode-scanner'
import QRCode from 'react-native-qrcode-svg'
import RBSheet from 'react-native-raw-bottom-sheet'

import parseShc from '../../utils/parseShc'
import Button from '../atoms/Button'

export default () => {
  const [hasPermission, setHasPermission] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back)
  const barCodeScanned = useRef('')

  const bottomPanel = useRef()

  const [proof, setProof] = useState('')

  useEffect(() => {
    ;(async () => {
      const { status } = await Camera.requestPermissionsAsync()
      setHasPermission(status === 'granted')
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
    barCodeScanned.current = data
    const parsedData = parseShc(data)
    setProof({ raw: data, ...parsedData })
    bottomPanel.current.open()
    // Alert.alert('Scanned', JSON.stringify(payload), [
    //   {
    //     text: 'Cancel',
    //     onPress: () => console.log('Cancel Pressed'),
    //     style: 'cancel',
    //   },
    //   { text: 'OK', onPress: () => console.log('OK Pressed') },
    // ])
  }

  const onBottomPanelClose = () => {
    barCodeScanned.current = ''
    setProof('')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.scan}>
        Scan the QR code on your vaccination proof.
      </Text>

      <View style={styles.cameraContainer}>
        {proof ? (
          <QRCode value={proof.raw} size={300} logoSize={300} />
        ) : (
          <Camera
            style={styles.camera}
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
        )}
      </View>
      <RBSheet
        ref={bottomPanel}
        height={300}
        openDuration={250}
        onClose={onBottomPanelClose}
        customStyles={{ container: styles.bottomPanel }}
      >
        <View style={styles.bottomPanelContent}>
          <Text style={styles.bottomPanelTitle}>
            Vaccination proof detected
          </Text>
          <Text style={styles.bottomPanelName}>Thibault Friedrich</Text>
        </View>
        <Button title='Save' />
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
    width: 300,
    height: 300,
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
    color: '#94a1b2',
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
})
