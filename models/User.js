const { Schema, model } = require("mongoose");

const UserModel = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: function () {
      return [
        this.email.match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ),
        "Valid Email is required",
      ];
    },
    unique: true,
  },
  thoughts: [{
    type: Schema.Types.ObjectId,
    ref: 'Thought'
  }],
  friends:[{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
}

);

UserModel.virtual('friendCount').get(function() {
    return this.friends.length
})

const User = model('User', UserModel)

module.exports = User