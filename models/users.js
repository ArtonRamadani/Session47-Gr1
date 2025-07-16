const { default: mongoose } = require("mongoose");
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "Emri eshte fushe e detyreshme!"],
        minlength: [3, "Emri duhet te ket me shume se 3 karaktere!"]
    },
    last_name: {
        type: String,
        required: [true, "Mbiemri eshte fushe e detyreshme!"],
        minlength: [3, "Mbiemri duhet te ket me shume se 3 karaktere!"]
    },
    age: {
        type: Number,
        min: [18, "Mosha minimale per tu regjistruar duhet te jete me shume se 18!"]
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v)
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String // should be a hashed string
    },
    role: {
        type: String
    }
}, { virtuals: true })

userSchema.post('save', function (doc, next) {
    console.log(`--- NEW USER REGISTERD -> ${doc.first_name} ${doc.last_name} with role ${doc.role}`)
    next()
})

userSchema.virtual('full_name')
    .get(function () {
        return `${this.first_name} ${this.last_name}`
    })

userSchema.set('toJSON', {
    virtuals: true // This includes virtual fields in the output of JSON responses
});

userSchema.index({ email: 1, password: 1 })


const User = mongoose.model('User', userSchema)


module.exports = { User }
