import React, { useRef, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Animated,
} from 'react-native'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import QRCode from 'react-native-qrcode-svg'
import RBSheet from 'react-native-raw-bottom-sheet'
import {
  PinchGestureHandler,
  TapGestureHandler,
  State,
} from 'react-native-gesture-handler'

import Button from 'components/atoms/Button'
import Immunization from 'components/molecules/Immunization'
import { removeProof } from 'redux/proofs'
import Icon from 'components/atoms/Icon'
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
    showDetails: 'Show details',
    deleteProof: 'Delete proof',
    delete: 'Delete',
    cancel: 'Cancel',
    immunizations: 'Immunizations',
    birthday: 'Birthday: ',
  },
  fr: {
    showDetails: 'Afficher les détails',
    deleteProof: 'Supprimer la preuve',
    delete: 'Supprimer',
    cancel: 'Annuler',
    immunizations: 'Immunisations',
    birthday: 'Date de naissance : ',
  },
})

const Proof = ({ proof, expanded = false }) => {
  const [isExpanded, expand] = useState(expanded)

  const [height] = useState(new Animated.Value(expanded ? 0.5 : 0))

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
    const { width } = event.nativeEvent.layout
    setContainerWidth(width)
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
              { transform: [{ rotate: interpolateRotating }] },
            ]}
          >
            <Icon name='chevron-down-outline' />
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
                      {tr('birthday')}
                      {i18n.toTime('date.formats.short', proof.birthDay)}
                    </Text>
                    {proof.immunizations.length > 0 ? (
                      <View>
                        <Text style={styles.immunizationsTitle}>
                          {tr('immunizations')}
                        </Text>
                        <FlatList
                          data={proof.immunizations}
                          renderItem={({ item }) => (
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
                    title={tr('deleteProof')}
                    small
                    icon={<Icon name='trash-outline' size={25} />}
                  />
                </View>
              </View>
            ) : (
              <View style={styles.showDetailsContainer}>
                <Button title={tr('showDetails')} small onPress={openFull} />
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
          title={tr('delete')}
          icon={<Icon name='trash-outline' size={25} />}
          onPress={onDelete}
          style={styles.confirmDeleteButton}
        />
        <Button
          title={tr('cancel')}
          onPress={() => {
            bottomPanel.current.close()
          }}
          icon={<Icon name='close-circle-outline' size={25} />}
          basic
        />
      </RBSheet>
    </View>
  )
}

const padding = 15

const styles = StyleSheet.create({
  container: {
    backgroundColor: backgroundColorHue1,
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
    color: primary,
    textAlign: 'left',
    fontFamily,
    flex: 1,
  },
  dateBirthday: {
    fontSize: 20,
    color: primaryHue1,
    textAlign: 'center',
    fontFamily,
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
    backgroundColor,
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
    color: primary,
    textAlign: 'left',
    fontFamily,
    paddingTop: 20,
    paddingBottom: 10,
  },
  protection: {
    backgroundColor: secondary,
    borderRadius: 10,
    padding: 20,
  },
  protectionTitle: {
    fontSize: 16,
    color: primary,
    textAlign: 'left',
    fontFamily,
    fontWeight: 'bold',
  },
  protectionDescription: {
    fontSize: 16,
    color: primary,
    textAlign: 'left',
    fontFamily,
  },
})

Proof.propTypes = {
  proof: PropTypes.shape({
    id: PropTypes.string.isRequired,
    birthDay: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    parsingFailed: PropTypes.bool,
    immunizations: PropTypes.arrayOf(PropTypes.shape({})),
    raw: PropTypes.string.isRequired,
  }).isRequired,
  expanded: PropTypes.bool.isRequired,
}

export default Proof
