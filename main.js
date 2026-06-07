const container = document.querySelector(".container");

const allBtn = document.querySelector(".all");
const activeBtn = document.querySelector(".active");
const inactiveBtn = document.querySelector(".inactive");

const base_URL = "http://localhost:3000/extentions";

async function getExtentions() {
  const response = await fetch(base_URL);
  const data = await response.json();
  renderExtentions(data);
  //   console.log(data);

  activeBtn.addEventListener("click", () => {
    const activeExtentions = data.filter((el) => el.isActive);
    console.log(activeExtentions);
    renderExtentions(activeExtentions);
  });

  inactiveBtn.addEventListener("click", () => {
    const inactiveExtentions = data.filter((el) => !el.isActive);
    renderExtentions(inactiveExtentions);
  });
  allBtn.addEventListener("click", () => {
    renderExtentions(data);
  });
}

getExtentions();

function renderExtentions(arr) {
  container.innerHTML = "";
  console.log(arr);
  console.log(container);
  arr.forEach((ext) => {
    console.log(ext);
    const div = document.createElement("div");
    div.classList.add("card");
    console.log(div);
    div.innerHTML = `<div class="upper">
        <img src="${ext.logo}" alt="">
        <div class="text">
          <h3>${ext.name}</h3>
          <p>${ext.description}</p>
        </div>
      </div>
      <div class="lower">
        <button class="remove" id="${ext.id}">Remove</button>
     <input type="checkbox" id="${ext.id}" ${ext.isActive ? "checked" : ""}>
      </div>`;
    container.append(div);
  });
}

container.addEventListener("click", async function deleteExtentions(e) {
  console.log(e.target.classList);
  if (!e.target.classList.contains("remove")) return;
  const id = e.target.id;
  const response = await fetch(`${base_URL}/${id}`, {
    method: "DELETE",
  });
  getExtentions();
});

container.addEventListener("click", async function updateCheckbox(e) {
  console.log(e.target.type);
  if (e.target.type !== "checkbox") return;

  const id = e.target.id;

  const isChecked = e.target.checked;

  const response = await fetch(`${base_URL}/${id}`, {
    method: "PATCH",
    "content-type": "application/json",
    body: JSON.stringify({
      isActive: isChecked,
    }),
  });
});
