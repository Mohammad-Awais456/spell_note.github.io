const mongoose= require("mongoose");

// let db=process.env.DataBase;
let db="";
db ="mongodb+srv://awais:3mwtZ6uQJIzRU0G4@cluster0.w3ct3.mongodb.net/Mern?retryWrites=true&w=majority";
console.log(db)
// db="mongodb://localhost:27017/spell_notes";
mongoose.connect(db,
    {useNewUrlParser: true ,useUnifiedTopology: true  }).then(()=>console.log("connection successful to DataBase"))
.catch((e)=>console.log("no connection "+e.message));

        