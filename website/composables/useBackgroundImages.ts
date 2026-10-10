// Loads the images the visitor cannot see yet, in the background.
// Visible images never wait for this queue. The queue starts after the page's load event runs two downloads at a time.

type Task = {
  key: string
  run: () => Promise<void>
}

const LIMIT = 2

const queue: Task[] = []
const settled = new Set<string>()
const running = new Set<string>()
let started = false

function pump() {
  while (started && running.size < LIMIT && queue.length) {
    const task = queue.shift() as Task
    if (settled.has(task.key) || running.has(task.key)) {
      continue
    }

    running.add(task.key)
    task
      .run()
      .catch(function () {})
      .finally(function () {
        running.delete(task.key)
        settled.add(task.key)
        pump()
      })
  }
}

function start() {
  if (started) {
    return
  }

  started = true
  pump()
}

// Queue tasks at the back, or at the front (in their order) for what just became likely
export function queueImages(tasks: Task[], front = false) {
  if (import.meta.server) {
    return
  }

  const fresh = tasks.filter(function (task) {
    return task.key && !settled.has(task.key) && !running.has(task.key)
  })

  for (const task of fresh) {
    const index = queue.findIndex(function (queued) {
      return queued.key === task.key
    })
    if (index >= 0) {
      queue.splice(index, 1)
    }
  }

  if (front) {
    queue.unshift(...fresh)
  } else {
    queue.push(...fresh)
  }

  if (!started) {
    if (document.readyState === 'complete') {
      start()
    } else {
      window.addEventListener('load', start, { once: true })
    }
  }

  pump()
}

// Download an image URL into the browser cache
export function urlTask(src: string): Task {
  return {
    key: src,
    run: function () {
      return new Promise(function (resolve) {
        const image = new Image()
        image.decoding = 'async'
        image.fetchPriority = 'low'
        image.src = src

        image.onload = function () {
          resolve()
        }

        image.onerror = function () {
          resolve()
        }
      })
    },
  }
}

// Turn a lazy <img> eager: the browser then picks the same srcset candidate it would have picked on scroll
export function lazyImageTask(element: HTMLImageElement): Task {
  return {
    key: element.getAttribute('src') || '',
    run: function () {
      if (element.complete) {
        return Promise.resolve()
      }

      return new Promise(function (resolve) {
        element.addEventListener(
          'load',
          function () {
            resolve()
          },
          { once: true },
        )
        element.addEventListener(
          'error',
          function () {
            resolve()
          },
          { once: true },
        )
        element.loading = 'eager'
      })
    },
  }
}
