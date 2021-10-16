import React from 'react'
import { StyleSheet } from 'react-native'
import { View } from 'react-native'
import ImageLogo from '../../atoms/ImageLogo'
import Login from '../../molecules/Login'

const LoginPage = ({ userName, passWord }) => {
    return (
        <View style={style.root}>
            <ImageLogo imgUrl={require("../../../assets/images/Megapulz-Logo.png")} />
            <Login uName={userName} pWord={passWord} />
        </View>
    )
}

const style = StyleSheet.create({
    root: {
        alignItems: 'center',
    }
})

export default LoginPage
