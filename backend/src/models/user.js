import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
    {
        firstname : {
            type: String,
            required: [true, "Prénom requis"],
            trim: true,
            minlength: [3, "Assez long"],
        },
        lastname: {
            type: String,
            required: [true, "Prénom requis"],
            trim: true,
            minlength: [3, "Assez long"],
        }
        ,
        email : {
            type : String,
            required : [true, "Email requis"],
            unique : true,
            trim: true,
            lowercase : true,
        },

        password: {
            type : String,
            required : [true, "Password requis"],
            trim : true,
            minLength : [6, "Password doit etre assez long"],
        },
    }, {timestamps: true}
);

UserSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
});

UserSchema.methods.comparePassword = function (password){
    return bcrypt.compare(password, this.password);
}

export default mongoose.model("User", UserSchema);


