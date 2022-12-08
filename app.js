const form = document.querySelector('#form')
const feedback = document.querySelector('.feedback')
const inputSearch = document.querySelector('#search')

const getGif = async valueInputSearch => {
  const key = '7WV8kKMCQP47wLG9EkxFly58Z5FPnpif'
  const valueInput = valueInputSearch.replace(/\s+/g, '%20')
  const url =
  `https://api.giphy.com/v1/gifs/search?api_key=${key}&limit=1&q=${valueInput}`

  try {
    const { data, meta } = await (await fetch(url)).json()

    if (meta.msg !== 'OK') {
      throw new Error('Error')
    }

    return data[0].images.downsized_medium.url
  } catch (error) {
    console.log('Gif não encontrado')
  }
}

const implementGif = (url, alt) => {
  const gif = document.createElement('IMG')
  const gifsContainer = document.querySelector('.gifs')

  gif.src = url
  gif.alt = alt
  
  gifsContainer.prepend(gif)
}

const hiddenOrShowFeedback = msg => {
  if(msg === 'show'){
    feedback.style = 'display: block'
    inputSearch.classList.add('border-feedback')
    return
  }

  feedback.style = 'display: none'
  inputSearch.classList.remove('border-feedback')
}

form.addEventListener('submit', async event => {
  event.preventDefault()

  const valueSearch = form.search.value
  const gifUrl = await getGif(valueSearch)
  form.reset()

  //removendo feedback
  hiddenOrShowFeedback('hidden')

  //mostrando o feedback de erro, caso o gif não seja encontrado
  if(!gifUrl){
    hiddenOrShowFeedback('show')
    return
  }

  //Implemtando GIF na DOM
  implementGif(gifUrl, valueSearch)
})