import mongoose from 'mongoose'

export default () => {
  mongoose.connect(process.env.MONGO_URI, {dbName: 'tutor-app'}).then(() => {
    console.log("connected to db")
  }).catch(err => console.log(err))
}
