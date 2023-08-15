const mongoose = require('mongoose')

const AvenantSchema = new mongoose.Schema({
  contrat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contrat',
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['permanent', 'ponctuel'],
    required: true,
  },
  tempsTravaillHebdomadaire: {
    type: Number,
  },

  JoursTravaileParSemaine: {
    Type: Number,
  },

  qualification: {
    type: String,
    enum: [
      'Niveau 1 (Employé)',
      'Niveau 2 (Employé)',
      'Niveau 3 (Employé)',
      'Niveau 4 (Agent de maîtrise ou cadre)',
      'Niveau 5 (Cadre)',
    ],
  },

  echelon: {
    type: String,
    enum: [
      'Échelon 1',
      'Échelon 2',
      'Échelon 3',
      'Échelon 4',
      'Échelon 5',
      'Échelon 6',
      'Échelon 7',
      'Échelon 8',
      'Échelon 9',
    ],
  },

  tauxHorraireBrut: {
    type: Number,
  },

  indeminitesTransport: {
    type: Number,
  },
  dateDebut: {
    type: Date,
    required: true,
  },
  dateFin: {
    type: Date,
  },
})

module.exports = mongoose.model('Avenant', AvenantSchema)
