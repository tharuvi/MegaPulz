import React from 'react'
import { View, Text, TextInput ,StyleSheet, Pressable, Image, Alert} from 'react-native'

const profile = () => {
  return (
    <View>
    <View style = {styles.unedits}>
      <Text style = {styles.lable}>Full Name :</Text>
      <TextInput style = {styles.txtIn}></TextInput> 
    </View>

    <View style = {styles.unedits}>
      <Text style = {styles.lable}>Age :</Text>
      <TextInput style = {styles.txtIn}></TextInput> 
    </View>

    <View style = {styles.unedits}>
      <Text style = {styles.lable}>Gender :</Text>
      <TextInput style = {styles.txtIn}></TextInput> 
    </View>

    <View style = {styles.editables}>
      <Text style = {styles.lable}>Mobile :</Text>
      <TextInput style = {styles.txtInEd}></TextInput> 
      <Pressable style={styles.editbtn} onPress={() => Alert.alert('edit')}>
      <Image source={{uri: "https://1.bp.blogspot.com/-kzPMKc9CRf0/YRW1mT_5oiI/AAAAAAAAAB0/qSo196OaIpQl_25ynMktXqR7OusPE5WGgCLcBGAsYHQ/s260/edit.png"}} style={{width: 30, height: 30}}/>
    </Pressable>
    </View>

    <View style = {styles.editables}>
      <Text style = {styles.lable}>Address :</Text>
      <TextInput style = {styles.txtInEd}></TextInput> 
      <Pressable style={styles.editbtn} onPress={() => Alert.alert('edit')}>
      <Image source={{uri: "https://1.bp.blogspot.com/-kzPMKc9CRf0/YRW1mT_5oiI/AAAAAAAAAB0/qSo196OaIpQl_25ynMktXqR7OusPE5WGgCLcBGAsYHQ/s260/edit.png"}} style={{width: 30, height: 30}}/>
    </Pressable>
    </View>

    <View style = {styles.editables}>
      <Text style = {styles.lable}>E-mail :</Text>
      <View style = {styles.editables}>
        <TextInput style = {styles.txtInEd}></TextInput> 
        <Pressable style={styles.editbtn} onPress={() => Alert.alert('edit')}>
            <Image source={{uri: "https://1.bp.blogspot.com/-kzPMKc9CRf0/YRW1mT_5oiI/AAAAAAAAAB0/qSo196OaIpQl_25ynMktXqR7OusPE5WGgCLcBGAsYHQ/s260/edit.png"}} style={{width: 30, height: 30}}/>
        </Pressable>
      </View>
      
    </View>

    





    </View>
    
  )
}

const styles = StyleSheet.create({
  
    unedits : {
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
        marginLeft : 10,
        marginRight: 50,
        height:40,
        width: 260,       
        borderWidth: 1, 
  },

  txtInEd : {
    backgroundColor: '#CDF2F7',
    color: '#0c213e',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft : 10,
    
    height:40,
    width: 260,       
    borderWidth: 1, 
    },

  

  
  editables : {
    flexDirection: 'row',
    alignItems:'center',

  },

  editbtn: {
      width: 30,
      height: 30,
      alignItems:'flex-end',
      marginRight: 15,


  },

  

  
})

export default profile
