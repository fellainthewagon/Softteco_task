const container = document.querySelector(".container");
const dropDown = document.querySelector(".drop");
const list = document.querySelector(".list");

container.addEventListener("click", (e) => {
  if (
    dropDown.classList.contains("active") &&
    e.target.closest(".list") === list
  )
    return;

  if (e.target.className === "menu") {
    dropDown.classList.toggle("active");
  } else {
    dropDown.classList.remove("active");
  }
});
