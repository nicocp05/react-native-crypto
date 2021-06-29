import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

const CoinItem = ({coin}) => {
    return (
        <View style={style.containerItem}>
            <View style={style.coinName} >
                <Image style={style.image}
                    source={{ uri: coin.image }} />
                <Text style={style.text}>{coin.name}</Text>
                <Text style={style.symbol}>{coin.symbol}</Text>
            </View>
            <View>
                <Text style={style.text}>$ {coin.current_price}</Text>
                <Text style={[style.pricePercentage, coin.price_change_percentage_24h > 0 ? style.priceUp : style.priceDown]}>{coin.price_change_percentage_24h}</Text>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    containerItem: {
        backgroundColor: '#121212',
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        color: '#fff',
        paddingLeft: 15,
        textAlign: 'right'
    },
    coinName: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: 30,
        height: 30
    },
    symbol: {
        color: '#434343',
        textTransform: 'uppercase',
        paddingLeft: 10
    },
    pricePercentage: {
        textAlign: 'right'
    },
    priceUp: {
        color: '#00B5B9'
    },
    priceDown: {
        color: '#FC4422'
    }
});

export default CoinItem
