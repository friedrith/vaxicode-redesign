import React from 'react'

import { primary } from 'styles'
import * as NativeElements from 'react-native-elements'

const Icon = props => (
  <NativeElements.Icon size={30} type='ionicon' color={primary} {...props} />
)

export default Icon
