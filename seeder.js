const fs = require('fs')
const mongoose = require('mongoose')
const colors = require('colors')
const dotenv = require('dotenv')

// Load env vars
dotenv.config({ path: './config/config.env' })

// Load models
const Customer = require('./models/Customer')
const Etablissement = require('./models/Etablissement')
const Horraire = require('./models/Horraire')
const Period = require('./models/Period')
const Maladie = require('./models/Maladie')
const Pointeuse = require('./models/Pointeuse')
const PointageCard = require('./models/PointageCard')
const Pointage = require('./models/Pointage')
const Contrat = require('./models/Contrat')
const User = require('./models/User')

// Connect to DB
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
})

// Read JSON files
const contrats = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/contrats.json`, 'utf-8'),
)
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'),
)
const customers = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/customers.json`, 'utf-8'),
)
const etablissements = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/etablissements.json`, 'utf-8'),
)
const horraires = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/horraires.json`, 'utf-8'),
)
const periods = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/periods.json`, 'utf-8'),
)
const maladies = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/maladies.json`, 'utf-8'),
)
const pointeuses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/pointeuses.json`, 'utf-8'),
)
const pointageCards = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/pointageCards.json`, 'utf-8'),
)
const pointages = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/pointages.json`, 'utf-8'),
)

// Import into DB
const importData = async () => {
  try {
    await Contrat.create(contrats)
    await User.create(users)
    await Customer.create(customers)
    await Etablissement.create(etablissements)
    await Horraire.create(horraires)
    await Period.create(periods)
    await Maladie.create(maladies)
    await Pointeuse.create(pointeuses)
    await PointageCard.create(pointageCards)
    await Pointage.create(pointages)

    console.log('Data Imported...'.green.inverse)
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

// Delete data
const deleteData = async () => {
  try {
    await Contrat.deleteMany()
    await User.deleteMany()
    await Customer.deleteMany()
    await Etablissement.deleteMany()
    await Horraire.deleteMany()
    await Period.deleteMany()
    await Maladie.deleteMany()
    await Pointeuse.deleteMany()
    await PointageCard.deleteMany()
    await Pointage.deleteMany()

    console.log('Data Destroyed...'.red.inverse)
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

if (process.argv[2] === '-i') {
  importData()
} else if (process.argv[2] === '-d') {
  deleteData()
}
