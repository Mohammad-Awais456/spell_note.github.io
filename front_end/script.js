
let layer = document.querySelector('#layer');
let cond_db={
    cond:undefined
}
//global  variables 
//_________________________________________
let forget_btn= document.getElementById("forget_btn");
let sign_in_form= document.getElementById("sign_in_form");
let forget_form= document.getElementById("forget_form");
let reset_password_verification= document.getElementById("reset_password_verification");
let reset_password_form= document.getElementById("reset_password_form");
let forget_form_btn= document.getElementById("forget_form_btn");
let forget_form_email= document.getElementById("forget_form_email");
let reset_pass_verifi_btn= document.getElementById("reset_pass_verifi_btn");
let reset_pass_verifi_field= document.getElementById("reset_pass_verifi_field");
let new_password_field= document.getElementById("new_password_field");
let sign_in_form_btn=document.getElementById("sign_in_form_btn");
let sign_in_pass_field=document.getElementById("sign_in_pass_field");
let sign_in_email_field=document.getElementById("sign_in_email_field");
let reset_passowrd_btn= document.getElementById("reset_passowrd_btn");
let input=document.querySelectorAll(".register_input");

//_________________________________________




let user;
let  Register_form = document.getElementById("Register_form");
let  register_verification = document.getElementById("register_verification");
let  register_verification_input = document.getElementById("register_verification_input");
let  register_verification_btn = document.getElementById("register_verification_btn");
let  register_btn = document.getElementById("register_btn");




let t_address_opened_note;
const empty = `<h1 id="empty">EMPTY...</h1>`;
let close_alert= document.getElementById("close_alert");
let alert_container= document.getElementById("alert_container");
async function request_db_token_data(root,type,data)
{
    let res=await fetch(root,{
        method:type,
        headers:{Accept:"application/json","Content-Type":"application/json"},
        credentials:"include",
        body: JSON.stringify(data)

    })
    res = await res.json();
    return res;
}    
async function request_db_token(root,type)
{
    let res=await fetch(root,{
        method:type,
        headers:{Accept:"application/json","Content-Type":"application/json"},
        credentials:"include"
    })
    res = await res.json();
    return res;
}    
async function request_db(root,type,data)
{
    let res=await fetch(root,{
        method:type,
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(data)
    })
    res = await res.json();
    return res;
}    

close_alert.onclick=()=>{
    alert_container.style.cssText="top:-50%;";
    layer.classList.add("znone");
    layer.classList.remove("z_extra_high");
}
let alert_div=document.querySelector(".alert");
function show_alert (message){
    layer.classList.remove("znone");
    layer.classList.add("z_extra_high");
    alert_container.style.cssText="top:50%;";
    alert_div.innerHTML=message;
}



let register_user= document.getElementById("register_user");
let toggle_sign_logout= document.getElementById("toggle_sign_logout");
let sign_in_container= document.querySelector(".sign_in_container");
//global  variables 
// variables 
let ul = document.getElementById('ul')
let search_tag = document.getElementById('search_tag')
let note_parent = document.getElementById('note_section')
let notes_container = document.getElementById('notes_container')
let textarea = document.getElementById('textarea')
let input_title = document.getElementById('input_title')
let textarea_parent = document.getElementById('textarea_parent')

let close_form = document.querySelector('#close_form');
let register_container = document.querySelector('.register_container');
let bars = document.querySelector('.bars');
let editor_div = document.querySelector('#editor');
let read_only = document.querySelector('#read_only');
let read_title = document.querySelector('.read_title');
let read_content = document.querySelector('.read_content');
// variables 
// btn variables 
let add_note = document.getElementById('add_note_btn');

let toggle_btn = document.querySelector('#toggle_btn');
let exit_btn = document.querySelector('#exit_btn');
// btn variables 

// event listener 

add_note.addEventListener('click', display_editor);

exit_btn.addEventListener('click', exit_editor);

toggle_btn.addEventListener('click', toggle_btn_manager);
search_tag.addEventListener("input", show_query_result)

// event listener

// functions

// toggle_btn_manager
function toggle_btn_manager() {
    let cond = toggle_btn.innerHTML;
    let v1 = textarea.value;
    let v2 = input_title.value;
    let v2_len = v2.length;
    if ((v1 == "") || (v2 == "") || (v2_len > 20)) {


        if (v2_len > 20) {
            alert("Tile more than 20 char long is not allowed !!!")
        }
        else {
            alert("Empty title or desription is not allowed")

        }

    }
    else if (cond == "save") {
        textarea_to_read();

        toggle_btn.innerHTML = "edit";
        read_content.innerHTML = textarea.value;
        read_title.innerHTML = input_title.value;
        save_create_note(t_address_opened_note);
    }
    else if (cond == "create") {


        save_create_note();

    }
    else if (cond == "edit") {
        read_to_textarea();

        toggle_btn.innerHTML = "save";
    }
    else {
        console.log("editor working");
    }
}

// toggle_btn_manager

// set local data 
function set_local_storage_data(local_data) {
    local_data = JSON.stringify(local_data);
    localStorage.setItem("note_array", local_data);
}

// set local data 


// localstorage data passer
function get_local_storage_data() {
    let d = localStorage.getItem("note_array");
    d = JSON.parse(d);
    return d;
}
// localstorage data passer 

function display_editor(index_id) {

    if (index_id.length == 2) {
        toggle_btn.innerHTML = "edit";

        index_id = index_id.slice(1);
        let local = get_local_storage_data();

        t_address_opened_note = index_id;  // contain address of open note 

        let temp_note = local[index_id];
        textarea.value = temp_note[1];
        input_title.value = temp_note[0];
        read_title.innerHTML = temp_note[0];
        read_content.innerHTML = temp_note[1];
        textarea_parent.classList.remove("zhigh");
        textarea_parent.classList.add("znone");
        read_only.classList.add("zhigh");
        read_only.classList.remove("znone");
    }


    editor_div.classList.remove('znone');
    editor_div.classList.add('zhigh');
    layer.classList.remove('znone');
    layer.classList.add('zmid');

}
// *********************************************
function exit_editor() {
    editor_div.classList.add('znone');
    editor_div.classList.remove('zhigh');
    layer.classList.add('znone');
    layer.classList.remove('zmid');

    if (toggle_btn.innerHTML == "edit") {
        read_to_textarea();
        setTimeout(() => {

            toggle_btn.innerHTML = "create";

        }, 1000)
    }

    editor_empty();

}
// *********************************************
function delete_note(index, c = true) {
let conf=confirm("Delete note?....!!!");
// console.log(conf);
if(conf)
{

    let d = get_local_storage_data();
    d.splice(index, 1);
    
    set_local_storage_data(d);
    local_to_db();
    display_notes();

}


}

// *********************************************
function textarea_to_read() {

    textarea_parent.classList.remove("zhigh");
    textarea_parent.classList.add("znone");
    read_only.classList.add("zhigh");
    read_only.classList.remove("znone");
}
// *********************************************
function read_to_textarea() {





    textarea_parent.classList.add("zhigh");
    textarea_parent.classList.remove("znone");
    read_only.classList.remove("zhigh");
    read_only.classList.add("znone");

}
// *********************************************

function editor_empty() {
    textarea.value = "";
    input_title.value = "";
    read_content.innerHTML = "";
    read_title.innerHTML = "";
}

// *********************************************


function display_notes() {
    let arr = [];
    let cond = localStorage.getItem("note_array");
console.log("cond :",cond);
    if (cond == null) {
        notes_container.innerHTML = empty;

        arr = JSON.stringify(arr);
        localStorage.setItem("note_array", arr);


    }
    else {
        if (cond == "[]") {
            notes_container.innerHTML = empty;

        }
        else {
            let html_data = "";
            cond = JSON.parse(cond);
            cond.forEach((element, index) => {
                html_data += `<div class="note">
                <div class="delete_open_parent">

                    <button id="a${index}" onclick="display_editor(this.id)"   class="btn open">open</button>
                    <button id="${index}" onclick="delete_note(this.id)" class="delete btn ">delete</button>
                </div>

                <div class="title">
                    ${element[0]}
                    </div>
                    <div class="content">
                    ${element[1]}
                    
                </div>

            </div>
       `
            });

            notes_container.innerHTML = html_data;


        }



    }


}
// display_notes();

// *********************************************
function save_create_note(temp_index = null) {
    // cond=toggle_btn.innerHTML;
    if (temp_index == null) {
        let local_data = get_local_storage_data();



        let title = input_title.value;
        let content = textarea.value;
        let data = [title, content];

        local_data.push(data);
        set_local_storage_data(local_data);
        display_notes();
        exit_editor();
        local_to_db() 
        console.log("save function working ");
    }
    else {

        let raw_data = get_local_storage_data();
        raw_data[temp_index][1] = textarea.value;
        raw_data[temp_index][0] = input_title.value;




        set_local_storage_data(raw_data);
        local_to_db() ;
        display_notes();



    }
}
// *********************************************
// functions


// mongo db functions 
async function db_to_local() 
{
    let res= await request_db_token("/get_notes","GET");
    console.log(res);
    if(res.status==true)
    {
        res.data= JSON.parse(res.data)
        set_local_storage_data(res.data);
       

            display_notes();
       

}else{
        display_notes();
        console.log("somethign");

    }
    
}
db_to_local() ;
//________________________________
async function local_to_db() 
{
    let l_data=get_local_storage_data();
   
    let res= await request_db_token_data("/store_notes","POST",l_data);
    console.log(res);

    if(res.status==true)
    {
        console.log(res.data);
        
display_notes();

    }else{
        console.log("somethign");
    }
    
}
//______________________________________________ 


function show_query_result() {



    let temp_notes_for_query = document.querySelectorAll(".note");
    let child_title = document.querySelectorAll(".note > .title");
    let child_content = document.querySelectorAll(".note > .content");
    console.log(child_title);
    console.log(child_content);
    let query = search_tag.value;
    query = query.trim();
    query= query.toLocaleLowerCase();
    if (query == "") {

        temp_notes_for_query.forEach((element, index) => {

            element.classList.remove("dnone");
            display_notes();
            console.log("display called");
        })
    }
    else {
        // console.log(temp_notes_for_query);

        let footer = document.getElementById("footer");
        temp_notes_for_query.forEach((element, index, oj) => {

            let content = child_content[index];
            let title = child_title[index];
            console.log(element);

            content = content.innerHTML.toLocaleLowerCase();
            title = title.innerHTML.toLocaleLowerCase();
            content = content.includes(query);
            title = title.includes(query);
            if ((content != true) && (title != true)) {
                element.classList.add("dnone");

            }
            else {
                element.classList.remove("dnone");

            }



        })



    }

}


// themes javascritp 
let theme = document.querySelectorAll(".theme_img_div");

let theme_length=theme.length;

theme.forEach((element, i, ob) => {

    element.classList.remove("active")

    element.addEventListener("click", (e) => {

        theme_changer(i);

    })
})


function theme_changer(t) {


    theme[t].classList.add("active");
    for (let i = 0; i < theme_length; i++) 
    {
        if(i!=t)
        {

            theme[i].classList.remove("active");

            localStorage.setItem("theme",t);
            theme_displayer();
        }
    }

}
let background_theme=document.getElementById("background")

function theme_displayer() {
    let th=localStorage.getItem("theme");

    if(th!=null)
{
    let form_background=`background:linear-gradient(rgb(0 0 0 / 81%), rgb(0 0 0 / 79%)), url(./images/b${+(th)+1}.jpg);    background-position: center;
background-size: cover !important;
background-repeat: no-repeat !important;
width: 100% !important;
height: 100% !important;
position: fixed !important;
`;
    background_theme.style.cssText=`background:linear-gradient(rgba(0, 0, 0, 0.541), rgba(0, 0, 0, 0.548)), url(./images/b${+(th)+1}.jpg);    background-position: center;
    background-size: cover !important;
    background-repeat: no-repeat !important;
    width: 100vw !important;
    height: 100vh !important;
    position: fixed !important;
    z-index: -22 !important;`;
    register_container.style.cssText=form_background;
    sign_in_container.style.cssText=form_background;
    layer.style.cssText=`background:linear-gradient(rgba(0, 0, 0, 0.541), rgba(0, 0, 0, 0.548)), url(./images/b${+(th)+1}.jpg);    top: 0;
    position: fixed !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    background-size: cover !important;
    background-repeat: no-repeat !important;
    transition: 0.5s !important;`;
    
}
else
{
    background_theme.style.cssText=`background:linear-gradient(rgba(0, 0, 0, 0.541), rgba(0, 0, 0, 0.548)), url(./images/b1.jpg);    background-position: center;
    background-size: cover !important;
    background-repeat: no-repeat !important;
    width: 100vw !important;
    height: 100vh !important;
    position: fixed !important;
    z-index: -22 !important;`;
    register_container.style.cssText=`background:linear-gradient(rgb(0 0 0 / 81%), rgb(0 0 0 / 79%)), url(./images/b1.jpg);    background-position: center;
    background-size: cover !important;
    background-repeat: no-repeat !important;
    width: 100% !important;
    height: 100% !important;
    position: fixed !important;
    `;
    
    layer.style.cssText=`background:linear-gradient(rgba(0, 0, 0, 0.541), rgba(0, 0, 0, 0.548)), url(./images/b1.jpg);    top: 0;
    position: fixed !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    background-size: cover !important;
    background-repeat: no-repeat !important;
    transition: 0.5s !important;`;
}

}
theme_displayer();



    // themes javascritp 
let setting_img_div=document.getElementById("setting_img_div")
let theme_outer=document.getElementById("theme_outer")
let theme_inner=document.getElementById("theme_inner")
let theme_closer=document.getElementById("theme_closer")

setting_img_div.addEventListener("click",()=>{
theme_outer.classList.remove("onone");
theme_outer.classList.add("oshow");


})

theme_closer.addEventListener("click",()=>{


theme_outer.classList.remove("oshow");
theme_outer.classList.add("onone");



});


let bar_condition=true;
bars.addEventListener("click",()=>{

    bars.classList.toggle("fa-bars");
    bars.classList.toggle("fa-times");
    
    
    if(bar_condition)                                
    {
        bar_condition= !bar_condition;
       ul.classList.toggle("dul_none");
       setTimeout(()=>{
            ul.classList.toggle("hidden");
            

    },200)
}else{
    bar_condition= !bar_condition;
    ul.classList.toggle("hidden");
    setTimeout(()=>{
        ul.classList.toggle("dul_none");
         

 },900)
}
});

(
    function (){
        let th=localStorage.getItem("theme");

        theme_changer(+(th));
    }
)();


toggle_sign_logout.addEventListener("click", async ()=>{
   let text = toggle_sign_logout.innerHTML;
   text = text.trim();
//    console.log(text);
   if(text == "Sign In")
   {
    sign_in_container.classList.add("zhigh");
    sign_in_container.classList.remove("znone");
    }
    else{
    
       let res=await request_db_token("/Sign_out","POST");
       if(res.status==true)
       {
           show_alert(res.message);
           set_local_storage_data([]);
           window.location.reload();
        }else{
           show_alert(res.message);

       }
       
   }
})
register_user.addEventListener("click",()=>{
    register_container.classList.add("zhigh");
    register_container.classList.remove("znone");
})
close_form.addEventListener("click",()=>{
    register_container.classList.add("znone");
    register_container.classList.remove("zhigh");
    Register_form.classList.remove("dnone");
    register_verification.classList.add("dnone");
    user="";
    input.forEach((v,i)=>input[i].value="");

})
close_form_signin.addEventListener("click",close_sign_in_page)
function close_sign_in_page() 
{
    sign_in_container.classList.add("znone");
    sign_in_container.classList.remove("zhigh");

    sign_in_form.classList.remove("dnone");
    forget_form.classList.add("dnone");
    reset_password_verification.classList.add("dnone");
    reset_password_form.classList.add("dnone");
    sign_in_pass_field.value="";
    sign_in_email_field.value="";
    new_password_field.value="";
    reset_pass_verifi_field.value="";
    forget_form_email.value="";
}    


// form validation starting here 





Register_form.onsubmit=(e)=>e.preventDefault();
register_verification.onsubmit=(e)=>e.preventDefault();
// registeration code 
register_btn.addEventListener("click",async ()=>{
     user= {
        name:input[0].value,
        email:input[1].value,
        password:input[2].value,
        c_password:input[3].value
    }
    if(user.password !=user.c_password)
    {
       
        show_alert("Password & Conform Password must be same !");
    }
    else if(!user.name || !user.c_password || !user.email || !user.password)
    {
        show_alert("Empty Fields not allowed !");
        
    }else if(user.password.length <5 || user.password.length > 15)
    {
        show_alert("Password length must be between 5 to 15 characters long");

    }else{
        
        let res= await request_db("/check_avaiable_mail","POST",user);
        if(res.status==true)
        {
            show_alert(res.message);
    input.forEach((v,i)=>input[i].value="");
    Register_form.classList.add("dnone");
    register_verification.classList.remove("dnone");
        }else{
            show_alert(res.message);

        }

    }
  

 })


 register_verification_btn.addEventListener("click",async ()=>{
     let code =register_verification_input.value;
     user={...user,code};
     let res= await request_db("/compare_code","POST",user);
     if(res.status==true)
     {

     let res2= await request_db("/register","POST",user);
        if(res2.status==true)
        {

            
            show_alert(res2.message);
            register_verification_input.value="";
            register_container.classList.add("znone");
            register_container.classList.remove("zhigh");
            Register_form.classList.remove("dnone");
            register_verification.classList.add("dnone");
            user="";
        }else{
            
            show_alert(res2.message);
        }



     }else{
         show_alert(res.message);

     }
 })
 //_________________________________________________________
 // sign in  & forget password 


 forget_form.onsubmit=(e)=>e.preventDefault();
 sign_in_form.onsubmit=(e)=>e.preventDefault();
 reset_password_form.onsubmit=(e)=>e.preventDefault();
 reset_password_verification.onsubmit=(e)=>e.preventDefault();


 forget_btn.addEventListener("click",show_forget_page);
 forget_btn.addEventListener("click",show_forget_page);
 function show_forget_page() 
 {
   sign_in_form.classList.add("dnone");
   forget_form.classList.remove("dnone");
     
 }
 function show_reset_pass_verification_form() 
 {
   sign_in_form.classList.add("dnone");
   forget_form.classList.add("dnone");
   reset_password_verification.classList.remove("dnone");
   
 }
 function  show_reset_password_form()
 {
    sign_in_form.classList.add("dnone");
    forget_form.classList.add("dnone");
    reset_password_verification.classList.add("dnone");
    reset_password_form.classList.remove("dnone");

 }
//********************************************** */
forget_form_btn.addEventListener("click", async ()=>{
let email= forget_form_email.value;
if(!email){  show_alert("Fill all the fields !") }
else
{
    let res= await request_db("/if_email_present_send_verif_code","POST",{email});

       if(res.status==true)
       {
        show_reset_pass_verification_form();
       }
       else{
           show_alert(res.message);
       }
}

})
 //_________________________________________________________
 reset_pass_verifi_btn.addEventListener("click",async ()=>{
    let email= forget_form_email.value;

    let code=reset_pass_verifi_field.value;
if(!code)
{
    show_alert("Fill all the fields!");

}else
{

    let res= await request_db("/compare_code","POST",{email,code});
    if(res.status==true)
    {
        show_reset_password_form();
        show_alert(res.message);
    }else{
        show_alert(res.message);
    }
}


 })

 reset_passowrd_btn.addEventListener("click",async ()=>{
    let new_password=new_password_field.value;
    let email= forget_form_email.value;

    if(!new_password)
    {
        show_alert("Fill all the fields!");
    }
    else
    {
    let res= await request_db("/reset_password","POST",{email,new_password});
       if(res.status==true)
       {
           show_alert(res.message);
           close_sign_in_page();
        }else{

            show_alert(res.message);
        }

    }
 })

//            sign_IN 

sign_in_form_btn.addEventListener("click",async ()=>{

    let email= sign_in_email_field.value;
    let password= sign_in_pass_field.value;
    if(!email||!password){ show_alert("Fill all the fields !")}
    else
    {
        let res= await request_db("/sign_in","POST",{email,password});
        // console.log(res);
        if(res.status==true)
        {
            show_alert(res.message);

            close_sign_in_page();
           window.location.reload();

        }
        else{
            show_alert(res.message);

        }

    }

})

 //_________________________________________________________