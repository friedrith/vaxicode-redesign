import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NativeRouter, Route, Link } from 'react-router-native'

import Scan from './src/components/pages/Scan.js'

export default () => (
  <NativeRouter>
    <Route exact path='/' component={Scan} />
  </NativeRouter>
)
