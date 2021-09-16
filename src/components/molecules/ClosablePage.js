import React from 'react'
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-native'
import { Header, Icon } from 'react-native-elements'

const ClosePage = ({ children }) => {
  const history = useHistory()

  const close = () => {
    history.goBack()
  }

  return (
    <View style={styles.container}>
      <Header
        placement='center'
        containerStyle={styles.header}
        backgroundColor='#16161a'
      >
        <></>
        <></>
        <TouchableWithoutFeedback onPress={close}>
          <Icon name='close-outline' size={30} type='ionicon' color='#fff' />
        </TouchableWithoutFeedback>
      </Header>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16161a',
  },
  header: {
    borderBottomColor: 'transparent',
    backgroundColor: '#16161a',
    display: 'flex',
    alignItems: 'center',
  },
})

ClosePage.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ClosePage
