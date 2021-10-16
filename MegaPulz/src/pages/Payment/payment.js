import React from 'react'
import { View, Text, TextInput ,StyleSheet, Pressable} from 'react-native'

const payment = () => {
  return (
    <View>


    
    <View style = {styles.cardNum}>
      <Text style = {styles.lable}>Card Number</Text>
      <TextInput style = {styles.txtIn}></TextInput> 
    </View>


    <View style = {styles.cardNum}>
      <Text style = {styles.lable}>Expiry Date</Text>
      <TextInput style = {styles.dateIn}></TextInput> 
      <Text style = {styles.lable}>/</Text>
      <TextInput style = {styles.dateIn}></TextInput> 
    </View>


    <View style = {styles.cardNum}>
      <Text style = {styles.lable}>CVV</Text>
      <TextInput style = {styles.txtIn}></TextInput> 
    </View>

    
    <Pressable onPress={() => Alert.alert('tapped pay')}>
        <Text style = {styles.saveCard}>Save Card Information</Text>
    </Pressable>


    <Pressable style={styles.payBtn} onPress={() => Alert.alert('tapped pay')}>
        <Text style={styles.buttonText}> Pay </Text>
    </Pressable>




    </View>
    
  )
}

const styles = StyleSheet.create({
  
  cardNum : {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },

  lable : {
    color: '#061a31',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
  },

  txtIn : {
        backgroundColor: '#CDF2F7',
        color: '#0c213e',
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft : 15,
        marginRight: 15,
        height:40,
        width: 260,       
        borderWidth: 1, 
  },

  dateIn : {
        backgroundColor: '#CDF2F7',
        color: '#0c213e',
        fontSize: 15,
        fontWeight: 'bold',
        marginLeft : 15,
        marginRight: 15,
        height:40,
        width: 80,
        borderWidth: 1,

  },

  payBtn : {
    backgroundColor: '#FF929A',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 30,
    width:150,
    elevation: 3,
    marginLeft: 250,
    alignItems: 'center',

  },

  saveCard : {
    marginTop : 30,
    marginBottom : 30,
  }

})

export default payment
