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
  
  
 
 /* useEffect(() => {
    getTenantID();
});*/

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
    
    axios.get('https://aetc9mrrhb.execute-api.us-east-1.amazonaws.com/TESTING/Visit/Full/10',
    
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
    <View style = {styles.containerm}>

            <View style = {styles.container}>
            
              <Text style = {styles.title}>Radiology Reports with top bar</Text>
              {/* top bar to be added */}

              

            </View>
            
            <Text style = {styles.title2}>{'\t\t\t'}Radiology Report | Checked Date</Text>
            

          <View style = {styles.container2}>

          { <FlatList
    
                data={radiolgy.radiologyTests}
                renderItem={({item}) => <Text style = {styles.item}>{
                    radiolgy.radiologyTests.map((itemX) =>{
                    return itemX.name

                })
       
                 }{' \t | \t' } {
                    radiolgy.radiologyTests.map((itemX) =>{

                   
                    return moment(itemX.createdAt).format('MM.DD.YYYY')
                   

                })
       
                 }</Text>}
                 
    
            keyExtractor={item => item.id}
            /> 
                 
            }
            <View style = {styles.btns}>

                <Button style = {styles.btns} title="PDF" onPress={() => Alert.alert('')} />
                
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
         justifyContent:'flex-start',
   
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
   
    flexDirection: "column",
    backgroundColor: '#B3EEF3',
    justifyContent:'flex-start',
    alignContent: 'flex-end',
    alignSelf:'flex-end',
    
    
    width:100,
    
    
  },
  
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#48B1BD'
  },

  title2: {
    fontSize: 15,
    fontWeight: '600',
    color: '#48B1BD'
  },
});

export default viewRadiology;