// controllers/plantaController.js
const readlineSync = require("readline-sync");
const Planta = require("../models/Planta");

let plantas = [];

function validarNumero(mensaje, campo) {
    let valor;
    do {
        valor = readlineSync.question(mensaje).trim();
        if (isNaN(valor) || valor === "" || Number(valor) <= 0) {
            console.log(` El campo "${campo}" debe ser un numero positivo.`);
            valor = null;
        }
    } while (valor === null);
    return Number(valor);
}

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

function mostrarMenuPlantas() {
    console.log("\n----- Gestión de Plantas del Hospital -----");
    console.log("1. Registrar Planta");
    console.log("2. Listar Plantas");
    console.log("3. Volver al Menu Principal");

    let opcion = readlineSync.question("Seleccione una opcion: ");
    switch (opcion) {
        case "1":
            registrarPlanta();
            break;
        case "2":
            listarPlantas();
            break;
        case "3":
            return;
        default:
            console.log(" Opcion no valida.");
    }
    mostrarMenuPlantas();
}

function registrarPlanta() {
    console.log("\n--- Registrar Nueva Planta ---");
    let id = validarNumero("Ingrese el numero de la planta (ej: 1 para piso 1): ", "Numero de Planta");
    if (plantas.some(p => p.id === id)) {
        console.log(" Ya existe una planta con ese numero.");
        return;
    }
    let nombre = validarCampo("Ingrese el nombre de la planta (ej: Pediatria): ", "Nombre");
    let numeroCamas = validarNumero("Ingrese el número total de camas en la planta: ", "Numero de Camas");

    const nuevaPlanta = new Planta(id, nombre, numeroCamas);
    plantas.push(nuevaPlanta);
    console.log(` la  Planta "${nombre}" registrada con exito.`);
}

function listarPlantas() {
    console.log("\n--- Lista de Plantas ---");
    if (plantas.length === 0) {
        console.log("No hay plantas registradas.");
        return;
    }
    plantas.forEach(p => {
        console.log(`Planta N°: ${p.id}, Nombre: ${p.nombre}, Camas Totales: ${p.numeroCamas}`);
    });
}

module.exports = {
    mostrarMenuPlantas,
    plantas // Exportamos para que otros módulos puedan usarlas
};