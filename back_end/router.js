const router = require("express").Router();
const methods = require("./custom_methods");
const jwt = require("jsonwebtoken");
const { mern_user, temp_email_collection } = require("./schema");


router.get("/",methods.authorization,(req,res)=>{
     if(res.cond!=true)
     {

          res.render("index",{
               toggle:"Sign In"
          });
     }else{
          res.render("index",{
               toggle:"Sign Out"
          });

     }
})
router.post("/store_notes",async (req,res)=>{
     try {
          // console.log("hellow store ntoes");
      req.body =  JSON.stringify(req.body);
          let token = req.cookies.sign_in;
         
          let verify_token =  await jwt.verify(token, process.env.secrect_key)
  
          let user = await mern_user.findOne({ _id: verify_token._id });
          if (!user) { 
              res.send({status:false});
          }else{
              user.notes= req.body;
              await user.save();
            res.send({status:true});
           }
  
        
      }
      catch (err) {
         
          res.send({status:false});
     
          
      }
})
router.get("/get_notes",async (req,res)=>{
     try {
      
          let token = req.cookies.sign_in;
         
          let verify_token = jwt.verify(token, process.env.secrect_key)
  
          let user = await mern_user.findOne({ _id: verify_token._id });
        
        
          if (!user) { 
              res.send({status:false});
          }else{
              
            res.send({status:true,data:user.notes});
           }
  
        
      }
      catch (err) {
         
          res.send({status:false});
     
          
      }
})
router.post("/compare_code",async (req,res)=>{
     let result = await methods.compare_code(req.body);
     res.send(result)
})
router.post("/check_avaiable_mail",async (req,res)=>{
     let result = await methods.check_avaiable_mail(req.body);
     res.send(result)
})
router.post("/register",async (req,res)=>{
     let result = await methods.register_user(req.body);
     res.send(result)
})
router.post("/if_email_present_send_verif_code",async (req,res)=>{
     let result = await methods.check_email(req.body);
     res.send(result)
})
router.post("/reset_password",async (req,res)=>{
     let result = await methods.reset_pass(req.body);
     res.send(result)
})
router.post("/sign_in",async (req,res)=>{
     let result = await methods.sign_in(req.body);
     if(result.status==true)
     {
          res.cookie("sign_in",result.token,{
               expires: new Date(Date.now()+604800000),
               // httpOnly:true
             
             });
     }
     res.send(result)
})


// logout page
router.post("/Sign_out",async (req ,res)=>{
     res.clearCookie("sign_in");
     let token=req.cookies.sign_in;
     let verify_token= jwt.verify(token,process.env.secrect_key)
     let current_user=await mern_user.findOne({_id:verify_token._id});
     // console.log(current_user,"............................");
     // console.log(verify_token);
     current_user.tokens=current_user.tokens.find((v,i)=>{
         return v.token !=token;
     })
     // console.log(current_user,"............................");
      await current_user.save();
     res.send({message:"logout Successfull",status:true});
 })
 // logout page 


module.exports = router;