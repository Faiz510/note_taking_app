import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "A username is must required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "A email is must required"],
    },
    password: {
      type: String,
      required: [true, "A Password is must required"],
    },
    passwordConfirm: {
      type: String,
      validator: {
        validate: function (val) {
          return val === this.password;
        },
        message: "Password does not match",
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
