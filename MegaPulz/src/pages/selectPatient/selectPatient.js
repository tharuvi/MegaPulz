import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Pressable, Alert, Button } from 'react-native'
import { Auth } from 'aws-amplify';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// const axios = require('axios').default;

export default function SelectProfile({ route, navigation, updateAuthState }) {

    const [patient, setPatient] = useState([]);
    const datas = route.params.patientData;




    async function signOut() {
        try {
            await Auth.signOut();

        } catch (error) {
            console.log("error signing out: '", error);
        }
    }

    const storeVetTenant = async (value) => {
        try {
            await AsyncStorage.setItem('vet_tenant', value)
        } catch (e) {
            console.error(e);
        }
    }

    const storeClientPrimaryKey = async (value) => {
    
        try {
            await AsyncStorage.setItem('client_primary_key', value);
        // console.log('Patient ID:'+ JSON.stringify(value));
        }
        catch (e) {
            console.error(e);

        }
    }

    return (

        <View style={styles.container} >

            <View style={styles.header}>
                <Text style={styles.headerText}>Select Patient Profile</Text>
            </View>

            <View >
                <FlatList
                    data={datas}
                    keyExtractor={result => result.id.toString()}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                style={styles.card}
                                onPress={() => {
                                    storeVetTenant(item.vetTenantId);
                                    storeClientPrimaryKey(JSON.stringify(item.clientPrimaryKey));
                                    navigation.navigate("Dashboard")

                                }}
                            >
                                <Text style={styles.cardTextHead}>{item.veterinaryName}</Text>
                                <Text style={styles.cardText}>Name : {item.name} ID: {item.id}</Text>
                                {/* <Text style={styles.cardText}>Gender : {item.gender}</Text> */}
                                {/* <Text style={styles.cardText}>Address : {item.address}</Text> */}

                                <Text style={styles.cardText}>Phone Number : {item.mobile}</Text>


                            </TouchableOpacity>
                        );
                    }}

                />
            </View>

            <View style={styles.bottomButtons}>

                <Pressable style={styles.button1} onPress={() => { navigation.navigate("SearchProfile") }}>
                    <Text style={styles.buttonText}>Search Patient</Text>
                </Pressable>
                <View style={styles.space}></View>
                <Pressable onPress={signOut} style={styles.button}>
                <Text style={styles.buttonText}>Sign out</Text>
                </Pressable>


                
            </View>

        </View >

    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#c9c9c9'
    },
    header: {
        backgroundColor: '#09233e',
        padding: 30,
        alignItems: 'center',
        borderBottomEndRadius: 30,
        borderBottomStartRadius: 30,
    },
    headerText: {
        color: '#3ab2c0',
        fontSize: 20,
        fontWeight: 'bold'


    },
    card: {
        backgroundColor: 'lightblue',
        padding: 20,
        margin: 15,
        borderRadius: 15,
        alignItems: 'center'
    },
    cardTextHead: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#09233e'
    },
    cardText: {
        fontSize: 16,
    },
    bottomButtons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        position: 'absolute',
        bottom: 25,
        left: 20,
        
    },
    button: {
        backgroundColor: '#09233e',
        padding: 20,
        paddingHorizontal: 50,
        borderRadius: 15,
        
    },

    button1: {
        backgroundColor: '#09233e',
        padding: 20,
        paddingHorizontal: 30,
        borderRadius: 15,
        
    },
    space: {
        paddingHorizontal: 30,
    },
    buttonText: {
        color: '#3ab2c0',
        fontWeight: 'bold'
    }
})

