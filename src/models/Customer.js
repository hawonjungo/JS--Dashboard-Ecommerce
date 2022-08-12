const mongoose = require("mongoose");

const CustomerSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

CustomerSchema.methods.toJSON = function () {
  const customer = this;
  const customerObject = customer.toObject();
  delete customerObject.password;
  return customerObject;
};

module.exports = Admin = mongoose.model("customer", CustomerSchema);
