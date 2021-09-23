//global  variables 

let t_address_opened_note;
const empty = `<h1 id="empty">EMPTY...</h1>`;

//global  variables 
// variables 
let search_tag = document.getElementById('search_tag')
let note_parent = document.getElementById('note_section')
let notes_container = document.getElementById('notes_container')
let textarea = document.getElementById('textarea')
let input_title = document.getElementById('input_title')
let textarea_parent = document.getElementById('textarea_parent')

let editor_div = document.querySelector('#editor');
let layer = document.querySelector('#layer');
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
display_notes();

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
        console.log("save function working ");
    }
    else {

        let raw_data = get_local_storage_data();
        raw_data[temp_index][1] = textarea.value;
        raw_data[temp_index][0] = input_title.value;




        set_local_storage_data(raw_data);
        display_notes();



    }
}
// *********************************************
// functions





function show_query_result() {



    let temp_notes_for_query = document.querySelectorAll(".note");
    let child_title = document.querySelectorAll(".note > .title");
    let child_content = document.querySelectorAll(".note > .content");
    console.log(child_title);
    console.log(child_content);
    let query = search_tag.value;
    query = query.trim();
    if (query == "") {

        temp_notes_for_query.forEach((element, index) => {

            element.classList.remove("dnone");
            display_notes();
            console.log("display called");
        })
    }
    else {
        console.log(temp_notes_for_query);

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
    background_theme.style.cssText=`background:linear-gradient(rgba(0, 0, 0, 0.541), rgba(0, 0, 0, 0.548)), url(./images/b${+(th)+1}.jpg);    background-position: center;
    background-size: cover !important;
    background-repeat: no-repeat !important;
    width: 100vw !important;
    height: 100vh !important;
    position: fixed !important;
    z-index: -22 !important;`;

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




(
    function (){
        let th=localStorage.getItem("theme");

        theme_changer(+(th));
    }
)();