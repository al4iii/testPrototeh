import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from './src/screen/Main';
import Details from './src/screen/Details';
import {LogBox} from 'react-native';
import {authAPI} from './src/api/api';
import Context from './src/context';

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
          <Stack.Screen
            name="Main"
            component={Main}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
      </NavigationContainer>
    </Context.Provider>
  );
}

export default App;
