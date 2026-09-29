const mongoose=require('mongoose');
const serviceRequestSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    providerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ServiceProvider',
        default:null
    },
    vehicleId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Vehicle',
        required:true
    },
    //service info
    serviceType:{
        type:String,
        enum:['towing','fuel','tire','mechanic','battery'],
        required:true
    },
    description:{
        type:String,
        default:null
    },
    images:[{type:String}],//problem image
    //location
    userLocation:{
        latitude:{type:Number,required:true},
        longitude:{type:Number,required:true},
        address:{type:String,default:true}
    },
    providerLocation:{
        latitude:{type:Number,default:null},
        longitude:{type:Number,default:null}
    },
    //status
    status:{
        type:String,
        enum:[
            'pending',//request created
            'accepted',//provider accepted
            'ongoing',//service in progress
            'completed',//service done
            'cancelled'//cancelled
        ],
        default:'pending'
    },
    cancelReason:{type:String,default:null},
    cancelledBy:{
        type:String,
        enum:['user','provider','admin',null],
        default:null
    },
    //otp verification
    otp:{type:String,default:null},
    isOtpVerified:{type:Boolean,deafault:false},
    //pricing
    estimatedPrice:{type:Number,default:0},
    finalPrice:{type:Number,default:0},
    distance:{type:Number,default:0},

    //Payment
    paymentStatus:{
        type: String,
        enum:['pending','paid','failed','refunded'],
        default:'pending'
    },
    paymentMethod:{
        type:String,
        enum:['cash','online',null],
        default:null
    },
    //Time Tracking
    estimatedTime:{type:Number,default:null},
    acceptedTime:{type:Date,default:null},
    startedTime:{type:Date,default:null},
    completedAt:{type:Date,default:null},
    cancelledAt:{type:Date,default:null},
    //Status Timeline
    timeline:[
        {
        status:{type:String},
        message:{type:String},
        timestamp:{type:Date,default:Date.now}
        }
    ],
    //Review
    isReviewed:{type:Boolean,default:false},
    //Provider
    providerNotes:{type: String,default:null}
}, {timestamps: true});
module.exports = mongoose.model('ServiceRequest',serviceRequestSchema);
