const router = require("express").Router();
const methods = require("./custom_methods");
router.get("/",(req,res)=>{
    res.render("index");
})
router.post("/compare_code",async (req,res)=>{
     let result = await methods.compare_code(req.body);
     res.send(result)
})
router.post("/check_avaiable_mail",async (req,res)=>{
     let result = await methods.check_avaiable_mail(req.body);
     res.send(result)
})



module.exports = router;