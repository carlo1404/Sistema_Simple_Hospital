// app.js
// Elaborado por Carlos Andres Reyes Grajales 
const readlineSync = require('readline-sync');

// Controladores
const pacienteController = require('./controllers/pacienteController');
const empleadoController = require('./controllers/empleadoController');
const diagnosticoController = require('./controllers/diagnosticoController');
const historiaClinicaController = require('./controllers/historiaClinicaController');
const plantaController = require('./controllers/plantaController'); // <-- AÑADIDO

function mostrarMenuPrincipal() {
    console.log('\n==============================');
    console.log('  SISTEMA DE GESTIÓN HOSPITALARIA');
    console.log('==============================');
    console.log('1. Pacientes');
    console.log('2. Médicos');
    console.log('3. Diagnósticos');
    console.log('4. Plantas del Hospital'); // <-- AÑADIDO
    console.log('5. Historia Clínica');
    console.log('6. Salir'); // <-- ACTUALIZADO
}

function main() {
    let opcion = '';
    do {
        mostrarMenuPrincipal();
        opcion = readlineSync.question('Seleccione una opción: ');
        switch (opcion) {
        case '1':
            pacienteController.mostrarMenuPacientes();
            break;
        case '2':
            empleadoController.mostrarMenuEmpleados();
            break;
        case '3':
            diagnosticoController.mostrarMenuDiagnosticos();
            break;
        case '4': // <-- AÑADIDO
            plantaController.mostrarMenuPlantas();
            break;
        case '5': // <-- ACTUALIZADO
            historiaClinicaController.mostrarMenuHistorias();
            break;
        case '6': // <-- ACTUALIZADO
            console.log('Saliendo del sistema...');
            break;
        default:
            console.log('Opción no válida.');
        }

    } while (opcion !== '6'); // <-- ACTUALIZADO
}

main();