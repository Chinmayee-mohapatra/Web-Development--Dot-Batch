const searchbar = document.querySelector(".searchbar-container");
const profilecontainer = document.querySelector(".profile-container");
const root = document.documentElement.style;
const url = "https://api.github.com/users/";
const get = (param) => document.getElementById(`${param}`);
const noresults = get("no-results");
const avatar = get("avatar");
const username = get("name");
const user = get("user");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
const date = get("date");
const bio = get("bio");
const repos = get("repos");
const followers = get("followers");
const following = get("following");
const user_location = get("location");
const website = get("website");
const twitter = get("twitter");
const company = get("company");
const submit = get("submit");
const input = get("input"); 
const btn_mode = get("btn-mode");
const btn_text = get("btn-text");
const mode_icon = get("mode-icon");
let darkMode = false;

// add event listener to the search-bar that takes username as input.
input.addEventListener(
    "keydown",
    function (e) {
      if (e.key == "Enter") {
        if (input.value !== "") {
          getUserData(url + input.value);
        }
      }
    },
    false
  );
  
  input.addEventListener("input", function () {
    noresults.style.display = "none";
  });

// dark-mode onClick event listener 
btn_mode.addEventListener("click", function () {
    if(darkMode == false) {
        darkModeProperties();
    }
    else {
        lightModeProperties();
    }
});

const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

if(localStorage.getItem("dark-mode")) {
    darkMode = localStorage.getItem("dark-mode");
    darkModeProperties();
} else {
    localStorage.setItem("dark-mode", prefersDarkMode);
    darkMode = prefersDarkMode;
    lightModeProperties();
}

function darkModeProperties() {
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
    btn_text.innerText = "LIGHT";
    mode_icon.src = "./assets/images/sun-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(1000%)");
    darkMode = true;
    localStorage.setItem("dark-mode", true);
}

function lightModeProperties() {
    root.setProperty("--lm-bg", "#F6F8FF");
    root.setProperty("--lm-bg-content", "#FEFEFE");
    root.setProperty("--lm-text", "#4B6A9B");
    root.setProperty("--lm-text-alt", "#2B3442");
    root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
    btn_text.innerText = "DARK";
    mode_icon.src = "./assets/images/moon-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(100%)");
    darkMode = false;
    localStorage.setItem("dark-mode", false);
}

// submit username for API call using event listener.
submit.addEventListener("click", function() {
    if(input.value !== "") {
        getUserInfo(url+input.value);
    }
});

// update user data on UI
function updateProfile(data) {
    if(data.message !== "Not Found"){
        noresults.style.display = "none";
        function checkNull(param1, param2) {
            if(param1 === "" || param1 === null) {
                param2.style.opacity = 0.5;
                param2.previousElementSibling.style.opacity = 0.5;
                return false;
            } 
            else {
                return true;
            }
        }

        avatar.src = `${data.avatar_url}`;
        username.innerText = data.username === null ? `${data.login}` : `${data.name}`;
        user.innerText = `@${data.login}`;
        user.href = `${data.html_url}`;
        datedata = data.created_at.split("T").shift().split("-");
        date.innerText = `Joined ${datedata[2]} ${months[datedata[1]-1]} ${datedata[0]}`;
        bio.innerText = data.bio === null ? "This profile has no bio" : `${data.bio}`;
        repos.innerText = `${data.public_repos}`;
        followers.innerText = `${data.followers}`;
        following.innerText = `${data.following}`;
        user_location.innerText = data.location !== null ? data.location : "Not Available";
        
        website.innerText = checkNull(data.blog, website) ? data.blog : "Not Available";
        website.href = checkNull(data.blog, website) ? data.blog : "#";
        
        twitter.innerText = checkNull(data.twitter_username, twitter) ? data.twitter_username : "Not Available";
        twitter.href = checkNull(data.twitter_username, twitter) ? `https://twitter.com/${data.twitter_username}` : "#";
        
        company.innerText = data.company !== null ? data.company : "Not Available";
        searchbar.classList.toggle("active");
        profilecontainer.classList.toggle("active");
    } 
    else {
        noresults.style.display = "block";
    }
}


// API_CALL:
function getUserInfo(username) {
    fetch(username)
        .then((response) => response.json())
        .then((data) => 
        {
            console.log(data);
            updateProfile(data);
        })
        .catch((error) => {
            throw(error);
        });

}

getUserInfo(url+"Chinmayee-mohapatra");