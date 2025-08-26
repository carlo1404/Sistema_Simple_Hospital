// models/Paciente.js
class Paciente {
    constructor(
        id,
        numeroDocumento,
        numeroHistoria,
        nombre,
        apellidos,
        direccion,
        telefono,
        fechaNacimiento,
        fechaRegistro = new Date()
    ) {
        this.id = id;
        this.numeroDocumento = numeroDocumento;
        this.numeroHistoria = numeroHistoria;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.direccion = direccion;
        this.telefono = telefono;
        this.fechaNacimiento = fechaNacimiento;
        this.fechaRegistro = fechaRegistro;

        // Nuevos requerimientos
        this.asignacionesCama = [];  // { planta, nombrePlanta, numeroCama, fechaAsignacion }
        this.tarjetasVisita = [];    // Máximo 4 -> { numeroTarjeta, horaInicio, horaFin, entregadoA }
        this.visitasMedicas = [];    // { fecha, hora, medico }
        this.diagnosticos = [];      // { codigo, descripcion, fechaDiagnostico }
    }
}
module.exports = Paciente;
