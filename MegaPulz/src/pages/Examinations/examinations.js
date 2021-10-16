import React,  {useState, useEffect,Component} from 'react'
import axios from 'axios';
import { backgroundColor, textColor } from 'styled-system'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import moment from 'moment';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { captureScreen } from 'react-native-view-shot';

import { 
  SafeAreaView,
  View,
  FlatList, 
  StyleSheet, 
  Text, 
  StatusBar,
  Button,
  Alert, 
  TouchableOpacity
} 
from 'react-native';


const renderItem = ({ item }) => (
  <Item title={item.title} />
);




const viewRadiology = () => {

  const [radiolgy, setRadio] = useState([]);
  const [radioValues, setRadioValues] = useState('');
  const [savedImagePath, setSavedImagePath] = useState('');
  
 
  useEffect(() => {
    getTenantID();
});

  useEffect(() => {
     // const visitCases = ;
      //getVisits(visitCases, visitValues);
      getRadiology();

    });

    const takeScreenShot = () => {
        // To capture Screenshot
        captureScreen({
          // Either png or jpg (or webm Android Only), Defaults: png
          format: 'jpg',
          // Quality 0.0 - 1.0 (only available for jpg)
          quality: 0.8, 
        }).then(
          //callback function to get the result URL of the screnshot
          (uri) => {
            setSavedImagePath(uri);
            setImageURI(uri);
          },
          (error) => console.error('Oops, Something Went Wrong', error),
        );

       
      };

      function onCapture(uri) {
        CameraRoll.saveToCameraRoll(uri);
      }
      

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
    
    axios.get('https://aetc9mrrhb.execute-api.us-east-1.amazonaws.com/TESTING/Visit/Patient2/12',
    
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
            
              <Text style = {styles.title}>EXAMINATIONS </Text>
              <Text style = {styles.title2}>"HAVE A REGULAR CHECK ON EXAMINATION REPORT"</Text>                       
            </View>
           <View style = {styles.container2}>
               {radiolgy.map((item, key)=> {
                   return(
                       <View key = {key}>
                           {item.exams.map((unit,key2) => {
                               return <Text style = {styles.text} key={key2}>{"\n"} 
                               
                               <FontAwesome5 name={'calendar-check'} size={20}/> DATE: {moment(unit.createdAt).format('MM.DD.YYYY')} {"\n\n"} 
                               <FontAwesome5 name={'weight'} size={20}/> WEIGHT:  {unit.weight} kg {"\n\n"}
                               <FontAwesome5 name={'long-arrow-alt-up'} size={20}/> HEIGHT:  {unit.height} cm {"\n\n"}
                               <FontAwesome5 name={'hand-holding-water'} size={20}/> BLOOD PRESSURE:  {unit.sysBP} mmHg {"\n\n"}
                               <FontAwesome5 name={'temperature-high'} size={20}/> BODY TEMPERATURE:  {unit.temp} °F {"\n\n"}
                               </Text>
                           })}
                           </View>
                   )
               })}
           </View>

           <View style={styles.container3}>
                <TouchableOpacity
                style={styles.buttonStyle}
                onPress={takeScreenShot}>
                <Text style={styles.buttonTextStyle}>
                    Take Screenshot
                </Text>
                </TouchableOpacity>
                <Text style={styles.textStyle}>
                {
                    savedImagePath ?
                    `Saved Image Path\n ${savedImagePath}` : ''
                }
                </Text>
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

  container3: {
    marginHorizontal: 10,
         //marginTop: 24,
         padding: 10,
         marginTop: 20,
  },

  text: {
    fontWeight: 'bold',
    color: '#48B1BD',
    fontSize: 18,
  },

  container2: {
    backgroundColor: '#BEEEF3',
    marginHorizontal: 10,
         marginTop: 5,
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

  title2: {
    fontSize: 12,
    color: 'red',
    textAlign: 'center',
  },

  textStyle: {
    textAlign: 'center',
    padding: 10,
  },
  buttonStyle: {
    fontSize: 30,
    color: 'white',
    backgroundColor: 'lightgreen',
    padding: 5,
    minWidth: 250,
  },
  buttonTextStyle: {
    padding: 5,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },

});

export default viewRadiology;