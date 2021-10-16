import React, { useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import call from 'react-native-phone-call'

export default function RequestAmbulance({navigation}) {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Accident', value: 'accident' },
        { label: 'Chest pain', value: 'chest_pain' },
        { label: 'Injury', value: 'Injury' },
        { label: 'Other', value: 'other' }
    ]);

    const args = {
        number: '0702475868',
        prompt: false
    }
    return (
        <View style={styles.container}>
            <View style={styles.ambulanceCard}>
                <Text style={styles.headText}>Request an Ambulance</Text>
                <View style={{ flexDirection: 'row' }}>

                    <Text style={{ marginTop: 10, fontSize: 15, paddingEnd: 10 }}>Condition:</Text>
                    <DropDownPicker
                        style={{ width: 180, }}
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                    />
                </View>
                <View style={{ flexDirection: 'row' }}>

                </View>
                <Pressable
                    style={styles.requestBtn}
                    onPress={() => {
                        call(args).catch(console.error);
                        console.log("Calling ambulance")
                    }}
                >
                    <Text>Request Now</Text>
                </Pressable>

            </View>
            <View style={styles.opdBox}>
                <Text style={styles.headText}>OPD</Text>
                <Text>Available Doctors:</Text>


                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <Text style={{ paddingTop: 5 }}>Patients in Queue:</Text>
                    <Pressable style={styles.opdButton}>
                        <Text>20</Text>
                    </Pressable>
                </View>
            </View>
        </View>


    )
}

const styles = StyleSheet.create({
    container: {

    },
    headText: {
        color: 'black',
        fontSize: 20,
    },
    ambulanceCard: {
        borderWidth: 2,
        borderColor: '#d4d4d4',
        margin: 30,
        backgroundColor: '#efefef',
        paddingVertical: 50,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    opdBox: {
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#d4d4d4',
        margin: 20,
        backgroundColor: '#efefef',
        paddingVertical: 50,
        paddingHorizontal: 20,
    },
    requestBtn: {
        width: 150,
        borderRadius: 8,
        marginTop: 20,
        backgroundColor: '#eb807c',
        paddingHorizontal: 20,
        paddingVertical: 15,

    },
    opdButton: {
        backgroundColor: '#5fbdff',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 5
    },
});