import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert, StyleSheet, Text, TextInput, View,Button } from 'react-native'

export default function searchProfile({navigation}) {

    const [patientResult, setPatient] = useState('');
    const [hin, setHIN] = useState('');
    const [phoNo, setPhoNO] = useState('');
    

    const searchPatientProfile = (phoNo , hin) => {

        axios
        .get('https://aetc9mrrhb.execute-api.us-east-1.amazonaws.com/TESTING/Patient/PatientHIN/'+hin+'/PhoneNo/'+phoNo,
        {
            headers : {
                'Authorization': 'Basic aGlzOmhpczEyMzQ1',
                'X-tenantID': 'D0001'
            }
        }  
        )
        .then(function (response){

            console.log(response);
            if(!response.data || response.data.length == 0) {
                console.log("No patient Availble");
                Alert("No patient Availble");
            }
            else{
                console.log("Patient Available" + JSON.stringify(response.data));
                setPatient(response.data);
                navigation.navigate('AddNewPatient', { patientResult : response.data });
              
            }

        }

        )
        .catch(function (error) {

                alert(error.message);
            })
            .finally(function () {

            });

    }




    return (
        <View>
            <Text style={styles.header}>Please Enter your contact Number and the HIN</Text>

            <View >
                <Text style={styles.lables}>Enter the Mobile Number</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setPhoNO}
                    value={phoNo}
                    placeholder="07X-xxxxxxx"
                    keyboardType="numeric"
                />
            </View>

            <View >
                <Text style={styles.lables}>Enter your HIN</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setHIN}
                    value={hin}
                    placeholder="D00XXXXXXXX"
                />
            </View>

            <Button
                title="Search"
                color="#00185E"
                accessibilityLabel="Learn more about this purple button"
                style={styles.Button}
                onPress={() => {

                    if (!hin && !phoNo) {
                        alert("Please fill all the fields!")
                        return;
                    }
                    if (hin == 0 || hin == null) {
                        alert("Please Enter Client ID!")
                    } if (phoNo == 0 || phoNo == null) {
                        alert("Please enter mobile number!")
                    }
                    else if (hin && phoNo) {
                        searchPatientProfile(phoNo, hin)
                    }

                }
                }

            />

        </View>
    )
}

const styles = StyleSheet.create({

    header: {
        fontSize: 24,
        fontWeight: '600',
        marginTop: 50,
        marginBottom: 50,

    },

    lables: {
        fontSize: 20,
        marginBottom: 20,

    },
    Button: {
        marginTop: 100,
        width: 40,
        color: 'red',

    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        marginBottom: 20,

    }
})
