// controllers/diagnosticoController.js
const readlineSync = require("readline-sync");
const Diagnostico = require("../models/Diagnostico");

let diagnosticos = [];

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

function mostrarMenuDiagnosticos() {
    console.log("\n----- Gestion de Diagnosticos -----");
    console.log("1. Crear Diagnóstico");
    console.log("2. Modificar Diagnóstico");
    console.log("3. Eliminar Diagnóstico");
    console.log("4. Listar Diagnósticos");
    console.log("5. Volver al Menú Principal");

    let opcion = readlineSync.question("Seleccione una opcion: ");
    switch (opcion) {
        case "1":
            crearDiagnostico();
            break;
        case "2":
            modificarDiagnostico();
            break;
        case "3":
            eliminarDiagnostico();
            break;
        case "4":
            listarDiagnosticos();
            break;
        case "5":
            return;
        default:
            console.log(" Opción no valida.");
    }
    mostrarMenuDiagnosticos();
}

function crearDiagnostico() {
    console.log("\n--- Crear Diagnóstico ---");
    let id = validarCampo("Ingrese el código del diagnostico: ", "Codigo");
    if (diagnosticos.some(d => d.id === id)) {
        console.log(" Ya existe un diagnóstico con este código.");
        return;
    }
    let descripcion = validarCampo("Ingrese la descripcion: ", "Descripcion");
    
    let nuevoDiagnostico = new Diagnostico(id, descripcion);
    diagnosticos.push(nuevoDiagnostico);
    console.log(" Diagnostico creado con exito.");
}

function modificarDiagnostico() {
    console.log("\n--- Modificar Diagnóstico ---");
    let id = validarCampo("Ingrese el código del diagnóstico a modificar: ", "Codigo");
    let diagnostico = diagnosticos.find(d => d.id === id);
    if (!diagnostico) {
        console.log(" Diagnostico no encontrado.");
        return;
    }

    let nuevaDescripcion = readlineSync.question(`Nueva descripcion (${diagnostico.descripcion}): `).trim();
    if (nuevaDescripcion) {
        diagnostico.descripcion = nuevaDescripcion;
    }

    console.log("El diagnostico fue modificado con exito.");
}

function eliminarDiagnostico() {
    console.log("\n--- Eliminar Diagnóstico ---");
    let id = validarCampo("Ingrese el código del diagnóstico a eliminar: ", "Código");
    let indice = diagnosticos.findIndex(d => d.id === id);
    if (indice === -1) {
        console.log(" Diagnostico no encontrado.");
        return;
    }
    diagnosticos.splice(indice, 1);
    console.log(" Diagnostico eliminado con exito.");
}

function listarDiagnosticos() {
    console.log("\n--- Lista de Diagnosticos ---");
    if (diagnosticos.length === 0) {
        console.log("No hay diagnósticos registrados.");
        return;
    }
    diagnosticos.forEach(d => {
        console.log(`Codigo: ${d.id}, Descripcion: ${d.descripcion}`);
    });
}

module.exports = {
    mostrarMenuDiagnosticos,
    diagnosticos // Exportamos para el historial
};