import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'

import { Camera } from 'expo-camera'
import { Icon } from 'react-native-elements'
import { BarCodeScanner } from 'expo-barcode-scanner'
import QRCode from 'react-native-qrcode-svg'

import parseShc from '../../utils/parseShc'

export default () => {
  const [hasPermission, setHasPermission] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back)
  const barCodeScanned = useRef('')

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
    // Alert.alert('Scanned', JSON.stringify(payload), [
    //   {
    //     text: 'Cancel',
    //     onPress: () => console.log('Cancel Pressed'),
    //     style: 'cancel',
    //   },
    //   { text: 'OK', onPress: () => console.log('OK Pressed') },
    // ])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.scan}>
        Scan the QR code on your vaccination proof.
      </Text>

      <View style={styles.cameraContainer}>
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
      </View>
      {proof ? <QRCode value={proof.raw} /> : null}
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
})
