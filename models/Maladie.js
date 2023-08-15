const mongoose = require('mongoose')

const MaladieSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    startDate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Period',
      required: true,
    },

    endDate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Period',
    },

    document: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Document',
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

module.exports = mongoose.model('Maladie', MaladieSchema)
