const mongoose= require("mongoose");

let db=process.env.DataBase;
// db="mongodb://localhost:27017/spell_notes";
mongoose.connect(db,
    {useNewUrlParser: true ,useUnifiedTopology: true  }).then(()=>console.log("connection successful to DataBase"))
.catch((e)=>console.log("no connection "+e));

        