const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middlewares/async')
const Conversation = require('../models/Conversation') // Assurez-vous d'avoir exporté ce modèle

// @desc      Get all conversations
// @route     GET /worshift/api/v1/conversations
// @access    Private
exports.getConversations = asyncHandler(async (req, res, next) => {
  const conversations = await Conversation.find().populate('participants')

  res.status(200).json({
    success: true,
    data: conversations,
  })
})

// @desc      Get single conversation
// @route     GET /worshift/api/v1/conversations/:id
// @access    Private
exports.getConversation = asyncHandler(async (req, res, next) => {
  const conversation = await Conversation.findById(req.params.id).populate(
    'participants',
  )

  if (!conversation) {
    return next(
      new ErrorResponse(
        `Conversation not found with ID of ${req.params.id}`,
        404,
      ),
    )
  }

  res.status(200).json({
    success: true,
    data: conversation,
  })
})

// @desc      Create conversation
// @route     POST /worshift/api/v1/conversations
// @access    Private
exports.createConversation = asyncHandler(async (req, res, next) => {
  const conversation = await Conversation.create(req.body)

  res.status(201).json({
    success: true,
    data: conversation,
  })
})

// @desc      Update conversation
// @route     PUT /worshift/api/v1/conversations/:id
// @access    Private
exports.updateConversation = asyncHandler(async (req, res, next) => {
  const conversation = await Conversation.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  )

  if (!conversation) {
    return next(
      new ErrorResponse(
        `Conversation not found with ID of ${req.params.id}`,
        404,
      ),
    )
  }

  res.status(200).json({
    success: true,
    data: conversation,
  })
})

// @desc      Delete conversation
// @route     DELETE /worshift/api/v1/conversations/:id
// @access    Private
exports.deleteConversation = asyncHandler(async (req, res, next) => {
  await Conversation.findByIdAndDelete(req.params.id)

  res.status(200).json({
    success: true,
    data: {},
  })
})
