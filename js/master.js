let name = document.getElementById("name");
let url = document.getElementById("url");
let btn = document.getElementById("add-url");

let result = localStorage.getItem("urlData")
  ? JSON.parse(localStorage.getItem("urlData"))
  : [];

let validName = false;
let validUrl = false;
btn.addEventListener("click", function () {
  if (validName && validUrl) {
    let data = {
      name: name.value,
      url: url.value,
    };

    name.value = "";
    url.value = "";

    result.push(data);
    localStorage.setItem("urlData", JSON.stringify(result));
    addLink();
  } else {
    notValid();
  }
});

function notValid() {
  document.getElementById("modalBtn").click();
}

// Add Method
function addLink() {
  defaultSetting();

  let box = ``;
  for (let i = 0; i < result.length; i++) {
    box += `
    <tr>
    <th scope="row">${i + 1}</th>
    <td>${result[i].name}</td>
    <td>
    <a href="${
      result[i].url
    }" class="btn btn-success" target="_blank"><i class="fa-solid fa-eye pe-2"></i> Visit</a></td>
        <td>
        <a onClick="deleteModal(${i})" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#delete"> <i class="fa-solid fa-trash-can"></i> Delete</a>
        </td>
    </tr>
    `;
  }

  document.getElementById("demo").innerHTML = box;
}
addLink();

// Delete Modal
function deleteModal(index) {
  let box = ` <div class="modal-content">
    <div class="modal-header border-0">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body ">
        <p>"Are you sure you want to delete the URL named '${
          result[index].name
        }' at index ${index + 1}?"</p>
    </div>
    <div class="modal-footer ">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="cancel">Cansel</button>
        <button onClick="deleteUrl(${index})" type="button" class="btn btn-primary">Yes</button>
    </div>
</div>`;
  document.getElementById("deleteModal").innerHTML = box;
}

// Delete Method
function deleteUrl(index) {
  document.getElementById("cancel").click();
  result.splice(index, 1);
  localStorage.setItem("urlData", JSON.stringify(result));
  addLink();
}

// Real Time Validation

let reg =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/gi;

name.addEventListener("keyup", function () {
  // name
  if (name.value.length < 3) {
    name.classList.add("is-invalid");
    validName = false;
  } else {
    validName = true;
    name.classList.remove("is-invalid");
    name.classList.add("is-valid");
  }
});

url.addEventListener("keyup", function () {
  // url
  if (!url.value.match(reg)) {
    url.classList.add("is-invalid");
    validUrl = false;
  } else {
    validUrl = true;
    url.classList.remove("is-invalid");
    url.classList.add("is-valid");
  }
});

function removeClass(element, className) {
  element.classList.remove(className);
}
function addClass(element, className) {
  element.classList.add(className);
}

function defaultSetting() {
  validName = false;
  validUrl = false;
  name.classList.remove("is-valid");
  url.classList.remove("is-valid");
}
