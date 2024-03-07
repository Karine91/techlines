import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    active: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    firstLogin: { type: Boolean, default: true },
    googleImage: { type: String },
    googleId: { type: String },
  },
  { timestamps: true }
);

userSchema.methods.matchPasswords = async function (enteredPass) {
  return await bcrypt.compare(enteredPass, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  } else {
    const salt = bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

const User = mongoose.model("User", userSchema);

export default User;
