const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const Abscence = require('../models/Absence')

// @desc      Get all absences
// @route     GET /worshift/api/v1/absences
// @access    Private/Admin
exports.getAbsences = asyncHandler(async (req, res, next) => {
  const absences = await Abscence.find()
    .populate('employee')
    .populate('startDate')
    .populate('endDate')
  res.status(200).json({
    success: true,
    data: absences,
  })
})

// @desc      Get single absence
// @route     GET /worshift/api/v1/absences/:id
// @access    Private/Admin
exports.getAbsence = asyncHandler(async (req, res, next) => {
  const absence = await Abscence.findById(req.params.id)
    .populate('employee')
    .populate('startDate')
    .populate('endDate')

  if (!absence) {
    return next(
      new ErrorResponse(`Absence not found with ID of ${req.params.id}`, 404),
    )
  }

  res.status(200).json({
    success: true,
    data: absence,
  })
})

// @desc      Create absence
// @route     POST /worshift/api/v1/absences
// @access    Private/Admin
exports.createAbsence = asyncHandler(async (req, res, next) => {
  const absence = await Abscence.create(req.body)
  res.status(201).json({
    success: true,
    data: absence,
  })
})

// @desc      Update absence
// @route     PUT /worshift/api/v1/absences/:id
// @access    Private/Admin
exports.updateAbsence = asyncHandler(async (req, res, next) => {
  const absence = await Abscence.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!absence) {
    return next(
      new ErrorResponse(`Absence not found with ID of ${req.params.id}`, 404),
    )
  }

  res.status(200).json({
    success: true,
    data: absence,
  })
})

// @desc      Delete absence
// @route     DELETE /worshift/api/v1/absences/:id
// @access    Private/Admin
exports.deleteAbsence = asyncHandler(async (req, res, next) => {
  const absence = await Abscence.findById(req.params.id)

  if (!absence) {
    return next(
      new ErrorResponse(`Absence not found with ID of ${req.params.id}`, 404),
    )
  }

  absence.remove()

  res.status(200).json({
    success: true,
    data: {},
  })
})
