import React, { useState } from 'react'
import { View } from 'react-native'
import { Input } from 'react-native-elements'
import { styles } from "./InfoForm.styles"
import { MapForm } from './MapForm'

export function InfoForm({ formik }) {
    const [showMap, setShowMap] = useState(false)
    const onOpenCloseMap = () => {
        setShowMap(prev => !prev)
    }

    return (
        <>
            <View style={styles.content}>
                <Input placeholder='Nombre del restaurante'
                    onChangeText={(text) => formik.setFieldValue("name", text)}
                    errorMessage={formik.errors.name}
                />
                <Input placeholder='Dirección del restaurante'
                    rightIcon={{
                        type: "material-community",
                        name: "map-marker-radius",
                        color: getColorIconMap(formik),
                        onPress: onOpenCloseMap
                    }}
                    onChangeText={(text) => formik.setFieldValue("address", text)}
                    errorMessage={formik.errors.address}
                />
                <Input placeholder='Teléfono del restaurante'
                    onChangeText={(text) => formik.setFieldValue("phone", text)}
                    errorMessage={formik.errors.phone}
                />
                <Input placeholder='Email del restaurante'
                    onChangeText={(text) => formik.setFieldValue("email", text)}
                    errorMessage={formik.errors.email}
                />
                <Input placeholder='Descripción del restaurante'
                    multiline={true}
                    inputContainerStyle={styles.textarea}
                    onChangeText={(text) => formik.setFieldValue("description", text)}
                    errorMessage={formik.errors.description}
                />
            </View>
            <MapForm show={showMap} close={onOpenCloseMap} formik={formik} />
        </>
    )
}

const getColorIconMap = (formik) => {
    if (formik.errors.location) return "#ff0000"

    if (formik.values.location) return "#00a680"

    return "#c2c2c2"
}