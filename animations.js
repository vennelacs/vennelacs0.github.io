/* Fade‑out transition for internal links */
document.querySelectorAll("a").forEach(link => {
  if (link.hostname === location.hostname && !link.hash) {
    link.addEventListener("click", e => {
      e.preventDefault();
      document.body.classList.add("fade-out");
      setTimeout(() => (window.location = link.href), 300);
    });
  }
});

/* Reveal sections on scroll */
const sections = document.querySelectorAll("section");
function reveal() {
  sections.forEach(sec => {
    if (sec.getBoundingClientRect().top < window.innerHeight - 100) {
      sec.classList.add("visible");
    }
  });
}
window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);

/* Typing effect for tagline (runs once on load) */
window.addEventListener("load", () => {
  const tag = document.querySelector(".tagline");
  const txt = tag.innerText;
  tag.innerText = "";
  [...txt].forEach((ch, i) =>
    setTimeout(() => (tag.innerText += ch), 60 * i)
  );
});

/* Hearts on scroll */
document.addEventListener("scroll", () => {
  const heart = document.createElement("div");
  heart.className = "floating-heart";
  heart.style.left = `${Math.random() * 100}%`;
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 3000);
});

/* Sparkle trail on mouse‑move */
const canvas = document.getElementById("sparkle-canvas"),
      ctx = canvas.getContext("2d");
canvas.width = innerWidth; canvas.height = innerHeight;
let sparkles = [];
addEventListener("mousemove", e => {
  for (let i = 0; i < 5; i++)
    sparkles.push({x:e.clientX,y:e.clientY,size:Math.random()*2+1,alpha:1,
                   dx:(Math.random()-.5)*2,dy:(Math.random()-.5)*2});
});
function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  sparkles = sparkles.filter(s=>{
    ctx.fillStyle=`rgba(255,192,203,${s.alpha})`;
    ctx.beginPath();ctx.arc(s.x,s.y,s.size,0,2*Math.PI);ctx.fill();
    s.x+=s.dx;s.y+=s.dy;s.alpha-=.02;
    return s.alpha>0;
  });
  requestAnimationFrame(draw);
}
draw();
addEventListener("resize",()=>{canvas.width=innerWidth;canvas.height=innerHeight});
