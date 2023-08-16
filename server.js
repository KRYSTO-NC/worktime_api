// dependency
const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')
const mongoSanitize = require('express-mongo-sanitize')
const fileupload = require('express-fileupload')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
const hpp = require('hpp')
const cors = require('cors')
const socketIo = require('socket.io')
//import middlewares
const errorHandler = require('./middlewares/error.js')

// load config DB
const connectDB = require('./config/db')

//load environement variables
dotenv.config({ path: './config/config.env' })

//Connect to database
connectDB()

// Route files
const auth = require('./routes/auth')
const customers = require('./routes/customers.js')
const contrats = require('./routes/contrats.js')
const users = require('./routes/users')
const documents = require('./routes/documents')
const horraires = require('./routes/horraires.js')
const absences = require('./routes/absences.js')
const maladies = require('./routes/maladies.js')
const etablissements = require('./routes/etablissements.js')
const messages = require('./routes/messages.js')
const periods = require('./routes/periods.js')
const pointeuses = require('./routes/pointeuses.js')
const pointages = require('./routes/pointages')
const pointagecards = require('./routes/pointageCards.js')
const avenants = require('./routes/avenant.js')

// initialize express  application
const app = express()
app.set('view engine', 'ejs')
// Body parser
app.use(express.json())

// Dev logging Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// File uploading
app.use(fileupload())

// ======================= Security ====================
// Sanitize data
app.use(mongoSanitize())

// Set security headers
app.use(helmet())

// Prevent XSS attacks
app.use(xss())

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 1000,
})
app.use(limiter)

// Prevent http param pollution
app.use(hpp())

// Enable CORS
app.use(
  cors({
    origin: '*',
  }),
)
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))

// =====================================================

//set static folder
app.use(express.static(path.join(__dirname, 'public')))
//Mount routers
app.use('/worshift/api/v1/auth', auth)
app.use('/worshift/api/v1/contrats', contrats)
app.use('/worshift/api/v1/users', users)
app.use('/worshift/api/v1/documents', documents)
app.use('/worshift/api/v1/horraires', horraires)
app.use('/worshift/api/v1/customers', customers)
app.use('/worshift/api/v1/absences', absences)
app.use('/worshift/api/v1/etablissements', etablissements)
app.use('/worshift/api/v1/maladies', maladies)
app.use('/worshift/api/v1/messages', messages)
app.use('/worshift/api/v1/periods', periods)
app.use('/worshift/api/v1/pointeuses', pointeuses)
app.use('/worshift/api/v1/pointages', pointages)
app.use('/worshift/api/v1/pointageCards', pointagecards)
app.use('/worshift/api/v1/avenants', avenants)

//error handler
app.use(errorHandler)

const PORT = process.env.PORT || 8000

app.get('/', (req, res) => res.render('index'))

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT} root URL : http://localhost:${PORT}/worshift/api/v1`
      .white.underline.bold.bgGreen,
  ),
)

// Initialisation de Socket.io
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
})

io.on('connection', (socket) => {
  console.log("Un client s'est connecté")

  socket.on('joinRoom', ({ customerID, firstname, lastname }) => {
    socket.join(customerID)

    // Informer tous les autres utilisateurs de la même room qu'un nouvel utilisateur s'est connecté
    // Notez l'utilisation de `socket.broadcast.to(customerID).emit` pour envoyer le message à tous SAUF l'expéditeur
    socket.broadcast.to(customerID).emit('userConnected', {
      message: `${firstname} ${lastname} s'est connecté!`,
    })

    console.log(
      `${firstname} ${lastname} s'est connecté à la room ${customerID}`,
    )
  })

  // Gestion de la déconnexion du client
  socket.on('disconnect', () => {
    console.log("Un client s'est déconnecté")
    // Ici, si vous avez accès au customerID, firstname et lastname de l'utilisateur déconnecté (vous pourriez les stocker dans un objet Map ou ailleurs),
    // vous pouvez également envoyer une notification similaire pour informer les autres utilisateurs de sa déconnexion.
  })
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`)
  // Close server and exit process
  server.close(() => process.exit(1))
})
