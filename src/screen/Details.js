import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {authAPI} from '../api/api';

const Details = ({route}) => {
  const {symbol} = route.params;
  const [status, setStatus] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [keys, setKeys] = React.useState([]);

  const response = async () => {
    let res = await authAPI.quotesTick(symbol);
    setData(res);
    setStatus(0);
  };

  React.useEffect(() => {
    setStatus(1);
    symbol && response();
  }, [symbol]);

  React.useEffect(() => {
    let keys = [];
    for (const key in data) keys.push(key);
    setKeys(keys);
  }, [data]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ccc',
      }}>
      {!status ? (
        <View>
          {keys.map((i, index) => (
            <Text
              key={index}
              style={{
                fontSize: 32,
                color: 'black',
              }}>
              {i}: {data[i]}
            </Text>
          ))}
        </View>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </View>
  );
};

export default Details;
