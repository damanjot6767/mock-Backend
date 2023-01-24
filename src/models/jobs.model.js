const {Schema,model} = require("mongoose");

const JobSchema = new Schema({
    companyName:{type:String,required:true},
    position:{type:String,required:true},
    contract:{type:String,required:true},
    location:{type:String,required:true}
})

const JobModel = new model("job",JobSchema);
module.exports = JobModel;