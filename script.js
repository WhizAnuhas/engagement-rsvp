/********************** 
 RSVP FORM 
***********************/
const form = document.getElementById("rsvpForm");
const successMessage = document.getElementById("successMessage");
const submitBtn = document.getElementById("submitBtn");

// put your google apps script url
const GOOGLE_URL = "https://script.google.com/macros/s/AKfycbz_bkRJ7Gkqe5Sqo6L8PBd2EeifPyQR3UOVrRjle3TSpwwbjPGMxdBadie9FujSBagt/exec";

form.addEventListener("submit", async function(e){
  e.preventDefault();

  // form fields
  const nameVal = document.getElementById("name").value.trim();
  const phoneVal = document.getElementById("phone").value.trim();
  const guestsVal = document.getElementById("guests").value;
  const messageVal = document.getElementById("message").value;
  const attendanceVal = document.getElementById("attendance").value;

  // basic validation
  if(!nameVal || !phoneVal){
    alert("Please enter name and phone number");
    return;
  }

  submitBtn.innerText = "Submitting...";
  submitBtn.disabled = true;

  const data = {
    name: nameVal,
    phone: phoneVal,
    guests: guestsVal,
    message: messageVal,
    attendance: attendanceVal
  };

  try {
    await fetch(GOOGLE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    successMessage.classList.remove("hidden");
    form.reset();

  } catch(err){
    console.error(err);
    alert("Could not submit RSVP. Try again.");
  }

  submitBtn.innerText = "Submit RSVP";
  submitBtn.disabled = false;
});


/********************** 
 COUNTDOWN 
***********************/
const weddingDate = new Date("March 16, 2026 08:50:00");

setInterval(() => {
  const now = new Date();
  const diff = weddingDate - now;

  if(diff < 0){
    document.getElementById("countdown").innerText = "🎉 Wedding Day is Here!";
    return;
  }

  const days = Math.floor(diff / (1000*60*60*24));
  const hours = Math.floor((diff / (1000*60*60)) % 24);
  const minutes = Math.floor((diff / (1000*60)) % 60);

  document.getElementById("countdown").innerText =
    `${days} Days ${hours} Hours ${minutes} Minutes`;

}, 1000);


/********************** 
 SLIDER 
***********************/
const sliderImages = [
  "https://picsum.photos/1200/600?1",
  "https://picsum.photos/1200/600?2",
  "https://picsum.photos/1200/600?3"
];

let current = 0;

setInterval(()=>{
  current = (current+1) % sliderImages.length;
  document.getElementById("slide").src = sliderImages[current];
}, 3000);


/********************** 
 DARK MODE (saved)
***********************/
const darkToggle = document.getElementById("darkToggle");

if(localStorage.getItem("darkMode")==="on"){
  document.body.classList.add("dark");
}

darkToggle.onclick = ()=>{
  document.body.classList.toggle("dark");

  if(document.body.classList.contains("dark")){
    localStorage.setItem("darkMode","on");
  } else {
    localStorage.setItem("darkMode","off");
  }
};


/********************** 
 PASSWORD LOCK 
***********************/
function unlock(){
  const pwd = document.getElementById("pwdInput").value;

  if(pwd === "wedding123"){
    document.getElementById("lockScreen").classList.add("hiddenLock");
  } else {
    alert("Wrong password");
  }
}


/********************** 
 MUSIC 
***********************/
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

musicBtn.onclick = ()=>{
  if(music.paused){
    music.play();
    musicBtn.innerText = "Pause Music";
  } else {
    music.pause();
    musicBtn.innerText = "Play Music";
  }
};


/********************** 
 TIMELINE ANIMATION 
***********************/
const events = document.querySelectorAll(".event");

function checkTimeline(){
  const trigger = window.innerHeight * 0.85;

  events.forEach(e=>{
    const top = e.getBoundingClientRect().top;
    if(top < trigger){
      e.classList.add("show");
    }
  });
}

window.addEventListener("scroll", checkTimeline);
checkTimeline();

/********************** 
 OPEN MAP 
***********************/
function openMap(){
  window.open("https://maps.google.com?q=Your+Wedding+Location");
}
