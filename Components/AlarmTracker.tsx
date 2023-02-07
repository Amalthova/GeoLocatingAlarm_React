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
  Geolocation.getCurrentPosition(info => console.log(info)); //Flipflop this when needed

};

// New data Storage system is async storage https://react-native-async-storage.github.io/async-storage/docs/usage/

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
  //   },    
  //   {
  //     id: 2,
  //     alarm_name: "CC",
  //     alarm_days: null,
  //     alarm_time: "09:15:00",
  //     alarm_latitude: 35.6579296, 
  //     alarm_longitude: 139.7276436,
  //     alarm_status: true
  //   }
  // ];
  
  // const [dateNow, setDateNow] = useState();
  // const [nextAlarm, setNextAlarm] = useState();
  const [currentLatitude, setCurrentLatitude] = useState();
  const [currentLongitude, setCurrentLongitude] = useState();

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
  
  
  const alarmGetter = () => {
    api.get('/api/alarms', {
      responseType: "json",
    })
    .then(function (response) {
      alarmList = response;
    })
  }

  const compareLocation = () => {
    if (alarmList[1].alarm_latitude - currentLatitude > 0.0000001 || alarmList[1].alarm_longitude - currentLongitude > 0.0000001) {
      alarmList[1].alarm_status = false;

      // api.put("/api/alarms/", {
      //   alarm_status
      // })

    } else {
      alarmList[1].alarm_status = true;
    }
  }
/*
  useEffect(() => {
    const interval = setInterval( async () => {
      await alarmGetter();
      await checkLocation();
      await compareLocation();
      await console.log(alarmList);
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);
*/

  // const alarmDisplay = async () => {
    
  //   await alarmGetter();

  //   for (let i = 0; i < alarmList.length; i++) {
  //     return (
  //       <div>
  //         <h4>{`Name: ${alarmList[i].alarm_name}`}</h4>
  //         <div>{`Time: ${alarmList[i].alarm_time}`}</div>
  //         <div>{`Latitude: ${alarmList[i].alarm_latitude}`}</div>
  //         <div>{`Longitude: ${alarmList[i].alarm_longitude}`}</div>
  //         <div>{`Status: ${alarmList[i].alarm_status}`}</div>
  //       </div>
  //     )
  //   }
  // }

  // setInterval(alarmGetter)
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
