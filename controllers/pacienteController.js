// controllers/pacienteController.js
const readlineSync = require("readline-sync");
const Paciente = require("../models/Paciente");

let pacientes = [];
let pacientesHistoricos = []; // <-- AÑADIDO: Archivo histórico

// ... (las funciones de validación no cambian, déjalas como están)
function validarCampo(mensaje, campo) {
    let valor;
    do {
        valor = readlineSync.question(mensaje).trim();
        if (valor === "" || /^\s+$/.test(valor)) {
            console.log(`Error: El campo "${campo}" no puede estar vacio ni contener solo espacios.`);
        }
    } while (valor === "" || /^\s+$/.test(valor));
    return valor;
}

function validarNumero(mensaje, campo) {
    let valor;
    do {
        valor = readlineSync.question(mensaje).trim();
        if (valor === "" || /^\s+$/.test(valor)) {
            console.log(`Error: El campo "${campo}" no puede estar vacio.`);
            valor = null;
        } else if (isNaN(valor)) {
            console.log(`Error: El campo "${campo}" debe ser un numero valido.`);
            valor = null;
        } else if (Number(valor) < 0) {
            console.log(`Error: El campo "${campo}" no puede ser negativo.`);
            valor = null;
        }
    } while (valor === null);
    return valor;
}

function validarFecha(mensaje) {
    let fechaValida = false;
    let fecha;
    while (!fechaValida) {
        let input = readlineSync.question(mensaje).trim();
        fecha = new Date(input);
        if (!isNaN(fecha.getTime()) && input.match(/^\d{4}-\d{2}-\d{2}$/)) {
            if (fecha > new Date()) {
                console.log("Error: La fecha no puede ser en el futuro.");
            } else {
                fechaValida = true;
            }
        } else {
            console.log("Error: Fecha invalida. Use el formato YYYY-MM-DD");
        }
    }
    return fecha;
}

function mostrarMenuPacientes() {
    console.log("\n----- Gestion de Pacientes -----");
    console.log("1. Registrar Paciente");
    console.log("2. Modificar Paciente");
    console.log("3. Eliminar Paciente");
    console.log("4. Listar Pacientes Activos");
    console.log("5. Dar de Alta a Paciente");      // <-- AÑADIDO
    console.log("6. Ver Archivo Historico");     // <-- AÑADIDO
    console.log("7. Volver al Menu Principal");  // <-- ACTUALIZADO

    let opcion = readlineSync.question("Seleccione una opcion: ");
    switch (opcion) {
        case "1":
            registrarPaciente();
            break;
        case "2":
            modificarPaciente();
            break;
        case "3":
            eliminarPaciente();
            break;
        case "4":
            listarPacientes();
            break;
        case "5": // <-- AÑADIDO
            darDeAltaPaciente();
            break;
        case "6": // <-- AÑADIDO
            verArchivoHistorico();
            break;
        case "7": // <-- ACTUALIZADO
            console.log("Volviendo al menu principal...");
            return;
        default:
            console.log("Opcion no valida.");
    }
    mostrarMenuPacientes();
}

// ... (registrarPaciente, modificarPaciente, eliminarPaciente no cambian)
function registrarPaciente() {
    console.log("\n--- Registro de Paciente ---");

    let id = validarNumero("Ingrese el ID del paciente: ", "ID");
    if (pacientes.some(p => p.id === id)) {
        console.log(" Ya existe un paciente con este ID.");
        return;
    }
    
    let numeroDocumento = validarNumero("Ingrese el numero de documento: ", "Numero de Documento");
    let numeroHistoria = validarNumero("Ingrese el numero de historia clinica: ", "Numero de Historia Clinica");
    let nombre = validarCampo("Ingrese el nombre: ", "Nombre");
    let apellidos = validarCampo("Ingrese los apellidos: ", "Apellidos");
    let direccion = validarCampo("Ingrese la direccion: ", "Direccion");
    let telefono = validarNumero("Ingrese el telefono: ", "Telefono");
    let fechaNacimiento = validarFecha("Ingrese la fecha de nacimiento (YYYY-MM-DD): ");

    let nuevoPaciente = new Paciente(
        id,
        numeroDocumento,
        numeroHistoria,
        nombre,
        apellidos,
        direccion,
        telefono,
        fechaNacimiento
    );

    pacientes.push(nuevoPaciente);
    console.log("Paciente registrado con exito.");
}

function modificarPaciente() {
    console.log("\n--- Modificar Paciente ---");
    let id = validarNumero("Ingrese el ID del paciente a modificar: ", "ID");

    let paciente = pacientes.find(p => p.id === id);
    if (!paciente) {
        console.log("Paciente no encontrado.");
        return;
    }

    console.log("Deje el campo vacío si no desea modificarlo.");

    let nuevoNombre = readlineSync.question(`Nuevo nombre (${paciente.nombre}): `).trim();
    if (nuevoNombre && !/^\s+$/.test(nuevoNombre)) paciente.nombre = nuevoNombre;

    let nuevoApellido = readlineSync.question(`Nuevos apellidos (${paciente.apellidos}): `).trim();
    if (nuevoApellido && !/^\s+$/.test(nuevoApellido)) paciente.apellidos = nuevoApellido;

    let nuevaDireccion = readlineSync.question(`Nueva direccion (${paciente.direccion}): `).trim();
    if (nuevaDireccion && !/^\s+$/.test(nuevaDireccion)) paciente.direccion = nuevaDireccion;

    let nuevoTelefono = readlineSync.question(`Nuevo telefono (${paciente.telefono}): `).trim();
    if (nuevoTelefono && !isNaN(nuevoTelefono) && Number(nuevoTelefono) >= 0) paciente.telefono = nuevoTelefono;

    console.log("Paciente modificado con exito.");
}

function eliminarPaciente() {
    console.log("\n--- Eliminar Paciente ---");
    let id = validarNumero("Ingrese el ID del paciente a eliminar: ", "ID");

    let indice = pacientes.findIndex(p => p.id === id);
    if (indice === -1) {
        console.log("Paciente no encontrado.");
        return;
    }

    pacientes.splice(indice, 1);
    console.log("Paciente eliminado con exito.");
}

function listarPacientes() {
    console.log("\n--- Lista de Pacientes Activos---");
    if (pacientes.length === 0) {
        console.log("No hay pacientes activos registrados.");
        return;
    }

    pacientes.forEach(p => {
        console.log(`ID: ${p.id}, Nombre: ${p.nombre} ${p.apellidos}, Documento: ${p.numeroDocumento}`);
    });
}

// <-- NUEVAS FUNCIONES -->
function darDeAltaPaciente() {
    console.log("\n--- Dar de Alta a Paciente ---");
    let id = validarNumero("Ingrese el ID del paciente a dar de alta: ", "ID");

    let indice = pacientes.findIndex(p => p.id === id);
    if (indice === -1) {
        console.log("Paciente no encontrado en la lista de activos.");
        return;
    }

    const pacienteDadoDeAlta = pacientes[indice];
    pacientesHistoricos.push(pacienteDadoDeAlta); // Mover al historico
    pacientes.splice(indice, 1); // Eliminar de la lista activa

    console.log(`Paciente ${pacienteDadoDeAlta.nombre} ${pacienteDadoDeAlta.apellidos} ha sido dado de alta y movido al archivo historico.`);
}

function verArchivoHistorico() {
    console.log("\n--- Archivo Historico de Pacientes ---");
    if (pacientesHistoricos.length === 0) {
        console.log("El archivo historico esta vacio.");
        return;
    }

    pacientesHistoricos.forEach(p => {
        console.log(`ID: ${p.id}, Nombre: ${p.nombre} ${p.apellidos}, Documento: ${p.numeroDocumento}, Fecha de Registro: ${p.fechaRegistro.toISOString().split("T")[0]}`);
    });
}

module.exports = {
    mostrarMenuPacientes,
    pacientes
};