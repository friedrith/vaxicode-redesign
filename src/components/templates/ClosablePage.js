import React from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-native'

import Page from 'components/templates/Page'
import Header from 'components/molecules/Header'
import Icon from 'components/atoms/Icon'

const ClosePage = ({ children }) => {
  const history = useHistory()

  const close = () => {
    history.goBack()
  }

  return (
    <Page>
      <Header>
        <></>
        <></>
        <TouchableWithoutFeedback onPress={close}>
          <Icon name='close-outline' />
        </TouchableWithoutFeedback>
      </Header>
      {children}
    </Page>
  )
}

ClosePage.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ClosePage
