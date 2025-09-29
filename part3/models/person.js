const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

mongoose.connect(url)
.then(()=>{
    console.log('Connected to MongoDB');
})
.catch((e)=>{
    console.log('error occured', e.message);
})

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

personSchema.set('toJSON', {
    transform: (document, returnObject)=>{
        returnObject.id = returnObject._id.toString()
        delete returnObject._id
        delete returnObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)