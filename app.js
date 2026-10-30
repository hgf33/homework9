// Initialize Variables
let name = "Hugo Figueroa";
let hasDownloadedResume = false;
let endDate = "2026-10-31";
let remainingDays = daysUntilDeadline(endDate);
let downloadCount = 0;
let projects = [
    {
        title: "DNA",
        description: "The DNA rpoject was made from an assignment. Throughout this coding system, I made the code from C+. I had it generate random DNA sequenmces. Then from a file which contrains many DNA sequences, It read throught the file and try to match what DNA seqence matched the one that was randomized. I5t6 counts how many matches there were.", 
        deadline:new Date("2026-02-01")
    },

    {
        title: "Tower of Hanoi",
        description: "Tower of Hanoi is a project that I made via code in C+. This code was made to look store the smallest-biggest disc from the far left to the far right. The game only has three section where the disk can be placed. The larger disc cannot go on top of a smaller disc. The code was made to auto do it its self. It checks of the disc in a section is bigger than the one that is in the section. If its smaller then it can be placed, if not then i cannot be placed. By the end of the code, tyhe 5 disc smallest on top largest on the bottom are all tranfered to the other side of the board.",
        deadline:new Date("2026-04-01")
    },

    {
        title: "Halloween Shop Project",
        description: "A project about serving ustomsers a scary gift, each gift has a trick or a treat. The project stores was the trick was and what was the treat, then increments for a treat and a trick.",
        deadline:   new Date("2026-10-31")

    }

]


let skills = [];
let navigation = [
    "Summary",
    "About-me",
    "Skills",
    "Projects",
    "Education-and-Experience"
];



const button = document.querySelector('button');

// Making if function to check if the button was pressed
// if it were pressed, it makes the variable hasDownloadedResume true
// clicking the button will not trigger again
if(button) {
    

    button.addEventListener('click', () => { 
    if (hasDownloadedResume === false) {
    alert("Your resume is downloaded successfully!");
    hasDownloadedResume = true;
    downloaded();
    }else{
        downloaded();
    }});

}



// function called showGreetings with name as a parameter.
// this function returns my name in the HTML
function showGreeting(name) {
    return "Hello, my name is " + name + "! Welcome to my portfolio!";
}


// function called daysUntilDeadline with endDate as a parameter.
// this calculated todays date with the project due and compares it with the endDate variable
// it calculates how many days left till the project is due.
function daysUntilDeadline(endDate) {
    let currentDate = new Date();
    let end = new Date(endDate);
    let timeDifference = end - currentDate;
    let daysDifference = timeDifference / (1000 * 3600 * 24); 
    return Math.trunc(daysDifference);
}


// checks if the remainings day of the project has not met the deadline
// if it hasn't it'll say "ongoing", othewise it will say completed
if(remainingDays >= 0) {
    document.querySelector("#status").textContent = "Ongoing";
}else{
    document.querySelector("#status").textContent = "Completed";
}

//function called downloaded, 
// increments how many times the download button has been clicked
function downloaded() {
    downloadCount++;
    const countElement = document.querySelector('.count');
    countElement.textContent = downloadCount + " downloads";
}



// fuction called addToSkills,
// it takes what the user types on the screen in the chat text
// once the user hits the submit button, that skill is added to the webstie

//--Step 4--
// checks if the key was pressed
// the callback function is used and the function enterEscape is called with the key as the argument
$(document).keydown(function(event){
    enterEscape(event.key)
})

// function enterEscape as key as a parameter
// this function checks if you hit enter when you type somethings down in the addskills section in skills,
// the skill is added, function addeditRemove is called
// but if you hit escape anywhere, the skills you had added will all be cleared
function enterEscape(key) {
    if(key === "Enter"){
        addEditRemove();
    }
    else if(key === "Escape")
    {
        for(let i = 0; i < skills.length; i++){
            $(".remove_" + i).closest("li").remove();
            skills[i] = '';
        }
        
    }
}

//--Step 1--
// function addEditRemove is created
// in this functuon, the text value you typed will be in text and be stored in a variable called 'text'
// if text is not empty, the function ifSkillisIn is called to check if the text you inputed is in the array called "skills"
// if the text is in the array, itll skip pass through and does not add the text you inputed...but if its not there, the text will be added in the array..
// and the skills will be shown to the user with two buttons...remove and edit, also the text will fade it
function addEditRemove() {
    let text = $("#newSkills").val();
        
        if (text !== "") {
            let check = ifSkillisIn(text);
            if(check === true)
            {
                skills[skills.length] = text;
                var $newItem = $('<li>' + text + '<button class="remove_' + (skills.length - 1) + '"onclick="removeSkill(' + (skills.length - 1) +')">Remove</button> <button class="edit_' + (skills.length - 1) + '" onclick="editSkill(' + (skills.length - 1) + ')">Edit</button></li>').hide();
                $("#list").append($newItem);
                $newItem.fadeIn();
                $("#newSkills").val("");
            }
            
        }

} 

// function removeSkill with id as a parameter
// in this function, if you hit the button remove in the new skill added, the skill will be removed and the skill in the array will be removed
function removeSkill(id) {
    $(".remove_" + id).on('click', function() {
        $(this).closest("li").remove();
    });
    skills[id] = '';
}

// function editSkills with id as a parameter
// in this function, it allows the user to edit with a prompts being asked
// it checks if the edits exists and does nothing if it does, but if it doesn't then the orignal skill is replaced...as well as the skill in the array
function editSkill(id) {
    let editSkill = prompt("Edit Skill", skills[id]);
    if(editSkill !== ''){
        $(".edit_" + id).closest("li").contents().first().replaceWith(editSkill);
        skills[id] = editSkill;
    }
    else{
        alert("Skill already exist");
    }
    
    
}

// function ifSKillisIn with skill as a parameter
// the function checks if the skill is in the array called Skills
// if its in the array itll return false through a for loop...but if the skill is not in the array, itll come out as true.
function ifSkillisIn(skill) {
    for(i = 0; i < skills.length; i++){
        if(skill === skills[i])
        {
            return false;
        }
    }
    return true;
}


//--Step 3--
// this section checks and sorts the what the oldest and the latest projects were
projects.sort(function(latest, oldest) {
    return latest.deadline - oldest.deadline;
});

// in this for loop, the projects with its title, description. and deadline dates are added in the HTML file
for(let i = 0; i < projects.length; i++){
    $(".mproject").append("<h4>" + projects[i].title + "</h4><p>" + projects[i].description + "</p><p>Due Date: " +projects[i].deadline.toLocaleDateString() + "</p>");
}

//--Step 2--
// function navigationBar
// in this function, the for loop dynamically looks through the array called navigation
// as it goes through the for loop, the words in the array goes through and gets added into the HTML and with a hyper link.
function navigationBar() {
    for(let i = 0; i < navigation.length; i++){
        $(".sidebar .section").append('<p><a href="#' + navigation[i].toLowerCase() + '" >' + navigation[i] + '</a></p>');
    }
}

// in this section of the code, the navigationBar function is called so it can appear in the HTML
// when you click on the hyper link, it animates and navigates the user to the section they have clicked with 800 milisecond delay.
$(document).ready(function(){
    navigationBar();
    $(".sidebar .section a").click(function(event){

        let section = $(this).attr("href");

        $('.main-content').animate({ scrollTop: $(".main-content").scrollTop() + $(section).position().top}, 800);
    });
});

