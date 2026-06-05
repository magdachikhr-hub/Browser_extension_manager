const container = document.querySelector(".container");

async function getExtentions() {
  const response = await fetch("http://localhost:3000/extentions");
  const data = await response.json();
  renderExtentions(data);
  //   console.log(data);
}

getExtentions();

function renderExtentions(arr) {
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
  const response = await fetch(`http://localhost:3000/extentions/${id}`, {
    method: "DELETE",
  });
  getExtentions();
});

container.addEventListener("click", async function updateCheckbox(e) {
  console.log(e.target.type);
  if (e.target.type !== "checkbox") return;

  const id = e.target.id;

  const isChecked = e.target.checked;

  const response = await fetch(`http://localhost:3000/extentions/${id}`, {
    method: "PATCH",
    "content-type": "application/json",
    body: JSON.stringify({
      isActive: isChecked,
    }),
  });
});
