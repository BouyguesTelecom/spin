import MicroFrontend from './MicroFrontend'

const container = document.getElementById('root')

if (!container) {
  throw 'Cannot attach to container'
}

container.innerHTML = MicroFrontend()
