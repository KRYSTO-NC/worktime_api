const mongoose = require('mongoose')

const PointageSchema = new mongoose.Schema(
  {
    pointeuse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pointeuse',
    },

    card: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PointageCard',
    },

    date: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

module.exports = mongoose.model('Pointage', PointageSchema)
