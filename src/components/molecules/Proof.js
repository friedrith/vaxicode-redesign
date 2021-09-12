import React, { useRef, useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Animated,
} from 'react-native'
import { useDispatch } from 'react-redux'

import { Icon } from 'react-native-elements'
import QRCode from 'react-native-qrcode-svg'
import RBSheet from 'react-native-raw-bottom-sheet'
import {
  PinchGestureHandler,
  TapGestureHandler,
  State,
} from 'react-native-gesture-handler'

import Button from '../atoms/Button'
import Immunization from '../molecules/Immunization'
import { removeProof, isParsed } from '../../redux/proofs'

const getWidth = (width, minWidth, isZoomed) => {}

export default ({ proof, expanded = false }) => {
  const [isExpanded, expand] = useState(expanded)

  const [height, setHeight] = useState(new Animated.Value(expanded ? 0.5 : 0))

  const [containerWidth, setContainerWidth] = useState(300)
  const [isZoomed, setZoom] = useState(false)

  const coeff = isZoomed ? 1 : 0.7

  const qrCodeWidth = Math.max(coeff * containerWidth, 150)

  const [isFullExpanded, setFullExpand] = useState(false)
  const bottomPanel = useRef()
  const dispatch = useDispatch()

  const toggle = () => {
    Animated.timing(height, {
      toValue: isExpanded ? 0 : 0.5,
      duration: 250,
      useNativeDriver: false,
    }).start(() => {
      setFullExpand(false)
    })

    expand(!isExpanded)
  }

  const openFull = () => {
    Animated.timing(height, {
      toValue: 1,
      duration: 250,
      useNativeDriver: false,
    }).start(() => {
      setFullExpand(true)
    })
  }

  const onDelete = () => {
    dispatch(removeProof(proof))
  }

  const onAskDeleteConfirmation = () => {
    bottomPanel.current.open()
  }

  const interpolateRotating = height.interpolate({
    inputRange: [0, 0.5],
    outputRange: ['0deg', '180deg'],
  })

  const interpolateHeight = height.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 400, 800],
  })

  const changeContainerWidth = event => {
    const { x, y, width, height } = event.nativeEvent.layout
    setContainerWidth(width)
  }

  const zoom = () => {
    // setZoomed(!isZoomed)
  }

  const onPinchGestureEvent = event => {
    setZoom(event.nativeEvent.scale > 1)
  }

  const onDoubleTapGestureEvent = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setZoom(!isZoomed)
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggle}>
        <View style={styles.header}>
          <Text style={styles.title}>{proof.name}</Text>
          <Animated.View
            style={[
              styles.animation,
              // { opacity: fadeAnim },
              { transform: [{ rotate: interpolateRotating }] },
            ]}
          >
            <Icon
              name='chevron-down-outline'
              size={30}
              type='ionicon'
              color='#fff'
            />
          </Animated.View>
        </View>
      </TouchableOpacity>
      <Animated.View style={[styles.content, { height: interpolateHeight }]}>
        <View style={styles.innerContent}>
          <View style={styles.qrCodeContainer} onLayout={changeContainerWidth}>
            <TapGestureHandler
              numberOfTaps={2}
              onHandlerStateChange={onDoubleTapGestureEvent}
            >
              <PinchGestureHandler onHandlerStateChange={onPinchGestureEvent}>
                <View>
                  <QRCode
                    value={proof.raw}
                    size={qrCodeWidth}
                    logoSize={qrCodeWidth}
                    logoMargin={0}
                  />
                </View>
              </PinchGestureHandler>
            </TapGestureHandler>
          </View>
          <View style={styles.button}>
            {isFullExpanded ? (
              <View>
                {!proof.parsingFailed ? (
                  <View>
                    <Text style={styles.dateBirthday}>
                      Birthday: {proof.birthDay}
                    </Text>
                    {/* <Text style={styles.immunizationsTitle}>Protection</Text>
                    <View style={styles.protection}>
                      <Text style={styles.protectionTitle}>
                        Fully protected
                      </Text>
                      <Text style={styles.protectionDescription}>
                        {immunizations.length >= 2 ? 'two doses of vaccin' : ''}
                      </Text>
                    </View> */}
                    {proof.immunizations.length > 0 ? (
                      <View>
                        <Text style={styles.immunizationsTitle}>
                          Immunization
                        </Text>
                        <FlatList
                          data={proof.immunizations}
                          renderItem={({ item, index }) => (
                            <Immunization immunization={item} />
                          )}
                        />
                      </View>
                    ) : null}
                  </View>
                ) : null}

                <View style={styles.buttonDeleteContainer}>
                  <Button
                    onPress={onAskDeleteConfirmation}
                    title='Delete proof'
                    small
                    icon={
                      <Icon
                        name='trash-outline'
                        size={25}
                        type='ionicon'
                        color='#fffffe'
                      />
                    }
                  />
                </View>
              </View>
            ) : (
              <View style={styles.showDetailsContainer}>
                <Button title='Show details' small onPress={openFull} />
              </View>
            )}
          </View>
        </View>
      </Animated.View>
      <RBSheet
        ref={bottomPanel}
        openDuration={250}
        customStyles={{ container: styles.bottomPanel }}
      >
        <Button
          title='Delete'
          icon={
            <Icon
              name='trash-outline'
              size={25}
              type='ionicon'
              color='#fffffe'
            />
          }
          onPress={onDelete}
          style={styles.confirmDeleteButton}
        />
        <Button
          title='Cancel'
          onPress={() => {
            bottomPanel.current.close()
          }}
          icon={
            <Icon
              name='close-circle-outline'
              size={25}
              type='ionicon'
              color='#fffffe'
            />
          }
          basic
        />
      </RBSheet>
    </View>
  )
}

const padding = 15

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#242629',
    borderRadius: 7,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    padding: padding,
  },
  animation: {},
  title: {
    fontSize: 25,
    color: '#fffffe',
    textAlign: 'left',
    fontFamily: 'Jost-Medium',
    flex: 1,
  },
  dateBirthday: {
    fontSize: 20,
    color: '#72757e',
    textAlign: 'center',
    fontFamily: 'Jost-Medium',
  },
  icon: {
    transform: [{ rotate: '0deg' }],
  },
  iconExpanded: {
    transform: [{ rotate: '180deg' }],
  },
  content: {
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
  innerContent: {
    paddingLeft: padding,
    paddingRight: padding,
    paddingBottom: padding,
  },
  qrCodeContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    paddingTop: 10,
  },
  showDetailsContainer: {
    paddingTop: 10,
  },
  bottomPanel: {
    padding: 20,
    backgroundColor: '#16161a',
    display: 'flex',
    flexDirection: 'column',
  },
  confirmDeleteButton: {
    marginBottom: 20,
  },
  buttonDeleteContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 10,
  },
  immunizationsTitle: {
    fontSize: 20,
    color: '#fffffe',
    textAlign: 'left',
    fontFamily: 'Jost-Medium',
    paddingTop: 20,
    paddingBottom: 10,
  },
  protection: {
    backgroundColor: '#2cb67d',
    borderRadius: 10,
    padding: 20,
  },
  protectionTitle: {
    fontSize: 16,
    color: '#fffffe',
    textAlign: 'left',
    fontFamily: 'Jost-Medium',
    fontWeight: 'bold',
  },
  protectionDescription: {
    fontSize: 16,
    color: '#fffffe',
    textAlign: 'left',
    fontFamily: 'Jost-Medium',
  },
})
