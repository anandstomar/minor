const mongoose = require("mongoose");
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate");


const DiabetesSchema = new mongoose.Schema({
    Pregnacies: {
        type: Number,
        default: 0
    },
    Glucose: {
        type: Number,
        default: 0
    },
    BloodPressure: {
        type: Number,
        default: 0
    },
    skinThickness: {
        type: Number,
        default: 0
    },
    Insulin: {
        type: Number,
        default: 0
    },
    BMI: {
        type: Number,
        default: 0
    },
    Age: {
        type: Number,
        default: 0
    },
    DiabetesPedigreFunction: {
        type: Number,
        default: 0
    },
});


DiabetesSchema.plugin(mongooseAggregatePaginate);


const DiabetesModel = mongoose.model("Diabetes", DiabetesSchema);
module.exports= DiabetesModel;
