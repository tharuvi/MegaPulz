import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View, Image, Pressable, Alert,SafeAreaView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import dashbord from './dashbicons';




const dashboard = ({navigation}) =>{


  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        keyExtractor = {(item) => item.id}
        numColumns={2}
        data={dashbord}
        renderItem={({item, index}) =>{
        
        return(

          <View 
          style={ styles.container}     
          >
          < Pressable onPress={() => 
          {
            if(item.id == 1){  
            Alert.alert("This feature is still on development");
            navigation.navigate('SearchAppoinments');
           
            
            }
            if(item.id == 2){  
              navigation.navigate('VisitsLists');
            }
            if(item.id == 3){  
              navigation.navigate('HealthRecords');
            }
            if(item.id == 4){  
              navigation.navigate('HealthDiagnosis');
            }
            if(item.id == 5){  
              navigation.navigate('SelectProfile');
              
            }
            if(item.id == 6){  
              navigation.navigate('RequestAmbulance');
             
            }

          }
          }>
          <Image source={{uri:item.imageUrl}} style={styles.image}></Image>
        
          <View > 
          <Text  style={styles.lable }>{item.pagename }</Text>
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
      color: "#00185E",
  
      elevation: 5,
    },

    flat:{
      
      flexDirection:'column',
      flex: 1,


    },
    lable: {
      color: "#00185E",
      fontSize:15,
      fontWeight:'bold',
      marginLeft:50,
    }


});

export default dashboard


