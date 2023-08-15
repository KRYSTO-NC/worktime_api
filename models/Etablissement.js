const mongoose = require('mongoose')
const geocoder = require('../utils/geocoder')

const EtablissementSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },

    name: {
      type: String,
      required: [true, `Merci d'ajouter un nom pour l'enseigne`],
      unique: true,
      trim: true,
      maxlength: [50, 'Le nom de ne pas conternir plus de 50 caractéres'],
    },

    address: {
      type: String,
      required: true,
    },

    location: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
        index: '2dsphere',
      },
      formattedAddress: String,
      street: String,
      city: String,
      zipcode: String,
      country: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Geocode & create location
EtablissementSchema.pre('save', async function (next) {
  const loc = await geocoder.geocode(this.address)
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode,
  }

  // Do not save address
  this.address = undefined
  next()
})

module.exports = mongoose.model('Etablissement', EtablissementSchema)
