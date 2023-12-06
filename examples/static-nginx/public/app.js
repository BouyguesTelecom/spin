const state = {
  _counter: 0,
  set counter(value) {
    this._counter = value
    render()
  },
  get counter() {
    return this._counter
  },
}

globalThis.increment = () => state.counter++
globalThis.decrement = () => state.counter--

export const render = () => {
  console.debug('render')
  document.querySelector('#app').innerHTML = /*html*/ `
    <div class="is-pulled-left">
      <mark>Counter app</mark>
    </div>
    <div class="buttons has-text-centered">
      <button class="button is-secondary is-outlined" onclick=decrement()>–</button>
      <div class="counter">
        <pre>${state.counter}</pre>
      </div>
      <button class="button is-secondary is-outlined" onclick=increment()>+</button>
    </div>
  `
}

render()
