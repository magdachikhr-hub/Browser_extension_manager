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
    div.innerHTML = `<div class="card">
      <div class="upper">
        <img src="" alt="" />
        <div class="text">
          <h3></h3>
          <p></p>
        </div>
      </div>
      <div class="lower">
        <button class="remove">remove</button>
        <input type="checkbox" id="" />
      </div>
    </div>`;
  });
}
