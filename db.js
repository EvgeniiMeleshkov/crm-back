import mongoose from 'mongoose'

// Clean up mongoose warning
mongoose.set('strictQuery', false)

// Get url from environment
const url = process.env.__MONGO_URL__

try {
  console.log('connecting to DB...')
  await mongoose.connect(url)
  console.log('DB OK')
} catch (error) {
  console.error('DB connection error')
}
