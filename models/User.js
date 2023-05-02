import mongoose from 'mongoose'

const user = new mongoose.Schema({
  firstName: {
    type: String,
    default: '',
    required: true
  },
  lastName: {
    type: String,
    default: '',
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  admin: {
    type: Boolean,
    default: false
  },
  customer: {
    type: Boolean,
    default: true
  }
},
{
  timestamps: true
}
)

export default mongoose.model('User', user)
