const formElement = document.querySelector('#form')

/* Partie Login submit info */

const login = async (data) => {
const user = {
    email: data.get('email'),
    password: data.get('password')
}

 return await fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(user)
 })
}

formElement.addEventListener('submit', async (event) => {
    event.preventDefault()
    const data = new FormData(formElement) 
const response = await login(data)
const user = await response.json()

if (response.status === 200) {
    sessionStorage.setItem('token', user.token)
    return window.location.assign('./index.html')
}

if (response.status === 401 || response.status === 404) {
   
}

})