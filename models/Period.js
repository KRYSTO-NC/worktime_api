const mongoose = require('mongoose')

const PeriodSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },

    partOfDay: {
      type: String,
      enum: ['Matin', 'Aprés-midi'], // Période du matin ou de l'après-midi
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

module.exports = mongoose.model('Period', PeriodSchema)
