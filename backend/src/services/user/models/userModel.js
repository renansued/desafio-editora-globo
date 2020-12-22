const validator = require('validator')
const bcrypt = require('bcrypt')
var mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    login: {
      type: String,
      lowercase: true,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
      //select: true// isso deve ser tratado como false, mas esta dessa forma por uma limitação na lib
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)




/* Problemas com a lib de ultima hora
const hash = (user, salt, next) => {
  console.log(user)
  bcrypt.hash(user.password, salt, null, (error, newHash) => {
    if (error) {
      return next(error)
    }
    user.password = newHash
    console.log(newHash)
    return next()
  })
}

const genSalt = (user, SALT_FACTOR, next) => {
  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) {
      return next(err)
    }
    return hash(user, salt, next)
  })
}

UserSchema.pre('save', function(next) {
  const that = this
  const SALT_FACTOR = 5
  
  if (!that.isModified('password')) {
    return next()
  }
  return genSalt(that, SALT_FACTOR, next)
})

UserSchema.methods.comparePassword = function(passwordAttempt, cb) {
  bcrypt.compare(passwordAttempt, this.password, (err, isMatch) =>
    err ? cb(err) : cb(null, isMatch)
  )
}*/
module.exports = mongoose.model('User', UserSchema)
