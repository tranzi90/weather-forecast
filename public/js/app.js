const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const result = document.querySelector('#result')

weatherForm.addEventListener('submit', function (e) {
    e.preventDefault()

    result.textContent = 'Loading...'

    fetch(`/weather?address=${search.value}`).then(function (response) {
        response.json().then(function (data) {
            result.textContent = JSON.stringify(data)
        })
    })
})
