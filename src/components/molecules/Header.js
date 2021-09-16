import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import * as NativeElements from 'react-native-elements'

import { backgroundColor } from 'styles'

const Header = ({ children }) => (
  <NativeElements.Header
    placement='center'
    containerStyle={styles.header}
    backgroundColor={backgroundColor}
  >
    {children}
  </NativeElements.Header>
)

const styles = StyleSheet.create({
  header: {
    borderBottomColor: 'transparent',
    backgroundColor,
  },
})

Header.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Header
