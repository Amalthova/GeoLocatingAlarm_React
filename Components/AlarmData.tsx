
import {useState, useEffect} from "react";
import api from '../index.js';
import React from 'react';
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  PermissionsAndroid,
} from 'react-native';

import Geolocation from '@react-native-community/geolocation';

//https://react-native-async-storage.github.io/async-storage/docs/usage/
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function storeData(inputAlarmObject){
  async (inputAlarmObject) => {
    try {
      const jsonValue = JSON.stringify(inputAlarmObject)
      await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
      // saving error
    }
  }
}

