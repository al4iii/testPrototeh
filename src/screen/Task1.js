import React from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Context from '../context';
import PaginationDot from 'react-native-animated-pagination-dot';

const Task1 = ({navigation}) => {
  const {data} = React.useContext(Context);
  const [curPage, setCurPage] = React.useState(0);
  const [search, setSearch] = React.useState('');
  const [dataDisplayed, setDataDisplayed] = React.useState(data);
  const pageRangeDisplayed = 20;

  const searchFilterFunction = text => {
    const newData = data.filter(data => data.symbol.toUpperCase().indexOf(text.toUpperCase()) > -1);
    setSearch(text);
    setCurPage(0);
    !text && setDataDisplayed(data);
    setDataDisplayed(newData);
  };

  function Item({item, onPress, backgroundColor, textColor}) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.item, backgroundColor]}>
        <Text style={{fontSize: 25, textColor}}>{item.symbol ?? ''}</Text>
        <Text style={{fontSize: 20, textColor}}>{item.description ?? ''}</Text>
      </TouchableOpacity>
    );
  }

  function renderItem({item, backgroundColor = '#708090', color = 'black'}) {
    return (
      <Item
        item={item}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
        onPress={() => navigation.navigate('Details', {symbol: item.symbol})}
      />
    );
  }

  function Search() {
    return (
      <View style={{flex: 1, paddingBottom: 50}}>
        <View style={{
            backgroundColor: '#ccc',
            paddingHorizontal: 8,
            marginTop: 20,
          }}>
          <TextInput
            style={styles.textInputStyle}
            onChangeText={text => searchFilterFunction(text)}
            value={search}
            underlineColorAndroid="transparent"
            placeholder="Search"
          />
        </View>
      </View>
    );
  }

  function Error() {
    return (
      <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 200,
        }}>
        <Text style={{fontSize: 20}}>{'Nothing found'}</Text>
      </View>
    );
  }

  function Content() {
    return (
      <View style={{justifyContent: 'flex-start'}}>
        {Search()}
        {dataDisplayed.length ? (
          <View style={{marginVertical: 16, marginTop: 40}}>
            <View style={{
                paddingHorizontal: 16,
                paddingBottom: 10,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>
                {`page ${curPage + 1}/${Math.ceil(dataDisplayed.length / pageRangeDisplayed )}`}
              </Text>
            </View>
            {dataDisplayed.length / pageRangeDisplayed > 1 && (
              <View style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => setCurPage(curPage - 1)}
                  style={{paddingRight: 20}}
                  disabled={curPage === 0}>
                  <Text>{'prev'}</Text>
                </TouchableOpacity>
                <PaginationDot
                  curPage={curPage}
                  maxPage={Math.ceil(dataDisplayed.length / pageRangeDisplayed) - 1}
                  sizeRatio={1.8}
                  activeDotColor={'#5EB5CB'}
                />
                <TouchableOpacity
                  onPress={() => setCurPage(curPage + 1)}
                  style={{paddingLeft: 20}}
                  disabled={curPage === Math.ceil(dataDisplayed.length / pageRangeDisplayed) - 1}>
                  <Text>{"next"}</Text>
                </TouchableOpacity>
              </View>
            )}
            <View style={{marginTop: 16}}>
              <FlatList
                data={dataDisplayed.slice(curPage * pageRangeDisplayed, curPage * pageRangeDisplayed + pageRangeDisplayed)}
                renderItem={renderItem}
                keyExtractor={item => item.symbol}
                ref={r => (refs = r)}
                navigation={navigation}
              />
            </View>
          </View>
        ) : (
          Error()
        )}
      </View>
    );
  }

  React.useEffect(() => {
    data.length && setDataDisplayed(data);
  }, [data]);

  return (
    <SafeAreaView style={[styles.container, !data.length && {justifyContent: 'center', alignItems: 'center'}]}>
      {data.length ? Content() : <ActivityIndicator size="large" />}
    </SafeAreaView>
  );
};


export default Task1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
  },
  item: {
    shadowColor: '#000',
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 22,
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#708090',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
});