const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const PointageCard = require('../models/PointageCard')

// @desc      Get all pointage cards
// @route     GET /worshift/api/v1/pointagecards
// @access    Private/Admin
exports.getPointageCards = asyncHandler(async (req, res, next) => {
  const pointageCards = await PointageCard.find().populate('employee')
  res.status(200).json({
    success: true,
    data: pointageCards,
  })
})

// @desc      Get single pointage card
// @route     GET /worshift/api/v1/pointagecards/:id
// @access    Private/Admin
exports.getPointageCard = asyncHandler(async (req, res, next) => {
  const pointageCard = await PointageCard.findById(req.params.id).populate(
    'employee',
  )

  if (!pointageCard) {
    return next(
      new ErrorResponse(
        `Pointage Card not found with ID of ${req.params.id}`,
        404,
      ),
    )
  }

  res.status(200).json({
    success: true,
    data: pointageCard,
  })
})

// @desc      Create pointage card
// @route     POST /worshift/api/v1/pointagecards
// @access    Private/Admin
exports.createPointageCard = asyncHandler(async (req, res, next) => {
  const pointageCard = await PointageCard.create(req.body)
  res.status(201).json({
    success: true,
    data: pointageCard,
  })
})

// @desc      Update pointage card
// @route     PUT /worshift/api/v1/pointagecards/:id
// @access    Private/Admin
exports.updatePointageCard = asyncHandler(async (req, res, next) => {
  const pointageCard = await PointageCard.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  )

  if (!pointageCard) {
    return next(
      new ErrorResponse(
        `Pointage Card not found with ID of ${req.params.id}`,
        404,
      ),
    )
  }

  res.status(200).json({
    success: true,
    data: pointageCard,
  })
})

// @desc      Delete pointage card
// @route     DELETE /worshift/api/v1/pointagecards/:id
// @access    Private/Admin
exports.deletePointageCard = asyncHandler(async (req, res, next) => {
  await PointageCard.findByIdAndDelete(req.params.id)
  res.status(200).json({
    success: true,
    data: {},
  })
})
