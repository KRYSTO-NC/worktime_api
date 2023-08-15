const mongoose = require('mongoose')

const HorraireSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    day: {
      type: String,
      enum: [
        'Lundi',
        'Mardi',
        'Mercredi',
        'Jeudi',
        'Vendredi',
        'Samedi',
        'Dimanche',
      ],
      required: true,
    },

    morning: {
      start: {
        type: String,
      },
      end: {
        type: String,
      },
    },
    afternoon: {
      start: {
        type: String,
      },
      end: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

HorraireSchema.virtual('workDuration').get(function () {
  const [morningStartHours, morningStartMinutes] = this.morning.start
    .split(':')
    .map(Number)
  const [morningEndHours, morningEndMinutes] = this.morning.end
    .split(':')
    .map(Number)

  const [
    afternoonStartHours,
    afternoonStartMinutes,
  ] = this.afternoon.start.split(':').map(Number)
  const [afternoonEndHours, afternoonEndMinutes] = this.afternoon.end
    .split(':')
    .map(Number)

  const morningDuration =
    (morningEndHours - morningStartHours) * 60 +
    (morningEndMinutes - morningStartMinutes)
  const afternoonDuration =
    (afternoonEndHours - afternoonStartHours) * 60 +
    (afternoonEndMinutes - afternoonStartMinutes)

  const totalDuration = morningDuration + afternoonDuration // total duration in minutes
  const hours = Math.floor(totalDuration / 60)
  const minutes = totalDuration % 60

  return `${hours}:${minutes < 10 ? '0' + minutes : minutes}` // format as "hours:minutes"
})

module.exports = mongoose.model('Horraire', HorraireSchema)
