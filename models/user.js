const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String },
    address: [{ type: Schema.Types.ObjectId, ref: "address", require: true }],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.salt;
      },
    },
    versionKey: false,
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  const hashedPassword = bcrypt.hashSync(this.password, 8);
  this.password = hashedPassword;
  return next();
});

//comparing user input with acutal password in hased form
userSchema.methods.checkPassword = function (password) {
  const hook = bcrypt.compareSync(password, this.password);
  return hook;
};

module.exports = mongoose.model("user", userSchema);
