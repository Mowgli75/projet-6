const galleryElement = document.querySelector('.gallery');
const filtersElement = document.querySelector('.filters');
const loginButton = document.querySelector('.loginBtn');
const modalImgContainer = document.querySelector('.modal-img-container')

let works = []
let categories = []
let token = sessionStorage.getItem('token') || null;

console.log(token)

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

const createWorksModal = (data) => {
  data.forEach(work => {
      const imgContainer = document.createElement('div')
      const imgElement = document.createElement('img');
      const trashElement = document.createElement('span')

      imgContainer.style.width = '100%'
      imgContainer.style.position = 'relative'

      imgElement.src = work.imageUrl;
      imgElement.alt = work.title;

      trashElement.src = 'p'
      trashElement.classList.add('trash')
 
      trashElement.addEventListener('click', () => {
        console.log(work.id)
        // gérer le fetch en delete
      })

      imgContainer.appendChild(imgElement)
      imgContainer.appendChild(trashElement)


      modalImgContainer.appendChild(imgContainer);
  })
}

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

const createFilters = (categories) => {
  createButton({id: 0, name: 'Tous'})
  categories.forEach(category => {
    createButton(category)
  })
}

const init = async () => {
    await getWorks()
    await getCategories()
    createWorks(works)
    createFilters(categories)
    createWorksModal(works)
}

init()

if (token !== null) {
  filtersElement.style.display = 'none';
  loginButton.textContent = 'logout'
}

