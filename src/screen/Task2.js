import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import io from 'socket.io-client';
import {value} from '../context';

const Task2 = () => {
  const [data, setData] = React.useState(null);
  const [dataQuote, setDataQuote] = React.useState(null);

  React.useEffect(() => {
    let arr = [];
    const client = io('https://qrtm1.ifxdb.com:8443/');
    value.map(i => arr.push({symbol: i}));
    client.on('connect', () => client.emit('subscribe', value)); // Подписка на инструмент
    client.on('quotes', function (data) { // Получение котировок      
      setDataQuote(data.msg);
      arr.map((i, index) => i.symbol === data.msg.symbol && arr.splice(index, 1, data.msg));
      setData(arr);
    });
    return () => {
      client.off('connect');
      client.off('quotes');
      client.off('subscribe');
    };
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      {data ? (
        data.map((i, index) => (
          <View key={index} style={{borderTopWidth: 1, borderTopColor: '#ccc'}}>
            <View style={styles.item}>
              <Text style={styles.textStyle1}>{i.symbol}</Text>
              <Text style={styles.textStyle1}>{i.ask}</Text>
              <Text
                style={[
                  styles.textStyle2,
                  {color: i.change > 0 ? 'green' : 'red'},
                ]}>
                {i.change > 0 && '+'}
                {i.change ?? '-'}
              </Text>
              <Text
                style={[
                  styles.textStyle2,
                  {color: i.change > 0 ? 'green' : 'red'},
                ]}>
                {i.ask && i.change ? i.change > 0 && '+' : '-'}
                {i.ask && i.change && (100 / (i.ask / i.change)).toFixed(4)}
                {i.ask && i.change && '%'}
              </Text>
              <Text style={{color: i.change > 0 ? 'green' : 'red'}}>
                {i.change > 0 ? '▲' : '▼'}
              </Text>
            </View>
          </View>
        ))
      ) : (
        <ActivityIndicator size="large" />
      )}
    </View>
  );
};

export default Task2;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  textStyle1: {
    color: 'black',
    fontSize: 14,
    fontWeight: '700',
    width: '15%',
    marginHorizontal: '4%',
  },
  textStyle2: {
    fontSize: 14,
    fontWeight: '500',
    width: '18%',
    marginRight: '4%',
  },
});
