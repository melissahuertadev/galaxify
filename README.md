# Galaxify Admin

Dashboard administrativo para la gestión de productos y ventas de pequeñas empresas.  
Esta app permite registrar ventas de productos en tiempo real durante ferias o eventos, mantener inventarios y preparar datos para reportes.  

**Esta versión es solo para administradores**. Los clientes finales y la creación de tiendas se implementarán en la app principal más adelante.

---

## 💻 Tecnologías

- [React 18](https://reactjs.org/) + TypeScript  
- [Vite](https://vitejs.dev/) como bundler  
- [Firebase](https://firebase.google.com/)  
  - Firestore → base de datos de productos, empresas y ventas  
  - Auth → login con Google  
- Tailwind CSS

---

## ⚡ Funcionalidades

- Login de administradores mediante Google  
- Visualización de empresas asignadas  
- Listado de productos por empresa y categoría  
- Registro de ventas con actualización en Firestore  
- Preparado para mostrar resúmenes y totales de ventas  

---

## 🗂️ Estructura de la base de datos (Firestore)

### **Colecciones principales**

#### `companies`
- Documentos por empresa
- Campos:
  - `name` → string, nombre de la empresa
  - `owner` → string, email del administrador asignado
  - `category` → string (opcional)
  
#### `products`
- Documentos por producto
- Campos:
  - `name` → string, nombre del producto
  - `companyId` → string, ID de la empresa a la que pertenece
  - `category` → string, ej. "ropa", "mascotas", "joyas"
  - `stock` → number, cantidad disponible
  - `price` → number (opcional)
  
#### `sales`
- Documentos por venta registrada
- Campos:
  - `productId` → string, ID del producto vendido
  - `companyId` → string, ID de la empresa
  - `quantity` → number
  - `timestamp` → Timestamp de Firebase

---

## ⚙️ Configuración del proyecto

1. Clonar el repositorio:

```bash
git clone <URL_DEL_REPO>
cd galaxify-admin
```


2. Instalar dependencias:
```
npm install
```

3. Crear archivo .env.local en la raíz con tus credenciales de Firebase:
```
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

4. Levantar la app:
```
npm run dev
```


La app estará disponible en TBD

🛠️ Próximos pasos
- Configurar las colecciones en Firebase con los datos de prueba:
`companies` → tus empresas (“Disquete Galáctico”, “Lucita Handmade”, etc.)
`products` → productos de cada empresa con nombre, categoría y stock
`sales` → registrar ventas durante la feria

- Crear componentes de dashboard:
`CompanyList` → selecciona empresa
`ProductList` → muestra productos y permite registrar ventas
`SalesSummary` → resumen de ventas por empresa y categoría

- Restricciones de acceso:
Solo administradores asignados pueden iniciar sesión y ver la información

- Integración futura con app cliente:
Cada empresa podrá gestionar su propia tienda
Los clientes podrán comprar productos directamente

📌 Notas
Este repositorio es solo la parte administrativa.
Para producción, cambiar reglas de Firestore a modo seguro (production) y agregar autenticación estricta.
Tailwind CSS es opcional, puedes usar cualquier otra librería de UI.