import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View, Image, Pressable, Alert,SafeAreaView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import hRecords from './HealthRecordsicons';




const healthRecords = ({navigation}) =>{


  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        keyExtractor = {(item) => item.id}
        numColumns={2}
        data={hRecords}
        renderItem={({item, index}) =>{
        
        return(

          <View 
          style={ styles.container}     
          >
          < Pressable onPress={() => 
          {
            if(item.id == 1){  
            navigation.navigate('LabReports');
            
            }
            if(item.id == 2){  
              navigation.navigate('RadiologyReports');
              
            }
            if(item.id == 3){  
              navigation.navigate('ViewAllergies');
            }
            

          }
          }>
          <Image source={{uri:item.imageUrl}} style={styles.image}></Image>
        
          <View style={{  }}> 
          <Text  style={{marginLeft:35, marginTop:5}}>{item.pagename }</Text>
          </View>
          </Pressable>



      </View>
        );
        }}
      />
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column', 
    justifyContent:'space-between',
    height: 230,
    textAlign:'center',
    shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

  },

  image: {
    width: 150, 
    height: 150, 
    margin: 25,

  },
  item: {
      padding:4,
      flex: 1,
      maxWidth:'50%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      marginTop: 8,
      marginLeft: 18,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
  
      elevation: 5,
    },

    flat:{
      
      flexDirection:'column',
      flex: 1,


    },
    text: {
      color: 'orange',
      fontWeight:'bold'
    }


});

export default healthRecords


