import { useState, useId } from 'react';

import api from '../index.js';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
export default function Inputform(props) {
  // const {
  //   alarmNameString,
  //   alarmTimeDate,
  //   alarmDaysString,
  //   alarmLatitudeDecimal,
  //   alarmLongitudeDecimal,
  //   alarmStatusBoolean
  // } = props;

  const id = useId();
  const [alarmNameString, setAlarmName] = useState();
  const [alarmDaysString, setAlarmDays] = useState(); //THe choice of days to repeat

  const [alarmTimeDate, setAlarmTime] = useState(); //Time

  const [alarmLatitudeDecimal, setAlarmLatitude] = useState();
  const [alarmLongitudeDecimal, setAlarmLongitude] = useState();
  const [alarmStatusBoolean, setAlarmStatus] = useState();

  const [geoLocationStatus, setGeoStatus] = useState(false);

  const geoLocationAvailabilityChecker = async () => {      //Geolocation
    if ("geolocation" in navigator) {
      console.log("Location Services are available");
      setGeoStatus(true);

      navigator.geolocation.getCurrentPosition( await function(position) {
        console.log(position);
        setAlarmLatitude(position.coords.latitude);
        setAlarmLongitude(position.coords.longitude);
        return position;
    })

    } else {
      console.log("Location Services are NOT available");
      setGeoStatus(false);
    }
  }

  async function createNewAlarm() {
  
  await geoLocationAvailabilityChecker();
  console.log(geoLocationStatus);
  console.log(id);

  console.log(alarmNameString);
  console.log(alarmTimeDate);
  console.log(alarmLatitudeDecimal);
  console.log(alarmLongitudeDecimal);

  setAlarmDays("None");
  setAlarmStatus(false);

  try{
    await api.post('/api/alarms', {
      alarm_name: alarmNameString,
      alarm_days: alarmDaysString,
      alarm_time: alarmTimeDate,
      alarm_latitude: alarmLatitudeDecimal,
      alarm_longitude: alarmLongitudeDecimal,
      alarm_status: alarmStatusBoolean
    })
    .then(res => {console.log(res)});

  } catch(error) {
    console.error(error.response.data);
  }

  } 

  return (
    <View >
      <form className="newAlarmForm">
        <input className="" type="text" placeholder="Alarm Name" value={ alarmNameString } onChange={(e) => setAlarmName(e.target.value)}></input>
        <input className="" type="time" placeholder="Alarm Time" value={ alarmTimeDate } onChange={(e) => setAlarmTime(e.target.value)}></input>
        <input name="" className="" type="checkbox" placeholder='monday'></input>
        <button className="" type="button" onClick={createNewAlarm}> Create Alarm </button>

      </form>
    </View>
  )
}