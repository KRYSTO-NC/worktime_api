const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const Pointeuse = require('../models/Pointeuse')

// @desc      Get all pointeuses
// @route     GET /worshift/api/v1/pointeuses
// @access    Private
exports.getPointeuses = asyncHandler(async (req, res, next) => {
  const pointeuses = await Pointeuse.find().populate('etablissement customer')
  res.status(200).json({
    success: true,
    data: pointeuses,
  })
})

// @desc      Get single pointeuse
// @route     GET /worshift/api/v1/pointeuses/:id
// @access    Private
exports.getPointeuse = asyncHandler(async (req, res, next) => {
  const pointeuse = await Pointeuse.findById(req.params.id).populate(
    'etablissement',
  )

  if (!pointeuse) {
    return next(
      new ErrorResponse(`Pointeuse not found with ID of ${req.params.id}`, 404),
    )
  }

  res.status(200).json({
    success: true,
    data: pointeuse,
  })
})

// @desc      Create pointeuse
// @route     POST /worshift/api/v1/pointeuses
// @access    Private
exports.createPointeuse = asyncHandler(async (req, res, next) => {
  const pointeuse = await Pointeuse.create(req.body)
  res.status(201).json({
    success: true,
    data: pointeuse,
  })
})

// @desc      Update pointeuse
// @route     PUT /worshift/api/v1/pointeuses/:id
// @access    Private
exports.updatePointeuse = asyncHandler(async (req, res, next) => {
  const pointeuse = await Pointeuse.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!pointeuse) {
    return next(
      new ErrorResponse(`Pointeuse not found with ID of ${req.params.id}`, 404),
    )
  }

  res.status(200).json({
    success: true,
    data: pointeuse,
  })
})

// @desc      Delete pointeuse
// @route     DELETE /worshift/api/v1/pointeuses/:id
// @access    Private
exports.deletePointeuse = asyncHandler(async (req, res, next) => {
  await Pointeuse.findByIdAndDelete(req.params.id)

  res.status(200).json({
    success: true,
    data: {},
  })
})
