// controllers/empleadoController.js
const readlineSync = require("readline-sync");
const Empleado = require("../models/Empleado");

let empleados = []; // Suponiendo que los médicos son un tipo de empleado

function validarCampo(mensaje, campo) {
    let valor;
    do {
        valor = readlineSync.question(mensaje).trim();
        if (valor === "") {
            console.log(` El campo "${campo}" no puede estar vacio.`);
        }
    } while (valor === "");
    return valor;
}

function mostrarMenuEmpleados() {
    console.log("\n----- Gestión de Médicos -----");
    console.log("1. Registrar Medico");
    console.log("2. Modificar Medico");
    console.log("3. Eliminar Medico");
    console.log("4. Listar Medicos");
    console.log("5. Volver al Menú Principal");

    let opcion = readlineSync.question("Seleccione una opcion: ");
    switch (opcion) {
        case "1":
            registrarEmpleado();
            break;
        case "2":
            modificarEmpleado();
            break;
        case "3":
            eliminarEmpleado();
            break;
        case "4":
            listarEmpleados();
            break;
        case "5":
            return;
        default:
            console.log(" Opcion no valida.");
    }
    mostrarMenuEmpleados();
}

function registrarEmpleado() {
    console.log("\n--- Registro de MMedico ---");
    let id = validarCampo("Ingrese el código del medico: ", "Codigo");
    if (empleados.some(e => e.id === id)) {
        console.log(" Ya existe un medico con este codigo.");
        return;
    }
    let nombre = validarCampo("Ingrese el nombre: ", "Nombre");
    let apellidos = validarCampo("Ingrese los apellidos: ", "Apellidos");
    
    // El cargo por defecto es "Médico" para este módulo
    let nuevoEmpleado = new Empleado(id, `${nombre} ${apellidos}`, "Medico");
    empleados.push(nuevoEmpleado);
    console.log(" El medico se registro correctamente.");
}

function modificarEmpleado() {
    console.log("\n--- Modificar Medico ---");
    let id = validarCampo("Ingrese el código del medico a modificar: ", "Codigo");
    let empleado = empleados.find(e => e.id === id);
    if (!empleado) {
        console.log(" Medico no encontrado.");
        return;
    }
    
    let nuevoNombre = readlineSync.question(`Nuevo nombre completo (${empleado.nombre}): `).trim();
    if (nuevoNombre) {
        empleado.nombre = nuevoNombre;
    }

    console.log(" Medico modificado con exito.");
}

function eliminarEmpleado() {
    console.log("\n--- Eliminar MMedico ---");
    let id = validarCampo("Ingrese el código del medico a eliminar: ", "Codigo");
    let indice = empleados.findIndex(e => e.id === id);
    if (indice === -1) {
        console.log(" Medico no encontrado.");
        return;
    }
    empleados.splice(indice, 1);
    console.log(" Medico eliminado con éxito.");
}

function listarEmpleados() {
    console.log("\n--- Lista de Medicos ---");
    if (empleados.length === 0) {
        console.log("No hay medicos registrados.");
        return;
    }
    empleados.forEach(e => {
        console.log(`Codigo: ${e.id}, Nombre: ${e.nombre}, Cargo: ${e.cargo}`);
    });
}

module.exports = {
    mostrarMenuEmpleados,
    empleados // Exportamos para usarlo en el historial
};