import React from 'react'
import { View, Text, Pressable, StyleSheet, Alert } from 'react-native'

const Button = ({ text }) => {
    return (
        <Pressable style={styles.loginButton} onPress={() => Alert.alert('tapped login')}>
            <Text style={styles.buttonText}> {text} </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    loginButton: {
        // marginTop: 50,
        backgroundColor: '#50a5b4',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 30,
        elevation: 3,
    },
    buttonText: {
        fontSize: 25,
    }
})

export default Button;
