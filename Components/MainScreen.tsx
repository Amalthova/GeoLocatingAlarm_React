import { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
//import '../styles/App';
import Inputform from "../Components/InputForm";
import AlarmTracker from "../Components/AlarmTracker"

function App() {
  const [dateNow, setDate] = useState(new Date());

  useState(() => {

    //Create clock that updates
    const currentDateAndTime = setInterval(() => {
      setDate(new Date()); 
    }, 1 * 1000);
    return () => {
      clearInterval(currentDateAndTime);
    };
  });

  return (
    <View>
      <Text>This should be above current time element</Text>
      <Text>{`${ dateNow }`}</Text>
      <Text>This should be below the current time element</Text>
      <AlarmTracker></AlarmTracker>
      <Text>Should be below alarm list</Text>
      {/* <Inputform></Inputform> */}
      <Text>Should replace input form with button prompt to open it.</Text>
    </View>
  );
}

export default App;
