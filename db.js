const mongoose = require("mongoose");

const options = {
    useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  };

mongoose.connect("mongodb://localhost:27017/project_3_v01", options).then(
    ()=>{ console.log("DB connected");},
    (err)=>{console.log(err);}
)