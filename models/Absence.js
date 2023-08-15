const mongoose = require('mongoose')

const AbsenceSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: [
        'Congé sans solde',
        'Congé payés',
        'Evenement familial',
        'Indisponibilité ponctuelle',
        'Recupération',
        'Autres',
      ],
    },

    startDate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Period',
      required: true,
    },

    endDate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Period',
      required: true,
    },

    status: {
      type: String,
      enum: ['Demande', 'Accepté', 'Refusé'],
    },

    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

module.exports = mongoose.model('Absence', AbsenceSchema)
