const mongoose = require('mongoose')

const DATABASE_URL = "mongodb://localhost:27017/nextchatapp"

mongoose.connect(DATABASE_URL,() => {
	console.log('Mongo DB connected')
})



export default DATABASE_URL
