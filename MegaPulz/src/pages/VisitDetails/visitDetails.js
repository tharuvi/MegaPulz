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
  Button,
  Alert 
} 
from 'react-native';


const VisitDetails = ({navigation}) => {

  const [visits, setVisits] = useState([]);
  const [visitValues, setVisitValues] = useState('');

  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );

 
 /* useEffect(() => {
    getTenantID();
});*/

  useEffect(() => {
     // const visitCases = ;
      //getVisits(visitCases, visitValues);
      getVisits();

    });

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
    
    axios.get('https://aetc9mrrhb.execute-api.us-east-1.amazonaws.com/TESTING/Visit/2',
    
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
    <View style = {styles.containerm}>

            <View style = {styles.container}>
            
              <Text style = {styles.title}>Visit overview</Text>
            </View>

          <View style = {styles.container2}>

          <Text style = {styles.item}> Details of Visit {visits.id}</Text>
          <Text style = {styles.item}> Date : {moment(visits.visitDate).format('MM.DD.YYYY')} </Text>
          <Text style = {styles.item}> Complaint : {visits.complaint} </Text>
          <Text style = {styles.item}> Doctor ID : {visits.doctor} </Text>
          <Text style = {styles.item}> Time : {moment(visits.visitDate).format('h:mm:ss a')} </Text>

          </View>

          <View style = {styles.btns}>

          <Button title="Prescription" onPress={() => navigation.navigate('ViewAllergies')} />
          <Button title="Examination" onPress={() => navigation.navigate('Examinations'/*, { visits: item }*/)} />
          <Button title="Visit List" onPress={() => navigation.navigate('VisitsLists'/*, { visits: item }*/)} />
          </View>

          
          

          </View>

    
  );
}

const styles = StyleSheet.create({
  container: {
    
    
    marginHorizontal: 10,
         //marginTop: 24,
         padding: 10,
    marginTop: StatusBar.currentHeight || 0,
  },

  container2: {
    backgroundColor: '#BEEEF3',
    marginHorizontal: 10,
         marginTop: 34,
         padding: 10,
   
  },
  containerm: { 
    
    marginBottom:20,
    height:'100%',


  },
  item: {
    backgroundColor: '#BEEEF3',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius:25,
    color: '#4FC9D3'
  },
  btns: {
    marginBottom:30,
    flexDirection: "row",
    
    justifyContent: 'space-around',
    padding:10,
    marginTop:150,

  },
  
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#48B1BD'
  },
});

export default VisitDetails;

