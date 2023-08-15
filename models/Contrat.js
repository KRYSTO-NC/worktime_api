const mongoose = require('mongoose')

const ContratSchema = new mongoose.Schema(
  {
    document: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Document',
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
    },

    poste: {
      type: String,
    },

    type: {
      type: String,
      enum: [
        'CDI',
        'CDD',
        'Saisonier',
        'Apprentissage',
        'Extra',
        'Interim',
        'Statgiaire',
      ],
    },

    etablissement: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Etablissement',
    },

    dateDebut: {
      type: Date,
    },
    dateFin: {
      type: Date,
    },
    motifFin: {
      type: String,
      enum: [
        "Changement d'établissement",
        'Changement de contrat',
        'Décès du collaborateur',
        'Démission',
        'Départ volontaire à la retraite',
        "Fin d'activité",
        'Fin de contrat',
        "Fin de période d'essai a l'initiative de l'employeur",
        "Fin de période d'essai a l'initiative du salarié",
        'Force majeure',
        'Licenciement pour faute grave',
        'Licenciement pour faute lourde',
        'Licenciement pour faute simple',
        'Licenciement pour insuffisance professionnelle',
        'Licenciement pour motif économique',
        'Mise à la retraite',
        'Résiliation judiciaire du contrat de travail',
        'Rupture conventionnelle',
      ],
    },

    tempsTravaillHebdomadaire: {
      type: Number,
    },

    JoursTravaileParSemaine: {
      type: Number, // Remplacer 'Type' par 'type'
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
    iban: {
      type: String,
    },

    bic: {
      type: String,
    },

    DerniereVisiteMedical: {
      type: Date,
    },

    avenants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Avenant',
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// // reverse populate

// ContratSchema.virtual('employee', {
//   ref: 'User', // le modèle à utiliser
//   localField: '_id', // trouve les employés où `localField`
//   foreignField: 'contrats', // est égal à `foreignField`
//   justOne: true, // pour un contrat, il ne devrait y avoir qu'un seul employé
// })

ContratSchema.virtual('status').get(function () {
  const today = new Date()
  today.setHours(0, 0, 0, 0) // réinitialise l'heure pour comparer uniquement les dates

  if (this.dateDebut <= today && (!this.dateFin || this.dateFin >= today)) {
    return 'en cours'
  } else if (this.dateDebut > today) {
    return 'à venir'
  } else {
    return 'terminé'
  }
})

ContratSchema.methods.getAvenantEnCours = async function () {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  for (let avenantId of this.avenants) {
    let avenant = await mongoose.model('Avenant').findById(avenantId)

    if (
      avenant.dateDebut <= today &&
      (!avenant.dateFin || avenant.dateFin >= today)
    ) {
      return avenant // Si un avenant est trouvé en cours, retournez l'avenant
    }
  }

  return null // Si aucun avenant en cours n'est trouvé, retournez null
}

module.exports = mongoose.model('Contrat', ContratSchema)
