// models/Planta.js
class Planta {
    constructor(id, nombre, numeroCamas) {
        this.id = id; // Será el número de la planta, ej: 1, 2, 3
        this.nombre = nombre; // Ej: "Cardiología", "Pediatría"
        this.numeroCamas = numeroCamas;
    }
}

module.exports = Planta;