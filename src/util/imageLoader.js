const load = (url: string) =>
    new Promise((resolve, reject) => {
        const image = new Image()

        if (!image) reject()

        image.crossOrigin = 'Anonymous'
        image.src = url

        image.addEventListener('load', () => resolve(image))
        image.addEventListener('error', err => reject(err))
    })

export const createImageLoader = () => {
    const memory = {}

    return {
        load: (url: string) =>
            memory[url] || memory[url] === null
                ? Promise.resolve(memory[url])
                : load(url)
                      .then(img => (memory[url] = img))
                      .catch(err => (memory[url] = null)),

        syncGet: (url: string) => memory[url],

        syncGetDimension: (url: string) =>
            memory[url]
                ? {
                      x: memory[url].naturalWidth,
                      y: memory[url].naturalHeight,
                  }
                : null,
    }
}

export const imageLoader = createImageLoader()
