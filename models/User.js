const crypto = require('crypto')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Création du schéma utilisateur
const UserSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
    },

    card: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PointageCard',
    },

    contrats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contrat',
      },
    ],

    // Informations de base
    photo: {
      type: String,
      default: 'no-photo.png',
    },
    dateOfBirth: {
      type: Date,
    },
    placeOfBirth: {
      type: String,
      default: 'non renseigné',
    },
    mobileNumber: {
      type: String,
      default: 'non renseigné',
    },
    fixedNumber: {
      type: String,
      default: 'non renseigné',
    },
    entryDate: {
      type: Date,
    },
    actif: {
      type: Boolean,
    },

    firstname: {
      type: String,
      required: [true, 'Veuillez entrer un prénom'],
    },
    lastname: {
      type: String,
      required: [true, 'Veuillez entrer un nom de famille'],
    },

    cafat: {
      type: String,
      required: [true, 'Veuillez entrer un numéro de Cafat'],
    },
    role: {
      type: String,
      enum: ['superAdmin', 'admin', 'user'],
      default: 'user',
    },
    maritalStatus: {
      type: String,
      enum: [
        'Célibataire',
        'Marié(e)',
        'Divorcé(e)',
        'veuf/veuve',
        'séparé(e)',
        'Pacsé(e)',
        'Concubinage',
      ],
    },
    educationLevel: {
      type: String,
      enum: [
        'Collège',
        'Lycée',
        'Enseignement Supérieur',
        'Grandes Écoles',
        'Enseignement Supérieur Spécialisé',
      ],
    },

    drivingLicenseB: {
      type: Boolean,
      default: true,
    },
    // ...

    // Informations de connexion

    email: {
      type: String,
      required: [true, 'Veuillez entrer une adresse EMAIL'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Veuillez ajouter une adresse email valide',
      ],
    },
    password: {
      type: String,
      required: [true, 'Veuillez entrer un mot de passe'],
      minlength: 6,
      select: false, // Ne pas renvoyer le mot de passe par défaut lors des requêtes
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,

    // Timestamps pour suivre les créations et modifications
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // Inclure les propriétés virtuelles lors de la sérialisation JSON
    toObject: { virtuals: true }, // Inclure les propriétés virtuelles lors de la conversion en objet
  },
)

// ... Autres propriétés, méthodes et hooks ...
UserSchema.pre('save', async function (next) {
  // Si le mot de passe est modifié, le hacher
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  }

  // Vérification des contrats
  await this.populate('contrats')

  // Trier les contrats en fonction de leur dateDebut
  this.contrats.sort((a, b) => a.dateDebut - b.dateDebut)

  // Si l'utilisateur n'a pas encore de date d'entrée, définissez-la comme la date de début du premier contrat
  if (!this.entryDate && this.contrats.length) {
    this.entryDate = this.contrats[0].dateDebut
  }

  const currentDate = new Date()

  // Par défaut, supposons qu'aucun contrat n'est actif
  let hasActiveContract = false

  for (let contrat of this.contrats) {
    if (
      contrat.dateDebut <= currentDate &&
      (contrat.dateFin >= currentDate || !contrat.dateFin)
    ) {
      // Si un contrat est trouvé actif, mettre hasActiveContract à true et sortir de la boucle
      hasActiveContract = true
      break
    }
  }

  // Mettre à jour le statut actif de l'utilisateur
  this.actif = hasActiveContract

  next()
})

UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  })
}

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex')
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000
  return resetToken
}

// Export du modèle utilisateur
module.exports = mongoose.model('User', UserSchema)
