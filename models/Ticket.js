import mongoose from 'mongoose'

const ticket = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  step: {
    type: Number,
    required: true,
    default: 0
  }
},
{
  timestamps: true
}
)

export default mongoose.model('Ticket', ticket)
