import * as Yup from "yup"

export function initialValues() {
    return {
        name: "",
        address: "",
        phone: "",
        email: "",
        description: "",
        location: null,
        images: []
    }
}

export function validationSchema() {
    return Yup.object({
        name: Yup.string().required("Campo obligatorio"),
        address: Yup.string().required("Campo obligatorio"),
        phone: Yup.string().required("Campo obligatorio"),
        email: Yup.string().email("Email inválido").required("Campo obligatorio"),
        description: Yup.string().required("Campo obligatorio"),
        location: Yup.object().required("Campo obligatorio"),
        images: Yup.array().min(1, "Se requiere una imágen como mínimo").required("Campo obligatorio")
    })
}