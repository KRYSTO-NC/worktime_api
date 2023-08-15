const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const Message = require('../models/Message')

// @desc      Get all messages
// @route     GET /worshift/api/v1/messages
// @access    Private
exports.getMessages = asyncHandler(async (req, res, next) => {
  const messages = await Message.find().populate(['from', 'to'])
  res.status(200).json({
    success: true,
    data: messages,
  })
})

// @desc      Get single message
// @route     GET /worshift/api/v1/messages/:id
// @access    Private
exports.getMessage = asyncHandler(async (req, res, next) => {
  const message = await Message.findById(req.params.id).populate(['from', 'to'])

  if (!message) {
    return next(
      new ErrorResponse(`Message not found with ID of ${req.params.id}`, 404),
    )
  }

  res.status(200).json({
    success: true,
    data: message,
  })
})

// @desc      Create message
// @route     POST /worshift/api/v1/messages
// @access    Private
exports.createMessage = asyncHandler(async (req, res, next) => {
  const message = await Message.create(req.body)
  res.status(201).json({
    success: true,
    data: message,
  })
})

// @desc      Update message
// @route     PUT /worshift/api/v1/messages/:id
// @access    Private
exports.updateMessage = asyncHandler(async (req, res, next) => {
  const message = await Message.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!message) {
    return next(
      new ErrorResponse(`Message not found with ID of ${req.params.id}`, 404),
    )
  }

  res.status(200).json({
    success: true,
    data: message,
  })
})

// @desc      Delete message
// @route     DELETE /worshift/api/v1/messages/:id
// @access    Private

exports.deleteMessage = asyncHandler(async (req, res, next) => {
  await Message.findByIdAndDelete(req.params.id)

  res.status(200).json({
    success: true,
    data: {},
  })
})
