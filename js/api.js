export async function getData(URL) {
  return await fetch(URL)
  .then(response => {
    return response.json()
  })
}


export function getCategoryData(episode, category) {
  return Promise.all(
    episode[category].map(categoryItemURL => {
    return new Promise(resolve => {
      const data = fetch(categoryItemURL)
      resolve(data)
    })
    .then(response => response.json())
  }))
}


let promiseBS = null;
export function loadBootstrap() {
  if (promiseBS) return promiseBS

  promiseBS = new Promise(resolve => {
    const link = document.createElement('link')
    link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'
    link.rel = 'stylesheet'
    link.integrity = 'sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3'
    link.crossOrigin = 'anonymous'
    link.addEventListener('load', () => {
      resolve()
    })
    document.head.append(link)
  })
  return promiseBS
}
