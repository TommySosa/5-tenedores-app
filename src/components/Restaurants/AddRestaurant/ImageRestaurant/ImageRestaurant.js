import React from 'react'
import { View } from 'react-native'
import { styles } from './ImageRestaurant.styles'
import { Image } from 'react-native-elements'

export function ImageRestaurant({ formik }) {
    const principalImage = formik.values.images[0]

    return (
        <View style={styles.content} >
            <Image
                source={principalImage ? { uri: principalImage } : require('../../../../../assets/img/no-image.png')}
                style={styles.img}
            />
        </View>
    )
}