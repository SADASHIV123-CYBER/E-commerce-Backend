const {default: mongoose} = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: [20, 'maximum 20 characters limit for name'],
        required: [true, "name is required"]
        
    },

    email: {
        type: String,
        unique: true,
        required: [true, 'email is required'],
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'please enter valid email']
    },

    mobileNumber: {
        type: String,
        unique: true,
        minlength: [10, 'minimum 10 digit is required'],
        maxlength: [10, 'minimum 10 digit is required'],
        required: [true, 'mobile number is required'],
    },

    password: {
        type: String,
        minlength: [6, 'password much be 6 character long required'],
        required: [true, 'password is required']
    },

    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    }
});

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
        return next();
    }

    try {
        const handlePassword = await bcrypt.hash(this.password, 10);
        this.password = handlePassword;
        next()
    } catch (error) {
        next(error);
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User