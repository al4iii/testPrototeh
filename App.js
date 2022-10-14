import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LogBox} from 'react-native';
import {authAPI} from './src/api/api';
import Context from './src/context';
import Main from './src/screen/Main';
import Task1 from './src/screen/Task1';
import Task2 from './src/screen/Task2';
import Details from './src/screen/Details';

LogBox.ignoreAllLogs();
const Stack = createNativeStackNavigator();

function App() {
  const [data, setData] = React.useState([]);

  const response = async () => {
    let response = await authAPI.quotesList();
    setData(response);
  };
  
  React.useEffect(() => {
    response();
  }, []);
  return (
    <Context.Provider value={{data, setData}}>
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Main" component={Main} />
          <Stack.Screen name="Task1" component={Task1} />
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="Task2" component={Task2} />
        </Stack.Navigator>
      </NavigationContainer>
    </Context.Provider>
  );
}

export default App;
