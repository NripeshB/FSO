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
    name: {type: String,
    minLength: 3,
    },
    number: {
        type: String,
        minLength: [8, 'Phone number must be at least 8 characters long'],
        validate: {
        validator: function (v) {
            return /^\d{2,3}-\d+$/.test(v)
        },
        message: props => `${props.value} is not a valid phone number! Format: xx-xxxxxx or xxx-xxxxxx`
        },
        required: [true, 'Phone number is required']
    }
})

personSchema.set('toJSON', {
    transform: (document, returnObject)=>{
        returnObject.id = returnObject._id.toString()
        delete returnObject._id
        delete returnObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)