import mongoose from 'mongoose'

const message = mongoose.Schema({
  text: {
    type: String
  },
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isMy: {
    type: Boolean,
    required: true,
    default: false
  }
},
{
  timestamps: true
}
)

export default mongoose.model('Message', message)
