const galleryElement = document.querySelector('.gallery');

let works = []

const getWorks = async () => {
  await fetch("http://localhost:5678/api/works")
    .then((response) => {
      return response.json();
    })
    .then((data) => works.push(...data));
};

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

const init = async () => {
    await getWorks()
    createWorks(works)
}

init()
