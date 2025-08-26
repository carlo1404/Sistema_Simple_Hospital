# Sistema de Gestión Hospitalaria 🏥

Este es un sistema de consola simple, desarrollado en Node.js, para la gestión básica de pacientes, médicos y operaciones en un entorno hospitalario. El programa permite llevar un registro detallado de la información y el historial de los pacientes durante su estancia.

---

## ✨ Características Principales

El sistema cuenta con varios módulos que permiten una administración integral:

* **Gestión de Pacientes:** Registro, modificación, eliminación y listado de pacientes.
* **Gestión de Médicos:** Administración del personal médico del hospital.
* **Gestión de Diagnósticos:** Creación y mantenimiento de un catálogo de diagnósticos.
* **Gestión de Plantas:** Registro de las plantas del hospital y su capacidad total de camas para una asignación controlada.
* **Historia Clínica Completa:**
    * Asignación de camas por planta, validando la disponibilidad.
    * Registro de visitas médicas asociadas a un paciente y un médico.
    * Asignación de diagnósticos a pacientes.
    * Emisión de hasta 4 tarjetas de visita por paciente.
* **Archivo Histórico:** Funcionalidad para dar de alta a un paciente y mover su registro completo a un archivo histórico consultable.

---

## 📋 Requisitos Previos

Asegúrate de tener instalado [Node.js](https://nodejs.org/) en tu sistema para poder ejecutar el proyecto.

---

## 🚀 Instalación y Puesta en Marcha

Sigue estos sencillos pasos para tener el proyecto funcionando en tu máquina local:

1.  **Clona el repositorio en tu máquina:**
    ```bash
    git clone [https://github.com/carlo1404/Sistema_Simple_Hospital.git](https://github.com/carlo1404/Sistema_Simple_Hospital.git)
    ```

2.  **Navega a la carpeta del proyecto:**
    ```bash
    cd Sistema_Simple_Hospital
    ```

3.  **Instala las dependencias necesarias:**
    ```bash
    npm install
    ```

---

## ▶️ Uso

Para iniciar la aplicación, ejecuta el siguiente comando en la terminal desde la carpeta del proyecto:

```bash
node app.js