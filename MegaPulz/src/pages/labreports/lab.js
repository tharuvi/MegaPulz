import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { Picker } from "@react-native-picker/picker";

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


const renderItem = ({ item }) => (
  <Item title={item.title} />
);



const viewRadiology = () => {

  const [radiolgy, setRadio] = useState([]);
  const [radioValues, setRadioValues] = useState('');
  
  
 
  useEffect(() => {
    getTenantID();
});

  useEffect(() => {
     // const visitCases = ;
      //getVisits(visitCases, visitValues);
      getRadiology();

    });

    const getTenantID = async () => {
      try {
          const value = await AsyncStorage.getItem('X-tenantID')
          if (value !== null) {
              setRadioValues(value);
              console.log("Tenant ID ", value)
          }
      } catch (e) {
          console.log("Error reading Tenant ID from Async Storage");
      }
  }

  ////api/////
  const getRadiology = () => {
    
    axios.get('https://aetc9mrrhb.execute-api.us-east-1.amazonaws.com/TESTING/Visit/Full/11',
    
    {
      headers: {
        'Authorization':'Basic aGlzOmhpczEyMzQ1',
        'X-tenantID' : 'D0001'
      }

    })
    .then(function (response){
     
        console.log(response.data);
        // console.log(map);
        setRadio(response.data);
        
        
    
    })
    .catch(function(error){
      console.log(error.message);
    })
    .finally(function(){
    });
    }

    if(!radiolgy) {
      return null;
    }
    

  
  
  //////end api//////
  return (
    <View >

            <View style = {styles.container}>
            
              <Text style = {styles.title}>Lab Reports {' \t | \t' } Tested Date</Text>

            </View>
            
           
            

          <View style = {styles.container2}>

          { <FlatList
    
                data={radiolgy.labTests}
                renderItem={({item}) => <Text style = {styles.item}>{
                    radiolgy.labTests.map((itemX) =>{
                    return itemX.name

                })
       
                 }{' \t \t | \t' } {
                    radiolgy.labTests.map((itemX) =>{

                   
                    return moment(itemX.createdAt).format('MM.DD.YYYY')
                   

                })
       
                 }</Text>}
                 
    
            keyExtractor={item => item.id}
            /> }

            <View style = {styles.btns}>

                 <Button title="Click To View The Report" onPress={() =>
                    
                    Alert.alert("Name: FBC",  "Lab Test ID: 1 \nService ID: 2\nStatus: Pending",   )
                    
                    
                    } />

             </View>

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
    color: '#4FC9D3',
    fontSize: 30,
  },
  
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#48B1BD',
    fontSize: 20,

  },
});

export default viewRadiology;