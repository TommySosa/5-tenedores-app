import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Text, Button } from 'react-native-elements'
import { styles } from './BtnReviewForm.styles'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useNavigation } from '@react-navigation/native'
import { screen } from "../../../utils"
import { query, collection, where, onSnapshot } from 'firebase/firestore'
import { size } from 'lodash'
import { db } from '../../../utils'

export function BtnReviewForm({ idRestaurant }) {
    const auth = getAuth()
    const [hasLogged, setHasLogged] = useState(false)
    const navigation = useNavigation()
    const [hasReview, setHasReview] = useState(false)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setHasLogged(user ? true : false)
        })
    }, [])

    useEffect(() => {
        if (hasLogged) {
            const q = query(
                collection(db, "reviews"),
                where("idRestaurant", "==", idRestaurant),
                where("idUser", "==", auth.currentUser.uid)
            )

            onSnapshot(q, (snapshot) => {
                if (size(snapshot.docs) > 0) setHasReview(true)
            })
        }
    }, [hasLogged])

    const goToLogin = () => {
        navigation.navigate(screen.account.tab, {
            screen: screen.account.login
        })
    }

    const goToAddReview = () => {
        navigation.navigate(screen.restaurant.addReviewRestaurant, {
            idRestaurant: idRestaurant
        })
    }

    if (hasLogged && hasReview) {
        return (
            <View style={styles.content}>
                <Text style={styles.textReview}>Ya has dado una opinión</Text>
            </View>
        )
    }

    return (
        <View style={styles.content}>
            {hasLogged ? <Button title="Escribe una opinión"
                icon={{ type: "material-community", name: "square-edit-outline", color: "#00a680" }}
                buttonStyle={styles.button}
                titleStyle={styles.btnText}
                onPress={goToAddReview}
            /> :
                <Text style={styles.text}>Debes estar logeado para escribir una opinión. <Text style={styles.textClick} onPress={goToLogin}>Click para iniciar sesión</Text></Text>}
        </View>
    )
}