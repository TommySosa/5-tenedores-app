import React, { useEffect, useState } from 'react'
import { ScrollView, Dimensions } from 'react-native'
import { styles } from "./RestaurantScreen.styles"
import { doc, onSnapshot, collection, query, where, orderBy } from "firebase/firestore"
import { db } from '../../../utils'
import { Carousel, Loading } from '../../../components/Shared'
import { Header, Info, BtnReviewForm, Reviews } from "../../../components/Restaurant"

const { width } = Dimensions.get("window")

export function RestaurantScreen({ route }) {
    const [restaurant, setRestaurant] = useState(null)

    useEffect(() => {
        setRestaurant(null)

        //traer los datos por el id
        onSnapshot(doc(db, "restaurants", route.params.id), (doc) => {
            setRestaurant(doc.data());
        })
    }, [route.params.id])

    if (!restaurant) return <Loading show text="Cargando restaurante" />

    return (
        <ScrollView style={styles.content}>
            <Carousel images={restaurant.images} height={250} width={width} />

            <Header restaurant={restaurant} />

            <Info restaurant={restaurant} />

            <BtnReviewForm idRestaurant={restaurant.id} />

            <Reviews idRestaurant={restaurant.id} />
        </ScrollView>
    )
}