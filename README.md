# Proyecto Bimestral

Este proyecto es una aplicación de comercio electrónico que incluye módulos para gestionar usuarios, productos, categorías, tiendas (shops) y facturas (invoices).

## Requisitos

- Node.js (versión 14 o superior)
- MongoDB

## Instalación

1. Clona el repositorio:
    ```bash
    git clone https://github.com/Mayen1405/proyectoBimestral.git
    cd proyectoBimestral
    ```

2. Instala las dependencias:
    ```bash
    npm install
    ```

3. Configura las variables de entorno:
    Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables:
    ```env
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/proyectoBimestral
    JWT_SECRET=yourSecretKey
    ```

4. Inicia el servidor:
    ```bash
    npm start
    ```

## Módulos

### User

- **Modelo:** `user.model.js`
- **Controlador:** `user.controller.js`
- **Rutas:** `user.routes.js`
- **Descripción:** Gestiona los usuarios, incluyendo registro, inicio de sesión, actualización de perfil y eliminación de usuarios.

### Product

- **Modelo:** `product.model.js`
- **Controlador:** `product.controller.js`
- **Rutas:** `product.routes.js`
- **Descripción:** Gestiona los productos, incluyendo creación, actualización, eliminación y obtención de productos.

### Category

- **Modelo:** `category.model.js`
- **Controlador:** `category.controller.js`
- **Rutas:** `category.routes.js`
- **Descripción:** Gestiona las categorías de productos, incluyendo creación, actualización, eliminación y obtención de categorías.

### Shop

- **Modelo:** `shop.model.js`
- **Controlador:** `shop.controller.js`
- **Rutas:** `shop.routes.js`
- **Descripción:** Gestiona el carrito de compras (shop), incluyendo la adición de productos, obtención de productos y finalización de compras.

### Invoice

- **Modelo:** `invoice.model.js`
- **Controlador:** `invoice.controller.js`
- **Rutas:** `invoice.routes.js`
- **Descripción:** Gestiona las facturas, incluyendo la obtención del historial de facturas para un usuario.

## Uso

### Endpoints

#### User

- `POST /register`: Registrar un nuevo usuario
  - **Body (JSON):**
    ```json
    {
        "name": "John",
        "surname": "Doe",
        "username": "johndoe",
        "email": "johndoe@example.com",
        "password": "StrongPassword123!",
        "phone": "12345678",
        "profilePicture": "profile.jpg"
    }
    ```

- `POST /login`: Iniciar sesión
  - **Body (JSON):**
    ```json
    {
        "email": "johndoe@example.com",
        "password": "StrongPassword123!"
    }
    ```

- `GET /findUser/{uid}`: Obtener un usuario por ID
  - **Body:** No se requiere cuerpo para esta solicitud.

- `GET /`: Obtener todos los usuarios
  - **Body:** No se requiere cuerpo para esta solicitud.

- `DELETE /deleteUser/{uid}`: Eliminar un usuario por ID
  - **Body:** No se requiere cuerpo para esta solicitud.

- `PATCH /updatePassword/{uid}`: Actualizar contraseña de usuario
  - **Body (JSON):**
    ```json
    {
        "password": "NewStrongPassword123!"
    }
    ```

- `PUT /updateUser/{uid}`: Actualizar información de usuario
  - **Body (JSON):**
    ```json
    {
        "name": "John",
        "surname": "Doe",
        "username": "johndoe",
        "email": "johndoe@example.com",
        "phone": "12345678"
    }
    ```

- `PATCH /updateProfilePicture/{uid}`: Actualizar foto de perfil de usuario
  - **Body (form-data):**
    ```
    {
        "profilePicture": <archivo de imagen>
    }
    ```

#### Product

- `POST /products`: Crear un nuevo producto
- `GET /products`: Obtener todos los productos
- `GET /products/:id`: Obtener un producto por ID
- `PUT /products/:id`: Actualizar un producto
- `DELETE /products/:id`: Eliminar un producto

#### Category

- `POST /categories`: Crear una nueva categoría
- `GET /categories`: Obtener todas las categorías
- `GET /categories/:id`: Obtener una categoría por ID
- `PUT /categories/:id`: Actualizar una categoría
- `DELETE /categories/:id`: Eliminar una categoría

#### Shop

- `POST /shop`: Añadir productos al carrito
- `GET /shop`: Obtener productos del carrito
- `POST /shop/complete`: Completar la compra

#### Invoice

- `GET /invoices`: Obtener el historial de facturas del usuario

## Contribuir

Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Añadir nueva funcionalidad'`).
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

