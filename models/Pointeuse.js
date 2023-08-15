const mongoose = require('mongoose')

const PointeuseSchema = new mongoose.Schema(
  {
    etablissement: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Etablissement',
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },

    name: {
      type: String,
      required: [true, `Merci d'ajouter un nom pour la pointeuse`],
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

module.exports = mongoose.model('Pointeuse', PointeuseSchema)
