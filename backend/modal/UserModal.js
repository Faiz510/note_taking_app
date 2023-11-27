import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";

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
      validate: {
        validator: function (val) {
          return validator.isEmail(val);
        },
        message: (props) => `${props.val} is not valid email`,
      },
    },
    password: {
      type: String,
      required: [true, "A Password is must required"],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "A confirm Password must required"],
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: "Passwords do not match",
      },
    },

    // notes: [{ title: { type: String, unique: true }, note: { type: String } }],
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
  },
  {
    timestamps: true,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const hashed = bcryptjs.hash(this.password, 12);
  this.password = await hashed;
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre(/^find/, function () {
  this.populate({
    path: "notes",
    select: "title",
  });
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  const correctPassword = await bcryptjs.compare(
    candidatePassword,
    userPassword
  );

  return correctPassword;
};

const User = mongoose.model("User", userSchema);

export default User;
