import {useState, useEffect} from "react";
//import api from '../index.js';
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
// This module is intended to track the alarms themselves and compare the data.

//Permissions function taken from https://reactnative.dev/docs/permissionsandroid.html
const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Cool GeoLocation Permission',
        message:
          'We need access to geolocation data to activate some of your alarms ' +
          'This is for Fine Location data. This data is not sent anywhere.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the geo-locating features!');
    } else {
      console.log('Ok, this app will not use your geo-location data');
    }
  } catch (err) {
    console.warn(err);
  }
};

//Geolocation.setRNConfiguration(config);

const getCurrentPosition = () => {
  Geolocation.getCurrentPosition(info => console.log(info)); //Does not work on emulator.

};

export default function AlarmTracker() {
  const [alarmList, setAlarmList]= useState([]);

  // let alarmList = [
  //   {
  //     "id": "1",
  //     "alarm_name": "Greenwich",
  //     "alarm_days": "null",
  //     "alarm_time": "00:00:00",
  //     "alarm_latitude": "51.48257660",
  //     "alarm_longitude": "-0.00765890",
  //     "alarm_status": "false"
  //     "alarm_geo_status": "true"
  //   },
  //   {
  //     "id": "2",
  //     "alarm_name": "Greenwich",
  //     "alarm_days": "null",
  //     "alarm_time": "00:00:00",
  //     "alarm_latitude": null,
  //     "alarm_longitude": null,
  //     "alarm_status": false
  //     "alarm_geo_status": false
  //   },
  //   {
  //     id: 3,
  //     alarm_name: "CC",
  //     alarm_days: null,
  //     alarm_time: "09:15:00",
  //     alarm_latitude: 35.6579296, 
  //     alarm_longitude: 139.7276436,
  //     alarm_status: true
  //     alarm_geo_status: true
  //   }
  // ];
  
  // const [dateNow, setDateNow] = useState();
  // const [nextAlarm, setNextAlarm] = useState();
  const [currentLatitude, setCurrentLatitude] = useState();
  const [currentLongitude, setCurrentLongitude] = useState();
  
//https://github.com/michalchudziak/react-native-geolocation
  function GetCurrentLocationExample() {
    const getCurrentPosition = () => {
      Geolocation.getCurrentPosition(
        (pos) => {
          setPosition(JSON.stringify(pos));
        },
        (error) => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
        { enableHighAccuracy: true }
      );
    };
  }
  const [position, setPosition] = useState<string | null>(null);

  //style={styles.title}
  return (
    <View>
      <Text>Hello from alarm tracker</Text>
      <Text>
        <Text> Current position: </Text> 
        {position}
      </Text>
      <Button 
      onPress={getCurrentPosition}
      title="Get Current Position" 
      
      />
      <View >
        <Text >Try permissions</Text>
        <Button title="request permissions" onPress={requestLocationPermission} />
      </View>
      
      {/* {alarmDisplay} */}

      {/* <div>
        {alarmList.map((entry)=>
          <ul>
            <h4>{`Name:  ${entry.alarm_name}`}</h4>
            <div>{`Time: ${entry.alarm_time}`}</div>
            <div>{`Latitude: ${entry.alarm_latitude}`}</div>
            <div>{`Longitude: ${entry.alarm_longitude}`}</div>
            <div>{`Status: ${entry.alarm_status}`}</div>
          </ul>
        )}
      </div> */}
    </View>
  )
};
