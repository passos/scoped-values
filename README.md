# Scoped Values

A JavaScript library that simulates Kotlin's scoped functions.

Inspired by Kotlin scope functions, this library can wrap any JavaScript value and provide `let`, `also`, and `run` functions to it.

## Installation

```bash
npm install scoped-values
```

## Usage

```javascript
import $$ from "scoped-values";

const data = {
    obj: {
        a: 1
    },
    arr: [1, 2, 3],
    val: 10,
}

const doubleValue = $$(data.val).let(it => it * 2).value // 20
const undefinedValue = $$(data.undefined_value).let(it => it * 2) // undefined

$$(data.obj)
    .let((it) => {...it, b: 2})
    .run(it => console.log(it));
// console output: { a: 1, b: 2 }

$$(data.arr)
    .let((it) => [0, ...it])
    .map(it => it * 2)
    .filter(it => it < 5)
    .also(it => console.log(it));
// console output: [0, 2, 4]
```

Check `test/index.test.js` for more use cases.

## `ScopeValue` API Reference

### TL;DR

| method      | `fn` param    | return value  |
| ----------- | ------------- | ------------- |
| `.let(fn)`  | context value | `fn` result   |
| `.also(fn)` | context value | context value |
| `.run(fn)`  | context value | `undefined`   |

### Methods

#### `.let(fn: Function): ScopeValue`

Applies the provided function `fn` to the context value and returns a new `ScopeValue` instance containing the result of the function. Use this when you wish to transform the current value.

```javascript
$$(1).let((it) => it + 1); // returns $$(2)

$$(null).let((it) => it + 1); // returns $$(null)

$$([1, 2]).let((it) => [...it, 3]); // return [1, 2, 3]
```

#### `.also(fn: Function): ScopeValue`

Applies the provided function `fn` to the context value without transforming it. This method returns the original `ScopeValue` instance. Useful for multiple operatations to the context value in a chain calls.

```javascript
$$(1).also((it) => it + 1); // returns $$(1)

$$({}).also((it) => {
  it.x = 1;
}); // returns $$({ x: 1})

$$([1, 2]).also((it) => it.push(3)); // return $$([1, 2, 3])
```

#### `.run(fn: Function)`

Invokes the provided function `fn` using the context value. It doesn't return a value. This is mainly used for executing side effects based on the context value.

```javascript
$$(1).run((it) => console.log(1)); // output: 1
```

### Properties

#### `.value`

Returns the raw value contained within the `ScopeValue` context. This allows you to retrieve the unwrapped value after performing operations using the `let` and `also` methods.

## License

MIT

**LICENSE**:

MIT License

Copyright (c) 2023 Jinyu Liu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
