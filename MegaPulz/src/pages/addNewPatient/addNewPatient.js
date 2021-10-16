import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View,Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Amplify, { Auth } from 'aws-amplify';
import axios from 'axios';

export default function addNewPatient({ route, navigation })  {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [age, setAge] = useState('');
    const [awsInfo, setAwsInfo] = useState([]);

    const { patientResult } = route.params;


    useEffect(() => {
        getAwsInfo();
    }, []);


    const storeTenantID = async () => {
        try {
            await AsyncStorage.setItem('Tenant_ID','D0001')
        } catch (e) {
           
        }
    }


    const storeWACiD = async (value) => {
        try {
            await AsyncStorage.setItem('patient_ID',value)
        } catch (e) {
           
        }
    }


    const getAwsInfo = async () => {
       let aID = await Auth.currentUserInfo();
       setAwsInfo(aID);
       console.log("Client AWS info ", JSON.stringify(aID));
    }

    const createNewPatient = () => {
        
        axios.post('https://1gedxwzv7b.execute-api.us-east-1.amazonaws.com/TESTING/WebAppCustomer',{
            
            "webAppCustomer": {
                "name": patientResult.fullName,
                "vetTenantId": "D0001   ",
                "clientStringId": patientResult.hin,
                "clientPrimaryKey": patientResult.id,
                "mobile": patientResult.telephone,
                "email": awsInfo.email,
                "awsId": awsInfo.id,
                "veterinaryName": "MegaPulz"
              }
        },
        {
            headers: {
                'Authorization': 'Basic aGlzOmhpczEyMzQ1',
                'X-tenantID': 'D0001'
            }
        }
            
        
        )
        .then(function (response) {

            console.log(JSON.stringify(response.data))
            storeWACiD(JSON.stringify(patientResult.id));


            navigation.navigate('SelectProfile');

        })
        .catch(function (error) {

            alert(error.message);
        });
    }
    //need to add indicator  (setAnimating)



    
        return (
            <View>
                <Text style = {styles.header}> Please Confirm your details </Text>

                <View style={styles.containerC}>


                            <Text style = {styles.results}>Name :{JSON.stringify(patientResult.fullName)}</Text> 
                            <Text style = {styles.results}>Gender :{JSON.stringify(patientResult.gender)}</Text>
                            <Text style = {styles.results}>Address :{JSON.stringify(patientResult.address)}</Text>
                            <Text style = {styles.results}>HIN :{JSON.stringify(patientResult.hin)}</Text>
                            <Text style = {styles.results}>Phone Numer :{JSON.stringify(patientResult.telephone)}</Text>
                            <Text style = {styles.results}>Phone Numer :{JSON.stringify(awsInfo.id)}</Text>
                          


                </View>

                <Button
                onPress={() =>{
                    createNewPatient();
                    Alert.alert('Customer '+ JSON.stringify(patientResult.fullName) +'s Profile Created')
                    navigation.navigate('VisitLists'/*, { visits: item }*/)
                }}
                title="Confirm"
                accessibilityLabel="Confirm your profile details"
                />


                

            </View>
        )
    
}

const styles = StyleSheet.create({

    header: {
        fontSize: 20,
        fontWeight: '600',
        color: "#00185E"

    },

   
    Button: {
        marginBottom:30,
        justifyContent: 'space-around',
        padding:10,
        marginTop:150,

    },
    
    containerC: {
        backgroundColor: '#BEEEF3',
        marginHorizontal: 10,
        marginTop: 34,
        padding: 10,
        marginBottom:50,

       
      },
      results: {
        backgroundColor: '#BEEEF3',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius:25,
        color: "#00185E",
       

      },
})
