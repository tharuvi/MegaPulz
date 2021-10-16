import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

const ImageLogo = ({ imgUrl }) => {
    return (
        <Image style={styles.imageLogo} source={imgUrl} />
    )
}

const styles = StyleSheet.create({
    imageLogo: {
        width: 200,
        height: 100,
    }
})

export default ImageLogo
