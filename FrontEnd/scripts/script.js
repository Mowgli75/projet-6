const galleryElement = document.querySelector('.gallery');
const filtersElement = document.querySelector('.filters');

let works = []
let categories = []

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
}

init()
