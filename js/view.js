function welcomeHeading() {
  const h1 = document.createElement('h1');
  const h2 = document.createElement('h2');
  const nav = document.createElement('nav');

  h1.textContent = 'Star Wars wiki'
  h2.classList.add('mb-5', 'fs-6', 'text-secondary');
  h2.textContent = 'Not the real one tho'
  nav.id = 'episodesNav'

  const container = document.getElementsByClassName('container')[0];
  container.append(h1)
  container.append(h2)
  container.append(nav)
}

function createEpisodeBtn( obj, episodeNum ) {
  const btn = document.createElement('a')
  btn.classList.add(
    'btn',
    'btn-dark',
    'd-flex',
    'align-items-center',
    'btn-lg',
    'mb-3'
    )
  const URL_CURRENT = new URL(window.location)
  btn.href = URL_CURRENT.origin + '/episode?ep=' + episodeNum
  btn.textContent = episodeNum + '. ' + obj.title
  return btn
}

export function createEpisodesNav(arrWithEpisodes) {
  welcomeHeading()
  const btnsWrapper = document.getElementById('episodesNav')

  for (let i = 0; i < arrWithEpisodes.length; i++) {
    btnsWrapper.append( createEpisodeBtn(arrWithEpisodes[i], i + 1) )
  }
  document.getElementsByClassName('spinner-border')[0].remove()
}

function createGoBackBtn() {
  const goBackBtn = document.createElement('a')
  goBackBtn.classList.add('btn', 'btn-outline-secondary', 'mb-5')
  goBackBtn.textContent = 'Back to episodes'
  goBackBtn.href = 'index.html'
  return goBackBtn
}

function createHeading(episode) {
  const title = document.createElement('h1')
  title.classList.add('display-1')
  const episodeId = document.createElement('p')
  episodeId.classList.add('text-muted')
  episodeId.textContent =
  'Episode number (chronologically): ' + episode.episode_id
  title.textContent = episode.title
  return { title, episodeId }
}

function createOpeningCrawl(episode) {
  const openingCrawl = document.createElement('p')
  openingCrawl.classList.add('w-75', 'mb-5', 'lead')
  openingCrawl.textContent = episode.opening_crawl
  return openingCrawl
}

export async function createEpisodePage(data, getCategoryData) {
  const myURL = new URL(window.location.href)
  const episodeNum = new URLSearchParams(myURL.search).get('ep')
  const episode = data.results[episodeNum - 1]
  const container = document.getElementsByClassName('container')[0]

  container.append(createGoBackBtn())
  const {title, episodeId} = createHeading(episode)
  container.append(title)
  container.append(episodeId)
  container.append(createOpeningCrawl(episode))

  const cardsWrapper = document.createElement('section')
  cardsWrapper.classList.add('d-flex', 'flex-wrap', 'align-items-start')
  container.append(cardsWrapper)


  function createInfoCards(category) {
    const card = document.createElement('div')
    card.classList.add('card', 'mb-3', 'me-3')

    const cardHeading = document.createElement('h2')
    cardHeading.classList.add('card-header')
    cardHeading.textContent =
    category[0].toUpperCase() + category.slice(1).toLowerCase()

    const list = document.createElement('ul')
    list.classList.add('list-group', 'list-group-flush')

    new Promise(resolve => {
      const data = getCategoryData(episode, category)
      resolve(data)
    }).then( (res) => {
      res.forEach( item => {
        const listItem = document.createElement('li')
        listItem.classList.add('list-group-item')
        listItem.textContent = item.name
        list.append(listItem)
      })
      card.append(cardHeading)
      card.append(list)
    })
    return card
  }

  ['characters', 'planets', 'species', 'starships', 'vehicles']
  .forEach(async category => {
    cardsWrapper.append(createInfoCards(category))
  })
}

