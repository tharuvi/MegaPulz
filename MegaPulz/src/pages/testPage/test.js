import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert, StyleSheet, Text, TextInput, View,Button,Image,FlatList } from 'react-native'

export default function DocList({navigation}) {

    const [images, setimages] = useState([
        require('./assets/images/appointments.png'),
        require('./assets/images/appointments.png'),
        require('./assets/images/appointments.png'),
        require('./assets/images/appointments.png'),

      ]);




    return (
        <View>
             <FlatList
                horizontal={true} 
                showsHorizontalScrollIndicator={false} 
                data={images}
                renderItem={ ({ item, index }) => (
                <Image source={item} /* Use item to set the image source */
                key={index} /* Important to set a key for list items,
                       but it's wrong to use indexes as keys, see below */
        style={{
          width:260,
          height:300,
          borderWidth:2,
          borderColor:'#d35647',
          resizeMode:'contain',
          margin:8
        }}
      />
    )}
  />

           

        </View>
    )
}

const styles = StyleSheet.create({

    header: {
        fontSize: 24,
        fontWeight: '600',
        marginTop: 50,
        marginBottom: 50,

    },

    lables: {
        fontSize: 20,
        marginBottom: 20,

    },
    Button: {
        marginTop: 100,
        width: 40,
        color: 'red',

    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        marginBottom: 20,

    }
})
