# API del Sistema de Adopción

Esta API está diseñada para gestionar citas para adopciones de mascotas. Incluye funcionalidades para crear, actualizar y listar citas, así como gestionar la información del usuario.

## Variables de Entorno

Cree un archivo `.env` en el directorio raíz y agregue las siguientes variables:

```
MONGO_URI=<tu_cadena_de_conexión_mongodb>
PORT=<tu_puerto_del_servidor>
JWT_SECRET=<tu_secreto_jwt>
```

## Endpoints de la API

### Citas

- **Crear Cita**
  - **URL:** `/api/appointments/createAppointment`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "date": "2023-10-15T14:48:00.000Z",
      "status": "CREATED",
      "pet": "<pet_id>",
      "user": "<user_id>"
    }
    ```

- **Listar Cita**
  - **URL:** `http://127.0.0.1:3001/adoptionSystem/v1/appointment/`
  - **Método:** `Get`
  - **Cuerpo:**
  - **en la ruta va especificado el iud de la cita con la cual lecambiamos el status a Cancelled**

- **Cancelar una cita**
  - **URL:** `http://127.0.0.1:3001/adoptionSystem/v1/appointment/67aacb85b408e2c2e7ef49d2`
  - **Método:** `PATHC`
  - **Cuerpo:**
  - **en la ruta va especificado el iud de la cita con la cual lecambiamos el status a Cancelled**
    



 - **Actualizar Cita**
  - **URL:** `http://127.0.0.1:3001/adoptionSystem/v1/appointment/67aac1e727a04ea99fe251ef`
  - **Método:** `PUT`
  - **Cuerpo:**
    ```json
    {
    "date": "2025-04-15T10:00:00.000Z",
    "status": "ACCEPTED",
    "pet": "67aac1c727a04ea99fe251e7",
    "user": "67aab0797db9192622dd55c3"
    }
    ```


  
### Usuarios

- **Registrar Usuario**
  - **URL:** `/api/users/register`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "name": "string",
      "username": "string",
      "email": "string",
      "password": "string"
    }
    ```

- **Iniciar Sesión**
  - **URL:** `/api/users/login`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "email": "string",
      "password": "string"
    }
    ```

- **Obtener Usuario por ID**
  - **URL:** `/api/users/:uid`
  - **Método:** `GET`

- **Eliminar Usuario**
  - **URL:** `/api/users/:uid`
  - **Método:** `DELETE`

- **Actualizar Contraseña del Usuario**
  - **URL:** `/api/users/:uid/password`
  - **Método:** `PUT`
  - **Cuerpo:**
    ```json
    {
      "newPassword": "string"
    }
    ```

    - **Actualizar Foto**
  - **URL:** `http://127.0.0.1:3001/adoptionSystem/v1/user/updateProfilePicture/67aac1bd27a04ea99fe251e3`
  - **Método:** `PATCH`
  - **Cuerpo:**
    ```json
    {
      "profilePicture": "photo"
    }
    ```
    - **En el posman se usa el from-Data**

### Mascotas

- **Registrar Mascota**
  - **URL:** `/api/pets/register`
  - **Método:** `POST`
  - **Cuerpo:**
    ```json
    {
      "name": "string",
      "age": "number",
      "type": "string",
      "breed": "string"
    }
    ```

- **Obtener Mascota por ID**
  - **URL:** `/api/pets/:pid`
  - **Método:** `GET`

- **Eliminar Mascota**
  - **URL:** `/api/pets/:pid`
  - **Método:** `DELETE`

- **Actualizar Información de la Mascota**
  - **URL:** `/api/pets/:pid`
  - **Método:** `PUT`
  - **Cuerpo:**
    ```json
    {
      "name": "string",
      "age": "number",
      "type": "string",
      "breed": "string"
    }
    ```



3. **Actualizar Cita**
   - Descripción: Implementar funcionalidad para actualizar una cita existente.


