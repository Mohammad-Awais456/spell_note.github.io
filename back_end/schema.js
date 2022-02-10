const mongoose=require("mongoose");
const  bcryptjs= require("bcryptjs");
const  jwt= require("jsonwebtoken");

const sign_up_schema=mongoose.Schema({
    name:{type:String,minLength:3,maxLength:30,required:true},
    
    email:{type:String,required:true},
    password:{type:String,required:true},
    c_password:{type:String},
   
    code: {type:String},
    notes:{type:String},

    
    tokens:[
        {
            token:{type:String,required:true}
        }
    ]
});
const temp_email_schema= mongoose.Schema({
    email:{type:String},
    code:{type:String}
})


sign_up_schema.pre("save",async function(next){
    if(this.isModified("password"))
    {
        // console.log("password :"+this.password);
        this.password= await bcryptjs.hash(this.password,9);
        this.c_password=undefined;
    }
 
    next();
})

// generete token 
sign_up_schema.methods.generate_token= async function()
{
     let token = await jwt.sign({_id:this.id},process.env.secrect_key);

   
     this.tokens=this.tokens.concat({token:token});
   
     this.save();
     return token;

}
// generete token 

const mern_user= new mongoose.model("user",sign_up_schema);
const temp_email_collection= new mongoose.model("mern_temp_mail",temp_email_schema);



module.exports= {mern_user,temp_email_collection};
