// controllers/historiaClinicaController.js
const readlineSync = require("readline-sync");
const { pacientes } = require("./pacienteController");
const { empleados } = require("./empleadoController");
const { diagnosticos } = require("./diagnosticoController");
const { plantas } = require("./plantaController"); // <-- AÑADIDO

function buscarPacientePorId(id) {
    return pacientes.find(p => p.id == id);
}

// ... (mostrarMenuHistorias no cambia)
function mostrarMenuHistorias() {
    console.log("\n----- Gestión de Historia Clinica -----");
    console.log("1. Asignar Cama a Paciente");
    console.log("2. Registrar Visita Medica");
    console.log("3. Añadir Diagnóstico a Paciente");
    console.log("4. Emitir Tarjeta de Visita");
    console.log("5. Ver Historia Clinica de Paciente");
    console.log("6. Volver al Menú Principal");

    let opcion = readlineSync.question("Seleccione una opcion: ");
    switch (opcion) {
        case "1":
            asignarCama();
            break;
        case "2":
            registrarVisitaMedica();
            break;
        case "3":
            anadirDiagnostico();
            break;
        case "4":
            emitirTarjeta();
            break;
        case "5":
            verHistoriaClinica();
            break;
        case "6":
            return;
        default:
            console.log(" Opcion no valida.");
    }
    mostrarMenuHistorias();
}


// <-- FUNCIÓN MODIFICADA -->
function asignarCama() {
    console.log("\n--- Asignar Cama ---");
    let id = readlineSync.question("ID del paciente: ");
    let paciente = buscarPacientePorId(id);
    if (!paciente) {
        console.log(" Paciente no encontrado.");
        return;
    }

    if (plantas.length === 0) {
        console.log(" No hay plantas registradas en el hospital. Registre una planta primero.");
        return;
    }

    console.log("Plantas disponibles:");
    plantas.forEach(p => console.log(`- Planta N° ${p.id}: ${p.nombre}`));
    let idPlanta = readlineSync.question("Seleccione el número de la planta: ");
    const plantaSeleccionada = plantas.find(p => p.id == idPlanta);

    if (!plantaSeleccionada) {
        console.log(" Planta no valida.");
        return;
    }

    let numeroCama;
    do {
        numeroCama = readlineSync.question(`Ingrese el numero de cama (disponibles: 1-${plantaSeleccionada.numeroCamas}): `);
        if (isNaN(numeroCama) || numeroCama < 1 || numeroCama > plantaSeleccionada.numeroCamas) {
            console.log(` Numero de cama inválido para la planta ${plantaSeleccionada.nombre}.`);
            numeroCama = null;
        }
    } while (numeroCama === null);

    paciente.asignacionesCama.push({
        planta: plantaSeleccionada.id,
        nombrePlanta: plantaSeleccionada.nombre,
        numeroCama: numeroCama,
        fechaAsignacion: new Date()
    });
    console.log(` Cama ${numeroCama} en planta ${plantaSeleccionada.nombre} asignada a ${paciente.nombre}.`);
}

// ... (el resto de las funciones en este archivo no cambian)
function registrarVisitaMedica() {
    console.log("\n--- Registrar Visita Medica ---");
    let idPaciente = readlineSync.question("ID del paciente: ");
    let paciente = buscarPacientePorId(idPaciente);
    if (!paciente) {
        console.log(" Paciente no encontrado.");
        return;
    }

    let idMedico = readlineSync.question("Codigo del medico: ");
    let medico = empleados.find(e => e.id === idMedico);
    if (!medico) {
        console.log(" Medico no encontrado.");
        return;
    }

    paciente.visitasMedicas.push({
        fecha: new Date(),
        hora: new Date().toLocaleTimeString(),
        medico: medico.nombre
    });
    console.log(` Visita del Dr. ${medico.nombre} registrada para el paciente ${paciente.nombre}.`);
}

function anadirDiagnostico() {
    console.log("\n--- Añadir Diagnóstico a Paciente ---");
    let idPaciente = readlineSync.question("ID del paciente: ");
    let paciente = buscarPacientePorId(idPaciente);
    if (!paciente) {
        console.log(" Paciente no encontrado.");
        return;
    }

    let idDiagnostico = readlineSync.question("Codigo del diagnostico: ");
    let diagnostico = diagnosticos.find(d => d.id === idDiagnostico);
    if (!diagnostico) {
        console.log(" Diagnostico no encontrado.");
        return;
    }
    
    paciente.diagnosticos.push({
        codigo: diagnostico.id,
        descripcion: diagnostico.descripcion,
        fechaDiagnostico: new Date()
    });
    console.log(` Diagnostico "${diagnostico.descripcion}" añadido al paciente ${paciente.nombre}.`);
}

function emitirTarjeta() {
    console.log("\n--- Emitir Tarjeta de Visita ---");
    let idPaciente = readlineSync.question("ID del paciente: ");
    let paciente = buscarPacientePorId(idPaciente);

    if (!paciente) {
        console.log(" Paciente no encontrado.");
        return;
    }

    if (paciente.tarjetasVisita.length >= 4) {
        console.log(" El paciente ya tiene el máximo de 4 tarjetas de visita.");
        return;
    }

    let numeroTarjeta = `T-${paciente.id}-${paciente.tarjetasVisita.length + 1}`;
    let horaInicio = readlineSync.question("Hora de inicio de visita (HH:MM): ");
    let horaFin = readlineSync.question("Hora de fin de visita (HH:MM): ");
    let entregadoA = readlineSync.question("Nombre del visitante: ");

    paciente.tarjetasVisita.push({
        numeroTarjeta,
        horaInicio,
        horaFin,
        entregadoA
    });
    console.log(` Tarjeta ${numeroTarjeta} emitida para visitar a ${paciente.nombre}.`);
}

function verHistoriaClinica() {
    console.log("\n--- Ver Historia Clínica ---");
    let id = readlineSync.question("ID del paciente: ");
    let paciente = buscarPacientePorId(id);
    if (!paciente) {
        console.log(" Paciente no encontrado.");
        return;
    }

    console.log(`\n--- Historia Clinica de ${paciente.nombre} ${paciente.apellidos} ---`);
    console.log(`ID: ${paciente.id}, Documento: ${paciente.numeroDocumento}`);

    console.log("\n--- Asignaciones de Cama ---");
    paciente.asignacionesCama.forEach(c => console.log(`- Planta: ${c.nombrePlanta}, Cama: ${c.numeroCama}, Fecha: ${c.fechaAsignacion.toLocaleDateString()}`));

    console.log("\n--- Visitas Medicas ---");
    paciente.visitasMedicas.forEach(v => console.log(`- Fecha: ${v.fecha.toLocaleDateString()}, Hora: ${v.hora}, MMedico: ${v.medico}`));

    console.log("\n--- Diagnosticos ---");
    paciente.diagnosticos.forEach(d => console.log(`- Codigo: ${d.codigo}, Desc: ${d.descripcion}, Fecha: ${d.fechaDiagnostico.toLocaleDateString()}`));

    console.log("\n--- Tarjetas de Visita ---");
    paciente.tarjetasVisita.forEach(t => console.log(`- N°: ${t.numeroTarjeta}, Visitante: ${t.entregadoA}, Horario: ${t.horaInicio}-${t.horaFin}`));
}


module.exports = {
    mostrarMenuHistorias
};