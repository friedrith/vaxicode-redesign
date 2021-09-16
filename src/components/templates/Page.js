import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'

import { backgroundColor } from 'styles'

const Page = ({ children }) => <View style={styles.container}>{children}</View>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor,
  },
})

Page.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Page
