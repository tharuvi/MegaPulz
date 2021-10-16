import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Button from '../../atoms/Button';
import TextField from '../../atoms/TextField';

const Login = ({ uName, pWord }) => {

    const [text, onChangeText] = React.useState("");
    const [ptext, onChangePText] = React.useState("");
    return (
        <View style={styles.root}>
            <Text style={styles.loginText}>Login</Text>
            <TextField text={uName} changeText={onChangeText} secureTextEntry={false} />
            <TextField text={pWord} changeText={onChangePText} secureTextEntry={true} />
            <View style={styles.inline}>
                <Text style={styles.blueText}>New here?  <Text style={styles.regsiterText}>Register now</Text></Text>
                {/* link for forgeting password */}
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </View>
            <View style={{ marginTop: 20 }}>
                <Button text="Login" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#e6f2f2'

    },
    loginText: {
        color: '#061a31',
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
    },
    textBox: {
        backgroundColor: '#0c213e',
        color: '#50a5b4',

        fontSize: 22,
        fontWeight: 'bold',
        // height: 50,
        width: 300,
        marginVertical: 10,
        paddingLeft: 30,

        borderWidth: 1,
        borderRadius: 8,
    },
    password: {
        textDecorationStyle: 'dotted',
    },
    inline: {
        marginHorizontal: 30,
        width: 300,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    blueText: {
        color: '#50a5b4',
    },
    regsiterText: {
        color: 'black',
        textDecorationLine: 'underline',
    },
    forgotPassword: {
        color: '#50a5b4',
        textDecorationLine: 'underline',
    },
    loginButton: {
        marginTop: 50,
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

});

export default Login
