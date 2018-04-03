## DTL prototype [![CircleCI](https://circleci.com/gh/pcornier/dtl.svg?style=svg)](https://circleci.com/gh/pcornier/dtl)

A basic Data Transformation Language that pipes data from left to right. This is just a proof of concept and nothing more.

Usage:

```js
const dtl = require('dtl')

dtl('1 2 3')
// [ 1, 2, 3 ]

dtl('1 2 3 + 4 5 6')
// [ 5, 7, 9 ]

dtl('1 2 3 * 2')
// [ 2, 4, 6 ]

dtl('3 3 $ 1 2 3 4')
// [ [ 1, 2, 3 ], [ 4, 1, 2 ], [ 3, 4, 1 ] ]

dtl('(3 3 $ 1 2 3 4) :|')
// swap axes (rotate)
// [ [ 1, 4, 3 ], [ 2, 1, 4 ], [ 3, 2, 1 ] ]

dtl('i.11 !')
// [ 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0 ]

dtl('3 3 $ i.5')
// [ [ 0, 1, 2 ], [ 3, 4, 0 ], [ 1, 2, 3 ] ]

dtl('1 2 3 @1 4 5 6 @1')
// save/load states
// [ 1, 2, 3 ]

dtl('(12 2 $ `A` 2 `B` 3) ~ 0, c s1')
// group col 0, count and sum col 1
// [ [ 'A', 6, 12 ], [ 'B', 6, 18 ] ]

dtl('(3 3 $ 1 2) & (2 2 $ 1 `one` 2 `two`) 0=0 :1')
// join two lists
// [ [ 1, 2, 1, 'one' ], [ 2, 1, 2, 'two' ], [ 1, 2, 1, 'one' ] ]

dtl('csv `file.csv` ? :0 = `A` :1 > 2 ~ 0 1 :0.3')
// load csv, filter on column 0 and column 1
// group by col 0 and 1 then count
// select column 0 and column 3 from the result
```

You can run tests with `npm test`