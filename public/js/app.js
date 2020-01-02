const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')


weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  messageOne.innerHTML = "Loading..."
  messageTwo.innerHTML = ""

  const location = search.value

  fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        if(data.error) {
          messageOne.innerHTML = data.error
        } else {
          messageOne.innerHTML = data.location
          messageTwo.innerHTML = data.forecast
        }
    })
  })

})