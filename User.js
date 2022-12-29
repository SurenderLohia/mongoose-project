const mongoose = require("mongoose");

const AddressSchema = mongoose.Schema({
  street: String,
  city: String,
});

const UserSchema = mongoose.Schema({
  name: String,
  age: {
    type: Number,
    min: 1,
    max: 100,
    validate: {
      validator: (v) => v % 2 === 0, // 0 => valid
      message: (props) => `${props.value} is not an even number`,
    },
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    minLength: 10,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
  bestFriend: mongoose.SchemaTypes.ObjectId,
  hobbies: [String],
  address: AddressSchema,
});

UserSchema.methods.sayHi = function () {
  console.log(`Hi. My name is ${this.name}`);
};

UserSchema.statics.findByName = function (name) {
  return this.find({ name: new RegExp(name, "i") });
};

UserSchema.query.byName = function (name) {
  return this.where({ name: new RegExp(name, "i") });
};

UserSchema.virtual("namedEmail").get(function () {
  return `${this.name} <${this.email}>`;
});

UserSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("User", UserSchema);
