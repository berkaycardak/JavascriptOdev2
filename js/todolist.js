const TASKDOM = document.querySelector("#task");
const LISTDOM = document.querySelector("#list");
const TODOLIST = localStorage.getItem("todolist");
const BTNADD = document.querySelector("#liveToastBtn");
const TOAST = document.querySelectorAll("#liveToast");

if (TODOLIST) LISTDOM.innerHTML = JSON.parse(TODOLIST);

function newElement() {
  const LI = document.createElement("li");
  const TASK = TASKDOM.value.trim(); // set TASK value to input and remove white space

  if (TASK) {
    LI.textContent = TASK;
    if (LI) {
      const DELETE = document.createElement("span");
      DELETE.innerHTML = "&times;";
      DELETE.classList.add("close");
      DELETE.addEventListener("click", () => removeElement(LI));
      LI.appendChild(DELETE);
      LISTDOM.appendChild(LI);
      $(TOAST[0]).toast("show");
      TASKDOM.value = ""; // removed the input field
      saveToLocalStorage(LISTDOM);
    }
  } else {
    $(TOAST[1]).toast("show");
    return;
  }

  LI.addEventListener("click", () => {
    if (LI.classList.contains("checked")) LI.classList.remove("checked");
    else LI.classList.add("checked");
    saveToLocalStorage(LISTDOM);
  });
}

document.querySelectorAll("#list > li").forEach((item) => {
  item.addEventListener("click", () => {
    if (item.classList.contains("checked")) item.classList.remove("checked");
    else item.classList.add("checked");
    saveToLocalStorage(LISTDOM);
  });
});

document.querySelectorAll("#list span").forEach((item) => {
  let li = item.parentNode;
  item.addEventListener("click", () => {
    removeElement(li);
  });
});

const removeElement = (element) => {
  element.remove();
  saveToLocalStorage(LISTDOM);
};

document.addEventListener("keypress", (event) => {
  if (event.key === "Enter") newElement();
});

function saveToLocalStorage(item) {
  localStorage.setItem("todolist", JSON.stringify(item.innerHTML));
}