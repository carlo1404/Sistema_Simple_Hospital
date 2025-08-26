class HistoriaClinica {
    constructor(id, pacienteId, tratamientos = []) {
        this.id = id;
        this.pacienteId = pacienteId;
        this.tratamientos = tratamientos;
    }
}

module.exports = HistoriaClinica;
