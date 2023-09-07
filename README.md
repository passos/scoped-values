# Scoped Values

A JavaScript library that simulates Kotlin's scoped functions.

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
