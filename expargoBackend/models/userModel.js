import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
         required: true,}, email: { type: String, required: true, unique: true, },
         isAdmin: { type: Boolean, default: false, }, password: { type: String, required: true, },
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.parolKontrol = async function (girilenParol) {
    return await bcrypt.compare(girilenParol, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;