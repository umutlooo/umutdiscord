// Açılış ekranı
window.addEventListener("load", () => {
  const loading = document.getElementById("loading-screen");
  setTimeout(() => loading.style.display = "none", 1500);
});

// Yazı efekti
const texts = ["Discord bot geliştiriyorum", "Web tasarımı yapıyorum", "Profesyonel işler üretiyorum"];
let index = 0, charIndex = 0;
const typingElement = document.getElementById("typing-text");
function type() {
  if (charIndex < texts[index].length) {
    typingElement.textContent += texts[index].charAt(charIndex);
    charIndex++;
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 1500);
  }
}
function erase() {
  if (charIndex > 0) {
    typingElement.textContent = texts[index].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, 50);
  } else {
    index = (index + 1) % texts.length;
    setTimeout(type, 300);
  }
}
document.addEventListener("DOMContentLoaded", type);

// Tema değiştirme
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const icon = themeToggle.querySelector("i");
  icon.classList.toggle("fa-sun");
  icon.classList.toggle("fa-moon");
});

// Mobil menü
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
menuToggle.addEventListener("click", () => navMenu.classList.toggle("show"));

// Discord tag kopyalama
const copyBtn = document.getElementById("copyBtn");
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText("umut#3131").then(() => {
    copyBtn.innerHTML = "<i class='fa-solid fa-check'></i> Kopyalandı!";
    setTimeout(() => {
      copyBtn.innerHTML = "<i class='fa-brands fa-discord'></i> <span id='discordTag'>umut#3131</span>";
    }, 1500);
  });
});

// Yetenek yüzdeleri (örnek veri)
const skills = [
  { name: "HTML", value: 90 },
  { name: "CSS", value: 75 },
  { name: "Discord.js", value: 99 }
];
const skillsGrid = document.querySelector(".skills-grid");
skills.forEach(skill => {
  const skillBox = document.createElement("div");
  skillBox.innerHTML = `
    <strong>${skill.name}</strong>
    <div class="bar-bg">
      <div class="bar-fill" style="width: ${skill.value}%; background-color: #00acee;">${skill.value}%</div>
    </div>
  `;
  skillsGrid.appendChild(skillBox);
});

// Projeler (örnek veri)
const projects = [
  {
    title: "Müzik Botu",
    desc: "Gelişmiş oynatma listesi, filtre desteğiyle Discord müzik botu.",
    category: "discord",
    images: ["https://dummyimage.com/600x400/00acee/fff&text=Müzik+Botu"],
    link: "#"
  },
  {
    title: "Portföy Sitesi",
    desc: "Kişisel tanıtım için mobil uyumlu portföy sitesi.",
    category: "web",
    images: ["https://dummyimage.com/600x400/292929/fff&text=Portföy+Site"],
    link: "#"
  }
];

const projectGrid = document.querySelector(".projects-grid");
const filters = document.querySelectorAll(".filter-btn");
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalLink = document.getElementById("modalLink");
const carouselImages = document.querySelector(".carousel-images");

function renderProjects(filter = "all") {
  projectGrid.innerHTML = "";
  const filtered = filter === "all" ? projects : projects.filter(p => p.category === filter);
  filtered.forEach((p, i) => {
    const card = document.createElement("div");
    card.classList.add("project-card");
    card.innerHTML = `
      <img src="${p.images[0]}" alt="${p.title}" width="100%" />
      <h4>${p.title}</h4>
      <p>${p.desc}</p>
    `;
    card.addEventListener("click", () => openModal(p));
    projectGrid.appendChild(card);
  });
}
renderProjects();

filters.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter-btn.active").classList.remove("active");
    btn.classList.add("active");
    renderProjects(btn.dataset.filter);
  });
});

// Modal işlevleri
function openModal(project) {
  modalTitle.textContent = project.title;
  modalDesc.textContent = project.desc;
  modalLink.href = project.link;
  carouselImages.innerHTML = "";
  project.images.forEach((src, i) => {
    const img = document.createElement("img");
    img.src = src;
    if (i === 0) img.classList.add("active");
    carouselImages.appendChild(img);
  });
  modal.style.display = "flex";
}
document.getElementById("closeModal").addEventListener("click", () => modal.style.display = "none");
modal.addEventListener("click", e => {
  if (e.target === modal) modal.style.display = "none";
});

// Carousel
let currentSlide = 0;
document.querySelector(".carousel-btn.next").addEventListener("click", () => changeSlide(1));
document.querySelector(".carousel-btn.prev").addEventListener("click", () => changeSlide(-1));
function changeSlide(dir) {
  const slides = document.querySelectorAll(".carousel-images img");
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + dir + slides.length) % slides.length;
  slides[currentSlide].classList.add("active");
}

// İletişim Formu (sahte gönderim)
const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  formMessage.textContent = "Mesajınız gönderildi! (Demo)";
  form.reset();
});
