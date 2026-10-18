const weddingDate = new Date("2026-10-23T09:00:00+07:00").getTime();
const timer = setInterval(updateCountdown, 1000);

const rsvpForm = document.getElementById('rsvpForm');
const guestGroup = document.getElementById('guestGroup');

// observer untuk story cads animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        entry.target.classList.toggle('show', entry.isIntersecting);
    });
}, {
    threshold: 0.2
});

document.querySelectorAll('.slide').forEach((el) => observer.observe(el));

// event listener untuk navbar
window.addEventListener("scroll", () => {
  document.querySelector(".navbar").classList.toggle("scrolled", window.scrollY > 50);
});

// countdown function
function updateCountdown(){
    const timeLeft = weddingDate - Date.now();
    
    if (timeLeft <= 0) {
      document.getElementById("countdown").innerHTML = "<h2>We're married!</h2>";
      clearInterval(timer); 
      return;
    }

    document.getElementById("days").textContent = Math.floor(timeLeft / (1000*60*60*24));
    document.getElementById("hours").textContent = Math.floor((timeLeft / (1000*60*60)) % 24);
    document.getElementById("minutes").textContent = Math.floor((timeLeft / (1000*60)) % 60);
    document.getElementById("seconds").textContent = Math.floor((timeLeft / 1000) % 60);
}

updateCountdown();


// eventlistener untuk rsvp form submition
rsvpForm.addEventListener('submit', e => {
    e.preventDefault();
    rsvpForm.classList.add('was-validated');
    if (!rsvpForm.checkValidity()) return;

    const data = {
        name: document.getElementById('rsvpName').value,
        email: document.getElementById('rsvpEmail').value,
        phone: document.getElementById('rsvpPhone').value, 
        attending: document.querySelector('input[name="attending"]:checked').value,
        guests: document.getElementById('rsvpGuests').value,
        message: document.getElementById('rsvpMessage').value
    };
    console.log(data);

    rsvpForm.style.display = 'none';
    document.getElementById('rsvpThanks').style.display = 'block';
});