import mongoose from 'mongoose'

const project = mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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

export default mongoose.model('Project', project)
