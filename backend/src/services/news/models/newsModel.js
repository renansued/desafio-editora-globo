var mongoose = require('mongoose')

const NewsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    publishDate: {
      type: Date,
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

const myModel = mongoose.model('News', NewsSchema);
module.exports =  myModel;
