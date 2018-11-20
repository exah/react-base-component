# ⚾️ react-base-component

> Base component that prevents rendering unknown props in DOM


- [x] Filter unknown props from DOM
- [x] Based on [`react-html-attributes`](https://www.npmjs.com/package/react-html-attributes) (50% smaller - 3kb when minified /  1kb gziped, without many svg attributes and event handlers)
- [x] Override inner element with `as` prop
- [x] Great for CSS-in-JS component libraries (NOTE: some provide this feature out of box!)
- [ ] Light version with only custom whitelist / blacklist (soon)
- [ ] Better package name (open for discussion)
- [ ] Remove old and deprecated html attributes (open for discussion)


## 📦 Install

```sh
$ yarn add @exah/react-base-component
```


## 📖 API

### `Base` component

```js
import Base from '@exah/react-base-component'
```


#### Props

- `as: Component` — React component or DOM element (like `div`, `input`, `span`, ...), default `div`

See [`createBase`](#createbase-factory) for more options.


#### Example

```js
import { render } from 'react-dom'
import styled from 'react-emotion'
import Base from '@exah/react-base-component'

const LinkComp = styled(Base)`
  color: ${props => props.foo === 'bar' ? 'royalblue' : 'hotpink'};
`

render((
  <LinkComp as='a' href='http://example.com' foo='bar' abc='xyz'>
    Click Me
  </LinkComp>
), document.body)

// → 
// <a class="css-0" href="http://example.com">Click Me</a>
```


### `createBase` factory

```js
import { createBase } from '@exah/react-base-component'
```

#### Params

- `defaultComp: Component` — React component or DOM element (like `div`, `input`, `span`, ...), default `div`
- `options: Object` — Options, optional, default to `{ componentProp: 'as' }`
- `options.whitelist: Array` — List of props that always will be rendered, optional
- `options.blacklist: Array` — List of props that always be be omitted, optional
- `options.isPropValid: function (tagName, propName) => boolean` — Custom function to filter props
- `options.tagName: string` — DOM element. Used when `defaultComp` is not DOM element, optional
- `options.componentProp: string` — Name of prop for changing underlying component, optional, default to `'as'`

**Return: `Component`** — wrapped in `React.forwardRef`.


#### Example

```js
import { render } from 'react-dom'
import styled from 'react-emotion'
import { Link as RouterLink } from 'react-router-dom'
import { createBase } from '@exah/react-base-component'

const LinkComp = styled(createBase('span'))`
  color: ${props => props.foo === 'bar' ? 'royalblue' : 'hotpink'};
`

const RouterLinkBase = createBase(RouterLink, {
  tagName: 'a',
  whitelist: [ 'to' ]
})

const CustomComp = createBase((props) => <span {...props} />, { 
  isPropValid: (tag, prop) => prop !== 'foo' 
})

render((
  <span>
    <LinkComp as={RouterLinkBase} to='/page-2' foo='bar'>
      Page 2
    </LinkComp>
    <LinkComp as='a' href='https://google.com' target='_blank' foo='baz'>
      Search
    </LinkComp>
    <CustomComp title='notice' foo='bar'>
      Notice
    </CustomComp
  </span>
), document.body)

// →
// <span>
//   <a class="css-0" href="/app/page-2">Page 2</a>
//   <a class="css-1" href="https://google.com" target="_blank">Search</a>
//   <span title="notice">Notice</span>
// </span>
```


### `isPropValid` function

```js
import { isPropValid } from '@exah/react-base-component'
```


#### Params

- `tagName: string` — DOM element (like `a`, `input`, `div`)
- `propName: string` — prop name (like `href`, `value`, `onChange`)

**Return: `boolean`**


#### Example

```js
import { isPropValid } from '@exah/react-base-component'

isPropValid('a', 'foo') // → false
isPropValid('a', 'bar') // → false
isPropValid('a', 'href') // → true
```

## 🔗 Links

- ⚠️ [Unknown Prop Warning](https://reactjs.org/warnings/unknown-prop.html)
- 💄 [`pss`](https://github.com/exah/pss) — Prop Styles System
- 📐 [`pss-components`](https://github.com/exah/components) — Components
- 👩‍🎤 [`@emotion/is-prop-valid`](https://github.com/emotion-js/next/tree/master/packages/is-prop-valid) — Inspired by

---

MIT © [John Grishin](http://johngrish.in)
