const { mern_user, temp_email_collection } = require("./schema");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
var nodemailer = require('nodemailer');

// reigster user or sign up 
async function register_user(data) {
    const {  email, password, name, c_password } = data;


    if (!name || !email || !password || !c_password) {
        return { status: false, message: "please fill all the fields" }

    }
    else {
        let email_exits = await mern_user.findOne({ email });
        if (email_exits) {

            return { status: false, message: "Email is already registered with another account" }
        }
        else if (c_password === password) {

            let register_user = new mern_user(data);
            const result = await register_user.save();
            console.log("user registered");
            return { status: true, message: "Registeration is Successful" };
        } else { return { status: false, message: "Conform password & password must be same" } }



    }

}
//**************************************************** */
// sign in 
async function sign_in(data) {
    try {
        
    
    const { email, password } = data;

    let user_exits = await mern_user.findOne({ email });
    if (!email || !password) {
        return { status: false, message: "Fill all the fields" }

    }
    else if (user_exits) {

        let check = await bcryptjs.compare(password, user_exits.password);
        if (check) {
            let token = await user_exits.generate_token();   
       // genereate json tokken
            return { status: true, message: `Welcome,${user_exits.name}`, user_data: user_exits,token };
        }
        else {
            return { status: false, message: "Invalid Details" }
        }
    } else { return { status: false, message: "Invalid Details" } }
} catch (error) {
    return { status: false, message: "Something Wrong!" }   
}

}
async function send_message(data) {
    const { subject, message, _id } = data;

    if (!subject || !message) { return { status: false, message: "Fill all the fields" }; }

    let user = await mern_user.findOne({ _id });
    if (user) {

        user.messages = user.messages.concat({ subject: subject, message: message });
        let res = await user.save();



    }
    else { return { status: false, message: "Please, Sign In again" }; }

    return { status: true, message: "Message Send Successfully" };


}
//**************************************************** */
async function authorization(req, res, next) {
    try {
      
        let token = req.cookies.sign_in;
       
        let verify_token = jwt.verify(token, process.env.secrect_key)

        let user = await mern_user.findOne({ _id: verify_token._id });
      
        if (!user) { 
            res.cond=false;
        }else{
            
            res.cond=true;
         }

      
    }
    catch (err) {
        res.render("index",{
            toggle:"Sign In"
       });
        
    }

    next();

}
//**************************************************** */
async function send_mail(reciver_address, code,subject) {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mohammadawais4667@gmail.com',
            pass: 'bezlhyesejlxbpci'
        }
    });

    var mailOptions = {
        from: 'mohammadawais4667@gmail.com',
        to: reciver_address,
        subject: subject,
        text: "6 digit code = " + code
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
           console.log(error);

        } else {
            console.log('Email sent');

        }
    });

}
//**************************************************** */
async function check_email(data) {
    const { email } = data;
    let user_exits = await mern_user.findOne({ email });
    if (user_exits) {
        let random = Math.round(Math.random() * 500000);
        send_mail(email, random,"Reset Code");
     
        user_exits.code = random;
        await user_exits.save();
        return { message: "6 digit code has been sent to you email,check it", status: true }



    } else {

        return { message: "Email is not found,Please sign up", status: false }
    }
}
//**************************************************** */
async function compare_code(data) {
    const { code, email } = data;
   
    let user = await mern_user.findOne({ email });
    if (user) {
        if (user.code == code) {
            user.code="";
            return { message: "6 digit Code matched", status: true };

        }
        else {
            return { message: "6 digit code does't matched", status: false };
        }
    } else {
        let user2 = await temp_email_collection.findOne({ email });
        if (user2) {
            if (user2.code == code) {
                await temp_email_collection.deleteOne({ email });
                return { message: "6 digit Code matched", status: true };
                     
            }
            else {
              
                return { message: "6 digit code does't matched", status: false };
            }
        }
    }


}
//**************************************************** */
async function reset_pass(data) {
    const { email, new_password } = data;
    let user = await mern_user.findOne({ email });
    if (user) {
        user.password = new_password;
        await user.save();
        return { message: "Password has Changed Successfully", status: true };
    } else {
        return { message: "Something Wrong !", status: false };

    }

}
//**************************************************** */
async function check_avaiable_mail(data) {
    const {  email, password, name, c_password } = data;

    if (!name || !email || !password || !c_password) {
        return { status: false, message: "please fill all the fields" }

    }
    let user = await mern_user.findOne({ email });
    if (user) {
        return { message: "Already,registerd with another account.", status: false }
    } else {
        let random = Math.round(Math.random() * 500000);
         send_mail(email, random,"Verification Code");
        
          let temp_user_exits= await temp_email_collection.findOne({email});
          if(temp_user_exits)
          {
              temp_user_exits.code= random;
              await temp_user_exits.save();
              
            }else{
                
                let temp_user = new temp_email_collection({ email, code:random });
                await temp_user.save();
            }
     

        return { message: "6 digit verification code has been sent to your email", status: true }

    }
}
//**************************************************** */

module.exports = { register_user, sign_in, authorization, check_avaiable_mail, send_message, reset_pass, check_email, compare_code }