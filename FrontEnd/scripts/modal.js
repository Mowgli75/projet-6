const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");
const modalContainer2 = document.querySelector(".modal-container2")
const modalTriggers2 = document.querySelectorAll(".modal-trigger2")
const addPictureBtn = document.querySelector(".add-picture")

modalTriggers.forEach(trigger => trigger.addEventListener('click', toggleModal))

function toggleModal(){
    modalContainer.classList.toggle("active")
   
}

modalTriggers2.forEach(trigger2 => trigger2.addEventListener('click', toggleModal2))

function toggleModal2(){
    modalContainer2.classList.toggle("active")
}

addPictureBtn.addEventListener('click',() => {
    if(modalTriggers2 === modalContainer2){
modalContainer.style.display = 'none';
    }
})