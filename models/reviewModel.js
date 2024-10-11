const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    stars:{
        type:Number,
        enum:[1,2,3,4,5],
        required:true
    },
    description:{
        type:String,
    }
})

module.export=mongoose.model("Review",reviewSchema);