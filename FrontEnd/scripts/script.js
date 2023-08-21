const galleryElement = document.querySelector('.gallery');
const filtersElement = document.querySelector('.filters');
const loginButton = document.querySelector('.loginBtn');
const modalImgContainer = document.querySelector('.modal-img-container')
const blackBarContainer = document.querySelector('.blackbar')
const modalBtn1 = document.querySelector('.modal-btn')
const modalBtn2 = document.querySelector('.modal-btn2')


let works = []
let categories = []
let token = sessionStorage.getItem('token') || null;

/* Partie recuperation du projet via l'api*/

const getWorks = async () => {
  await fetch("http://localhost:5678/api/works")
    .then((response) => {
      return response.json();
    })
    .then((data) => works.push(...data));
};

const getCategories = async () => {
  await fetch('http://localhost:5678/api/categories')
  .then(response => response.json())
  .then(data => categories.push(...data))
}

/* Partie ajout des images */

const createWorks = (data) => {
    data.forEach(work => {
        const figureElement = document.createElement('figure');
        const imgElement = document.createElement('img');
        const figcaptionElement = document.createElement('figcaption');

        imgElement.src = work.imageUrl;
        imgElement.alt = work.title;

        figcaptionElement.textContent = work.title;

        figureElement.appendChild(imgElement);
        figureElement.appendChild(figcaptionElement);

        galleryElement.appendChild(figureElement);
    })
}

/* Partie suppresion des images */

const deleteWork = async (id) => {
 return await  fetch(`http://localhost:5678/api/works/${id}`, {
  method: 'DELETE',
  headers: {
    'Authorization': `Bearer ${token}`,
  }
 })
}
/* Partie export des fonctions pour la modale */

export const updateUi = async () => {
  works = []
  galleryElement.innerHTML = "";
  modalImgContainer.innerHTML = "";
  await getWorks()
  createWorks(works)
  createWorksModal(works)
}


/* Partie ajout des images pour la modale */

const createWorksModal = (data) => {
  data.forEach(work => {
      const imgContainer = document.createElement('div')
      const imgElement = document.createElement('img');
      const trashElement = document.createElement('span')
      const editElement = document.createElement('p')

      imgContainer.style.width = '100%'
      imgContainer.style.position = 'relative'

      imgElement.src = work.imageUrl;
      imgElement.alt = work.title;

      trashElement.innerHTML = '<i class="fa-solid fa-trash-can fa-sm" style="color: #adb1b8;"></i>'
      trashElement.classList.add('trash')

      editElement.innerHTML = 'éditer'

      trashElement.addEventListener('click', async () => {
       
        const response = await deleteWork(work.id)
        console.log(response)

        if (response.status === 204) {
          await updateUi()
        }
      })

      imgContainer.appendChild(imgElement)
      imgContainer.appendChild(trashElement)
      imgContainer.appendChild(editElement)

      modalImgContainer.appendChild(imgContainer);
  })
}
/* Partie bouton pour les filtres */

const createButton = (data) => {
  const buttonEl = document.createElement('button')

  buttonEl.textContent = data.name

  buttonEl.addEventListener('click', () => {
    if (data.id === 0) {
      galleryElement.innerHTML = ""
      return createWorks(works)
    }

    const filteredWorks = works.filter(work => work.categoryId === data.id)
    galleryElement.innerHTML = ""
 
     createWorks(filteredWorks)
  })

  filtersElement.appendChild(buttonEl)
}

/* Partie filtre */ 

const createFilters = (categories) => {
  createButton({id: 0, name: 'Tous'})
  categories.forEach(category => {
    createButton(category)
  })
}

/* Partie fonction init pour appeler les autres fonctions en une */

const init = async () => {
    await getWorks()
    await getCategories()
    createWorks(works)
    createFilters(categories)
    createWorksModal(works)
}

init()

/* partie bouton logout */

const logout = () => {
  sessionStorage.removeItem('token')
  window.location.reload()
}

if (token !== null) {
  filtersElement.style.display = 'none';
  loginButton.textContent = 'logout'
  blackBarContainer.style.visibility = 'visible'
  modalBtn1.style.visibility = 'visible'
  modalBtn2.style.visibility = 'visible'

  loginButton.addEventListener('click', logout)

}



