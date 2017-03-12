# `Promise.asap` polyfill

```sh
npm install promise-asap-proposal-polyfill --save
```

And import from your code:

```js
import 'promise-asap-proposal-polyfill/register'
```

If you using Bluebird or other promise library

```js
import asap from 'promise-asap-proposal-polyfill'
import Promise from 'bluebird'
asap(Promise)-
```

## Usage

```js
function sleep (delay, result) {
  return new Promise(resolve =>
    setTimeout(resolve, delay, result)
  )
}

async function run () {
  const first = sleep(100, 'first')
  const second = sleep(200, 'second')
  const third = sleep(150, 'third')

  const promises = Promise.asap([ first, second, third ])

  // handle promise as soon as it resolves, don't wait for all
  for (let promise of promises) {
    console.log(await promise)
    // "first" after 100 ms
    // "third" after 150 ms
    // "second" after 200 ms
  }
}
```
