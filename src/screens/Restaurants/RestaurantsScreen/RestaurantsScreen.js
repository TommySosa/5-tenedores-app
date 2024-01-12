import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { screen, db } from "../../../utils"
import { styles } from "./RestaurantsScreen.styles"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { LoadingModal } from "../../../components/Shared"
import { ListRestaurants } from "../../../components/Restaurants/ListRestaurants/ListRestaurants";

export function RestaurantsScreen(props) {
    const { navigation } = props
    const [currentUser, setCurrentUser] = useState(null)
    const [restaurants, setRestaurants] = useState(null)

    useEffect(() => {
        const auth = getAuth()
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
        })
    }, [])

    useEffect(() => {
        const q = query(
            collection(db, "restaurants"),
            orderBy("createdAt", "desc")
        )
        onSnapshot(q, (snapshot) => {
            setRestaurants(snapshot.docs);
        })
    }, [])

    const goToAddRestaurant = () => {
        //Para viajar a una screen que está en el mismo stack:
        //navigation.navigate(screen.restaurant.addRestaurant)
        //Si es de otro staack:
        navigation.navigate(screen.restaurant.tab, { screen: screen.restaurant.addRestaurant })
    }

    return (
        <View style={styles.content}>
            {!restaurants ? (
                <LoadingModal show text="Cargando" />
            ) :
                <ListRestaurants restaurants={restaurants} />
            }

            {
                currentUser ? <Icon
                    reverse
                    type="material-community"
                    name="plus"
                    color="#00a680"
                    containerStyle={styles.btnContainer}
                    onPress={goToAddRestaurant}
                /> : null
            }

        </View>
    )
}