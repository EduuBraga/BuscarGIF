const form = document.querySelector('#form')

const getGif = async (valueInputSearch) => {
  const key = '7WV8kKMCQP47wLG9EkxFly58Z5FPnpif'
  const valueInput = valueInputSearch
  const url =
  `https://api.giphy.com/v1/gifs/search?api_key=${key}&limit=1&q=${valueInput}`

  try {
    const { data: dataGif, meta } = await (await fetch(url)).json()

    if (meta.msg !== 'OK') {
      throw new Error('Error')
    }

    return dataGif[0]
  } catch (error) {
    console.log('Gif não encontrado')
  }
}

const implementGif = (url, alt) => {
  const gif = document.createElement('IMG')
  const out = document.querySelector('.out')

  gif.src = url
  gif.alt = alt
  
  out.prepend(gif)
}

form.addEventListener('submit', async event => {
  event.preventDefault()

  const valueSearch = form.search.value
  const dataGif = await getGif(valueSearch)
  const gifUrl = dataGif.images.downsized_medium.url

  if(!dataGif){
    console.log('error')
    return
  }

  implementGif(gifUrl, valueSearch)
})