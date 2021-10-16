import React from 'react'
import { View, Text,StyleSheet } from 'react-native'

const stepCounter = () => {
    return (
        <View >
        <Text style = {styles.topic} > Today </Text>
        <Text style = {styles.scard1} > 2500 steps </Text> 
     
        <View style = {styles.dnm}>
        <Text style = {styles.scard3} > 2 Miles  </Text> 
        <Text style = {styles.scard4} > 36 Mins  </Text> 
        </View>
        <Text style = {styles.scard2} > 150 Calories Burned  </Text> 
      
        
        
      </View>
    )
}


const styles = StyleSheet.create({
    topic : {
      textAlign: 'center',
      fontSize :40,
      fontWeight :'bold',
      color : '#08052A',
      paddingBottom : 80,
      paddingTop : 50,
  
    },

    
    scard1 : {
    marginTop: 16,
    marginLeft :20,
    marginRight :20,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold"
      
    },
    
    scard2 : {
    marginTop: 50,
    marginLeft :20,
    marginRight :20,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
      
    },
  
    scard3 : {

    marginTop: 50,
    marginLeft:30,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"

    },

    scard4 : {
      
      marginTop: 50,
      marginRight : 30,
      paddingVertical: 8,
      borderWidth: 2,
      borderColor: "#20232a",
      borderRadius: 6,
      backgroundColor: "#61dafb",
      color: "#20232a",
      textAlign: "center",
      fontSize: 30,
      fontWeight: "bold"
  
      },

    dnm:{
      
      flexDirection: 'row',
      alignItems:'center',
      justifyContent: 'space-between'

      
      
    }
  })

export default stepCounter