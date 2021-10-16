import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

export type Props = {
    text: string;
    onChangeText: string;
    secureTextEntry: boolean;
}

const TextField: React.FC<Props> = ({
    text,
    onChangeText,
    secureTextEntry
}) => {
    return (
        <TextInput style={styles.textBox} value={text} changeText={onChangeText} secureTextEntry={secureTextEntry} />
    )
}

const styles = StyleSheet.create({
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
    }
})

export default TextField
