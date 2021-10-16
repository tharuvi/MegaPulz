import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

import { 
  SafeAreaView,
  View,
  FlatList, 
  StyleSheet, 
  Text, 
  StatusBar, 
  Pressable
} 
from 'react-native';

const Item = ({ title }) => (
  
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);
const VisitsLists = ({navigation}) => {

  const [visits, setVisits] = useState([]);
  const [visitValues, setVisitValues] = useState('');
  const [clientPrimaryKey, setClientPrimaryKey] = useState('');

  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );

  useEffect(() => {
    
    getClientPrimaryKey();

  });

 /* useEffect(() => {
    getTenantID();
});*/

  useEffect(() => {
     // const visitCases = ;
      //getVisits(visitCases, visitValues);
      getVisits();

    });

 
    const getClientPrimaryKey = async () => {
      try {
          const value = await AsyncStorage.getItem('client_primary_key')
          if (value !== null) {
              setClientPrimaryKey(value);
              console.log("Client Primary Key ", value)
          }
      } catch (e) {
          console.log("Error reading Client Primary Key from Async Storage");
      }
    }
    const getTenantID = async () => {
      try {
          const value = await AsyncStorage.getItem('X-tenantID')
          if (value !== null) {
              setVisitValues(value);
              console.log("Tenant ID ", value)
          }
      } catch (e) {
          console.log("Error reading Tenant ID from Async Storage");
      }
  }

  ////api/////
  const getVisits = () => {
    
    axios.get('https://aetc9mrrhb.execute-api.us-east-1.amazonaws.com/TESTING/Visit/Patient2/'+
    clientPrimaryKey,
    
    {
      headers: {
        'Authorization':'Basic aGlzOmhpczEyMzQ1',
        'X-tenantID' : 'D0001'
      }

    })
    .then(function (response){
     
        console.log(response.data);
        setVisits(response.data);
    
    })
    .catch(function(error){
      console.log(error.message);
    })
    .finally(function(){

    });
    }

    if(!visits) {
      return null;
    }
  
  //////end api//////
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={visits}
        renderItem={({item}) => 
        <View>
        <Pressable

        onPress={() => {
        navigation.navigate('VisitDetails', { visits: item });
        }}
        >
         <Text style = {styles.item}>{item.complaint} {moment(item.visitDate).format('MM/DD/YYYY')} </Text>
        </Pressable>  
       
        </View>
        }
        keyExtractor={item => item.id}
       
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#BEEEF3',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius:25,
  },
  title: {
    fontSize: 20,
    color: '#48B1BD'
  },
});

export default VisitsLists;

