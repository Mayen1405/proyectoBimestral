import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options ={
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title: "proyectoBimestral tienda en linea",
            version: "1.0.0",
            description: "API para gestionar la venta de productos en linea",
            contact:{
                name: "Jose Pablo Melgar",
                email: "drodriguez-2020522@kinal.org.gt"
            }
        },
        servers:[
            {
                url: "http://localhost:3001/proyectoBimestral/v1"
            }
        ]
    },
    apis:[
        "./src/auth/auth.routes.js",
        "./src/user/user.routes.js",
        "./src/category/category.routes.js",
        "./src/product/product.routes.js",
    ]
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi}