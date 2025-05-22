# Proyecto Frontend + Backend

Este proyecto fue desarrollado con **Node.js** y **React (Vite)**, totalmente **dockerizado**. Implementa un sistema completo de autenticación, registro de usuarios, y un CRUD de productos con control de roles y generación de reportes en PDF.

---

# Funcionalidades

- Registro y login con JWT
- CRUD de productos
- Gestión de roles
- Reportes descargables en PDF


## Instalación y ejecución

```bash
# Clonar el repositorio
git clone git@github.com:RodoGitHub/Node_React_Crud.git
cd Node_React_Crud

# Renombrar el archivo de variables de entorno
mv backend/.env.example backend/.env

# Construir contenedores
docker-compose build

# Levantar la app
docker-compose up

# Acceso a la app

http://localhost:5173/

# Autor

Rodolfo Palacios