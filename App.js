import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, TextInput, StatusBar } from 'react-native'

import CoinItem from './components/CoinItem';

const App = () => {

  const [coins, setCoins] = useState([]);

  const [search, setSearch] = useState(['']);

  const [refresh, setRefresh] = useState(false);

  const loadData = async () => {
    const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
    const data = await res.json();
    setCoins(data);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={style.container}>
      <StatusBar barStyle='light-content' backgroundColor='#141414' />
      <View style={style.header}>
        <Text style={style.title}>CryptoApp</Text>
        <TextInput onChangeText={text => setSearch(text)} placeholder="Search a coin" placeholderTextColor="#858585" style={style.searchInput} />
      </View>
      <FlatList
        style={style.list}
        data={
          coins.filter(coin => coin.name.toString().toLowerCase().includes(search.toLowerCase()) || coin.symbol.toString().toLowerCase().includes(search.toLowerCase()))
        }
        renderItem={({item}) => {
          return <CoinItem coin={item}/>
        }}
        showsVerticalScrollIndicator={false}
        refreshing={refresh}
        onRefresh={async () => {
          setRefresh(true);
          await loadData();
          setRefresh(false);
        }}
      />
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    backgroundColor: '#141414',
    alignItems: 'center',
    flex: 1,
    paddingTop: 20
  },
  title: {
    color: '#fff',
    marginTop: 10,
    fontSize: 20
  },
  list: {
    width: '90%'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 15
  },
  searchInput: {
    color: '#fff',
    borderBottomColor: '#4657CE',
    borderBottomWidth: 1,
    width: '40%',
    textAlign: 'center'
  }
});

export default App
