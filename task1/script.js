const menu = document.querySelector(".menu");

menu.addEventListener("click", openMenu);

function openMenu() {
  document.querySelector(".drop").classList.toggle("active");
}
