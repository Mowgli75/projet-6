import { updateUi } from "./script.js";

const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");
const modalContainer2 = document.querySelector(".second-modal");
const modalTriggers2 = document.querySelectorAll(".modal-trigger2");
const addPicture = document.querySelector(".img-add-modal2");
const formModal2El = document.querySelector("#modal2-form");
const inputFileModalElement = document.querySelector("#input-file");

const sessionToken = sessionStorage.getItem("token");

/* event clic pour la 1ere modal */

modalTriggers.forEach((trigger) =>
  trigger.addEventListener("click", toggleModal)
);
document.querySelector(".modal").addEventListener("click", (e) => {
  e.stopPropagation();
});
document.querySelector(".second-modal").addEventListener("click", (e) => {
  e.stopPropagation();
});

function toggleModal() {
  modalContainer.classList.toggle("active");
  document.querySelector(".modal").classList.add("active");
}

document.querySelector(".close-modal").addEventListener("click", () => {
  document.querySelector(".modal").classList.remove("active");
});

/* event clic pour la 2eme modal */

modalTriggers2.forEach((trigger2) => {
  trigger2.addEventListener("click", toggleModal2)}
);

function toggleModal2() {
  document.querySelector(".modal").classList.remove("active");
  modalContainer2.classList.toggle("active");
}

document.querySelector(".close-second-modal").addEventListener("click", () => {
    clearModalForm()
  document.querySelector(".modal").classList.remove("active");
  modalContainer2.classList.remove("active");
  modalContainer.classList.remove("active");
});

/* event pour la fleche de la second modal */

document.querySelector(".back-modal").addEventListener("click", () => {
    clearModalForm()
  document.querySelector(".modal").classList.toggle("active");
  modalContainer2.classList.remove("active");
});

/* fonction pour ajouter les images dans la second modal */

function addImg(data) {
  const newImg = document.createElement("img");
  newImg.style.width = "100%";
  newImg.style.height = "100%";
  newImg.style.objectFit = "cover";

  newImg.src = `${URL.createObjectURL(data)}`;
  addPicture.appendChild(newImg);
  inputFileModalElement.style.display = "none";
  document.querySelector(".Ajouter-photo").style.display = "none";
  document.querySelector(".img-add-modal2 p").style.display = "none";
}

inputFileModalElement.addEventListener("change", (e) => {
  console.log(e.target.files[0]);
  const newImg = e.target.files[0];

  addImg(newImg);
});

const valider = async (data) => {
  return await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${sessionToken}`,
    },
    body: data,
  });
};

/* fonction pour que lorsqu'on ferme la modale elle redevient vierge quand on retourne dessus */

function clearModalForm() {
    formModal2El.reset();
    const modalImg = document.querySelector('.img-add-modal2 img');
    if (modalImg) {
        modalImg.remove()
        document.querySelector(".Ajouter-photo").style.display = "flex";
        document.querySelector(".img-add-modal2 p").style.display = "block";
    }
}

/* fonction pour empeche de valider le formulaire en cas de non remplissage des champs */

const formInputModal2 = document.querySelector(
  '#modal2-form input[type="text"]'
);
const formSelectEl = document.querySelector("#modal2-form select");

function toggleForm() {
  const btnValider = document.querySelector(
    '#modal2-form input[type="submit"]'
  );

  if (
    formInputModal2.value === "" ||
    formSelectEl.value === "none" ||
    inputFileModalElement.files.length === 0
  ) {
    btnValider.style.cursor = "not-allowed";
  } else {
    btnValider.removeAttribute("disabled");
    btnValider.style.cursor = "pointer";
    btnValider.style.background = "#1D6154";
  }
}

inputFileModalElement.addEventListener("change", () => {
  toggleForm();
});

formInputModal2.addEventListener("change", () => {
  toggleForm();
});

formSelectEl.addEventListener("change", () => {
  toggleForm();
});

/* event pour submit le formulaire et enregistrer les photos qu'on ajoute */

formModal2El.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(formModal2El);
  const response = await valider(data);
  const infoModal2 = await response.json();
  toggleForm();

  if (response.status === 201) {
    await updateUi();
  }

  if (response.status === 401 || response.status === 404) {
     
  }
});
