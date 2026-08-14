import Catalogo from "./Catalogo"

function Celulares({ agregarAlCarrito }) {

    const productos = [

        {
            nombre: "iPhone 15 Pro",
            marca: "Apple",
            precio: 19999,
            precioAnterior: 21999,
            descuento: "9% OFF",
            calificacion: 4.9
        },

        {
            nombre: "Galaxy S24 Ultra",
            marca: "Samsung",
            precio: 18499,
            precioAnterior: 20999,
            descuento: "12% OFF",
            calificacion: 4.8
        },

        {
            nombre: "Pixel 9 Pro",
            marca: "Google",
            precio: 16999,
            precioAnterior: 18999,
            descuento: "10% OFF",
            calificacion: 4.7
        },

        {
            nombre: "Xiaomi 14",
            marca: "Xiaomi",
            precio: 13499,
            precioAnterior: 15999,
            descuento: "16% OFF",
            calificacion: 4.7
        },

        {
            nombre: "Galaxy A55",
            marca: "Samsung",
            precio: 8999,
            precioAnterior: 10499,
            descuento: "14% OFF",
            calificacion: 4.6
        },

        {
            nombre: "Redmi Note 13 Pro",
            marca: "Xiaomi",
            precio: 6999,
            precioAnterior: 7999,
            descuento: "12% OFF",
            calificacion: 4.5
        },

        {
            nombre: "Moto Edge 50",
            marca: "Motorola",
            precio: 9499,
            precioAnterior: 10999,
            descuento: "13% OFF",
            calificacion: 4.6
        },

        {
            nombre: "Nothing Phone",
            marca: "Nothing",
            precio: 11999,
            precioAnterior: 13499,
            descuento: "11% OFF",
            calificacion: 4.5
        }

    ]

    return (

        <Catalogo
            titulo="Celulares"
            descripcion="Encuentra el smartphone ideal para ti. Explora diferentes marcas, características y precios."
            productos={productos}
            agregarAlCarrito={agregarAlCarrito}
        />

    )
}

export default Celulares