import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, Text } from 'react-native'

import * as Expo from 'expo-camera'
import { BarCodeScanner } from 'expo-barcode-scanner'

// https://stackoverflow.com/questions/58634905/camera-preview-in-expo-is-distorted

const barCodeScannerSettings = {
  barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
}

// eslint-disable-next-line react/prop-types
const Camera = React.forwardRef(({ onScan }, ref) => {
  const [cameraWidth, setCameraWidth] = useState(300)
  const [hasPermission, setPermission] = useState(false)

  const [ratio, setRatio] = useState({ desiredRatio: '4:3', realRatio: 4 / 3 })

  const askPermission = async () => {
    const { status } = await Expo.Camera.requestPermissionsAsync()
    setPermission(status === 'granted')
  }

  useEffect(() => {
    askPermission().then()
  }, [])

  const changeCameraWidth = event => {
    const { width } = event.nativeEvent.layout
    setCameraWidth(width)
  }

  if (hasPermission === null) {
    return <View />
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  // https://stackoverflow.com/questions/58634905/camera-preview-in-expo-is-distorted
  const setCameraReady = async () => {
    let desiredRatio = '4:3' // Start with the system default
    let realRatio = 4 / 3

    // if (Platform.OS === 'android') {
    //   console.log('ref', ref)
    //   const ratios = await ref.getSupportedRatiosAsync()

    //   for (const ratio of ratios) {
    //     const parts = ratio.split(':')
    //     const realRatio = parseInt(parts[0]) / parseInt(parts[1])

    //     if (realRatio < bestRatio && realRatio > 1) {
    //       bestRatio = realRatio
    //       desiredRatio = ratio
    //     }
    //   }
    // }

    setRatio({ desiredRatio, realRatio })
  }

  return (
    <View>
      <View
        style={{
          ...styles.cameraContainer,
          width: cameraWidth,
          height: cameraWidth,
        }}
        onLayout={changeCameraWidth}
      >
        <Expo.Camera
          ref={ref}
          style={{
            ...styles.camera,
            width: cameraWidth,
            height: cameraWidth * ratio.realRatio,
          }}
          type={Expo.Camera.Constants.Type.back}
          barCodeScannerSettings={barCodeScannerSettings}
          onBarCodeScanned={onScan}
          onCameraReady={setCameraReady}
          ratio={ratio.desiredRatio}
        />
      </View>
      <Text style={{ color: 'white' }}>{Expo.Camera.pictureSize}</Text>
    </View>
  )
})

// Camera.propTypes = {
//   onScan: PropTypes.func.isRequired,
//   ref: PropTypes.object,
// }

const styles = StyleSheet.create({
  cameraContainer: {
    borderRadius: 5,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Camera
