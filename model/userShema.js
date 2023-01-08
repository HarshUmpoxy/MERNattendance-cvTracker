const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const userSchema=new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    phone:{
        type: Number,
        required:true
    },
    work:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    cpassword:{
        type: String,
        required:true
    },
    date: {
        type: Date,
        default:Date.now
    },
    messages:[
        {
            name: {
                type: String,
                required:true
            },
            email: {
                type: String,
                required:true
            },
            phone: {
                type: Number,
                required:true
            },
            message: {
                type: String,
                required:true
            }
        }
    ], 
    tokens:[
        {
            token:{
            type: String,
            required:true
            }
        }
    ],
    attendances:[
        {
            attendance:{
                type:String,
                required:true
            }
        }
    ]
})
//storing attendance in cache
// userSchema.pre('validate', function (next) {
//     console.log("Inside attendance count");
//     this.AttendanceCount = this.attendances.length
//     next();
//   });
//password hashing...
userSchema.pre('save', async function(next){
    console.log("Inside the hash");
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password, 12);
        this.cpassword=await bcrypt.hash(this.cpassword, 12);
    }
    next();
});

//token generation...
userSchema.methods.generateAuthToken= async function(){
    try{
        let token=jwt.sign({ _id:this._id}, process.env.SECRET_KEY);
        this.tokens= this.tokens.concat({token:token});
        await this.save();
        console.log("Token generated.");
        return token;
    }catch(err){
        console.log(err);
    }
}

//adding the user message to the database
userSchema.methods.addMessage = async function (name, email, phone, message) {
    try {
        this.messages = this.messages.concat({ name, email, phone, message });
        await this.save();
        return this.messages;
    } catch (error) {
        console.log(error)
    }
}
//adding the attendance to the database
userSchema.methods.addAttendance = async function (name, email, attendance) {
    try {
        this.attendances = this.attendances.concat({ name, email, attendance });
        await this.save();
        return this.attendances;
    } catch (error) {
        console.log(error)
    }
}

const User=mongoose.model('USER', userSchema);

module.exports=User;