const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const serviceProviderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique:true
    },
    serviceType: {
        type: String,
        enum: ['towing', 'fuel', 'tire', 'mechanic','battery'],
        required: true
    },
    profileImage: {
        type: String,
        default: null
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        default: null
    },
    dateOfBirth: {
        type: Date,
        default: null
    },
    experience: {
        type: Number,
        default: 0
    },
    bio: {
        type: String,
        default: null
    },
    address: {
        street: { type: String, default: null},
        city: { type: String, default: null},
        state: {type: String, default: null}
    },
    location: {
        latitude:{ type: Number, default: null },
        longitude:{ type: Number, default: null}
    },
    VehicleInfo:{
        VehicleNumber:{type:String,default:null},
        VehicleType:{type:String,default:null},
        VehicleModel:{type:String,default:null}
    },

    //Documents
    documents:{
        license:{type:String,default:null},
        certificate:{type:String,default:null},
        idproof:{type:String,default:null}
    },
    //Availability
    isAvailable:{type:Boolean,default:null},
    WorkingHours:{
        from:{type:String,default:'08:00'},
        to:{type:String,default:'20:00'}
    },

    //Acounts status
    isVerified:{type:Boolean,default:false},
    isActive:{type:Boolean,default:true},
    isBanned:{type:Boolean,default:false},

    //Ratings
    rating:{type:Number,default:0},
    totalReviews:{type:Number,default:0},

    //status
    completedJobs:{type:Number,default:0},
    cancelledJobs:{type:Number,default:0},
    totalEarnings:{type:Number,default:0},

    //service charges
    charges:{
        baseCharge:{type:Number,default:0},
        perKmCharge:{type:Number,default:0}
    },
    //Auth
    otp:{type:String,default:null},
    otpExpiry:{type:Date,default:null},
    resetToken:{type:String,default:null},
    resetTokenExpiry:{type:Date,default:null},
    lastLogin:{type:Date,default:null}
},{timeStamps:true});

//Hash password before saving
serviceProviderSchema.pre('save',async function(){
    if(!this.isModified('password')) return;
    this.password=await bcrypt.hash(this.password,10);
});
//compare password
serviceProviderSchema.methods.matchPassword=async function (enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};module.exports = mongoose.model('ServiceProvider', serviceProviderSchema);