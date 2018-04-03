'use strict'

const dtl = require('../dtl')

// lists
describe('lists', function() {

  it('can create a basic list', function() {
    expect(dtl('1 2 3')).toEqual([1, 2, 3])
  })

  it('can create another list with strings', function() {
    expect(dtl('1 `a` 2 `bcd` 2.5 3')).toEqual([1, 'a', 2, 'bcd', 2.5, 3])
  })

  it('can create a list with just one number', function() {
    expect(dtl('2 2 $ 1')).toEqual([[1, 1], [1, 1]])
  })

  it('can create multi-dimensional lists', function() {
    expect(dtl('3 3 3 $ 1 2')).toEqual([
      [[1, 2, 1], [2, 1, 2], [1, 2, 1]],
      [[2, 1, 2], [1, 2, 1], [2, 1, 2]],
      [[1, 2, 1], [2, 1, 2], [1, 2, 1]]
    ])
  })

  it('can create a list from a string', function() {
    expect(dtl('`boule` :0.2.3.3.4 :"')).toEqual('bulle')
  })

})

// filters
describe('filters', function() {

  it('can filter a list', function() {
    expect(dtl('1 2 3 4 5 6 ? >3')).toEqual([4, 5, 6])
  })

  it('can filter a two dims list', function() {
    expect(dtl('(3 3 $ 1 2) ? :0 > 1')).toEqual([[2, 1, 2]])
  })

  it('can combine filters', function() {
    expect(dtl('(5 3 $ i.10) ? :0 > 2 ? :1 == 0')).toEqual([[9, 0, 1]])
  })

})

// box
describe('box', function() {

  it('can box box a number', function() {
    expect(dtl('10 ] ]')).toEqual([[10]])
  })

  it('can box a list', function() {
    expect(dtl('1 2 3 ]')).toEqual([[1, 2, 3]])
  })

})

// unbox
describe('unbox', function() {

  it('can unbox', function() {
    expect(dtl('1 ] [')).toEqual(1)
  })

  it('can box a list', function() {
    expect(dtl('(2 2 $ 1 2 3) :0:0 [[')).toEqual(1)
  })

})

// states
describe('states', function() {

  it('can save/load states', function() {
    expect(dtl('1 2 3 @1 4 5 6 @1')).toEqual([1, 2, 3])
  })

  it('can use states in other verbs', function() {
    expect(dtl('10 @1 i.@1')).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    expect(dtl('1 2 3 @1 5 + @1')).toEqual([6, 7, 8])
    expect(dtl('1 2 @1 (2 2 $ @1)')).toEqual([[1, 2], [1, 2]])
    expect(dtl('2 3 @1 (@1 $ @1)')).toEqual([[2, 3, 2], [3, 2, 3]])
  })

})

// group
describe('grouping', function() {

  it('can perform simple grouping', function() {
    let groups = dtl('csv`spec/sample.csv` ~ 0')
    expect(groups.length).toEqual(4)
    expect(groups[0]).toEqual(['CLASS', 1])
  })

  it('can group, count, sum & max', function() {
    let groups = dtl('(csv`spec/sample.csv` ~ 0 1, c s1 M1) :1')
    expect(groups).toEqual([['B', '1', 10, 10, 1]])
  })

  it('can average', function() {
    let groups = dtl('(csv`spec/sample.csv` ~ 0 1, a2) :1')
    expect(groups).toEqual([['B', '1', 3.3]])
  })

})


// merge
describe('merge', function() {

  it('can merge lists', function() {
    expect(dtl('1 2 3; 4 5 6')).toEqual([1, 2, 3, 4, 5, 6])
  })

  it('can merge first to second', function() {
    expect(dtl('1 2 3 ;! 4 5 6')).toEqual([4, 5, 6, 1, 2, 3])
  })

  it('can merge lists', function() {
    expect(dtl('1 2 3 ; i.10')).toEqual([1, 2, 3, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  })

  it('can merge lists and select', function() {
    expect(dtl('(1 2 3 ; i.10) :0.3')).toEqual([1, 0])
  })

})

// select
describe('selections', function() {

  it('can select', function() {
    expect(dtl('1 2 3 :0')).toEqual([1])
    expect(dtl('1 2 3 :2.0')).toEqual([3, 1])
  })

  it('can select within a multi-dimensional list', function() {
    expect(dtl('(3 3 3 $ i.5) :1.2:1.2')).toEqual([
      [[2, 3, 4], [0, 1, 2]],
      [[1, 2, 3], [4, 0, 1]]
    ])
  })

})

// insert
describe('insert', function() {

  it('can insert sum', function() {
    expect(dtl('(2 2 $ 1 2 3) /+ /+')).toEqual(7)
  })

  it('can insert multiply', function() {
    expect(dtl('(2 2 $ 1 2 3) /* /*')).toEqual(6)
  })

})


// reverse
describe('reverse', function() {

  it('can reverse a string', function() {
    expect(dtl("'stressed'!")).toEqual('desserts')
  })

  it('can reverse a list', function() {
    expect(dtl('1 2 3 !')).toEqual([3, 2, 1])
  })

})


// multiply
describe('multiply', function() {

  it('can multiply', function() {
    expect(dtl('2 * 3 * 4 * 5')).toEqual(120)
  })

  it('can multiply a list with a scalar', function() {
    expect(dtl('1 2 3 * 4')).toEqual([4, 8, 12])
  })

  it('can multiply two lists', function() {
    expect(dtl('1 2 3 * 4 2')).toEqual([4, 4, 12])
  })

  it('can add and multiply lists', function() {
    expect(dtl('(3 * 1 2) + (2 3 * 3 4) + 5')).toEqual([14, 23])
  })

})

// add
describe('add', function() {

  it('can add a scalar to a list', function() {
    expect(dtl('1 2 3 + 5')).toEqual([6, 7, 8])
  })

  it('can add two lists', function() {
    expect(dtl('1 2 3 + 4 5')).toEqual([5, 7, 7])
  })

  it('can add multi-dim', function() {

  })

})

// swap
describe('swap', function() {
  it('can swap axes', function() {
    expect(dtl('(3 3 $ 1 2 3) :|')).toEqual([
      [1, 1, 1],
      [2, 2, 2],
      [3, 3, 3]
    ])
  })
})

// generator
describe('generator', function() {

  it('can generate a list with i.', function() {
    expect(dtl('i.11 + 2')).toEqual([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
    expect(dtl('i.11 !')).toEqual([10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0])
  })

})

// join
describe('join', function() {

  it('can join lists', function() {
    expect(dtl('(3 3 $ 1 2) & (2 2 $ 1 `one` 2 `two`) 0=0 :1')).toEqual([
      [1, 2, 1, 'one'],
      [2, 1, 2, 'two'],
      [1, 2, 1, 'one']
    ])
  })

  it('can join lists with states', function() {
    expect(dtl('(3 3 $ 1 2) @1 (2 2 $ 1 `one` 2 `two`) @2 @1 & @2 0=0 :1')).toEqual([
      [1, 2, 1, 'one'],
      [2, 1, 2, 'two'],
      [1, 2, 1, 'one']
    ])
  })

})


// csv
describe('csv', function() {

  it('can create a list from a csv file', function() {
    expect(dtl('csv`spec/sample.csv` :0')).toEqual([['CLASS', 'LW', 'LD', 'RW', 'RD']])
  })

})

// sort
describe('sort', function() {

  it('can sort a list', function() {
    expect(dtl('1 4 8 3 2 6 5 0 9 7 ^0')).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  })


  it('can sort a list', function() {
    expect(dtl('(15 3 $ i.10) ^!1 :0.1')).toEqual([[8, 9, 0], [7, 8, 9]])
  })

})


// random
describe('random', function() {

  it('can use random numbers in list', function() {
    let list = dtl('1 ?:10 2 ?:10 3 ?:10 4')
    expect(list[0]).toEqual(1)
    expect(list[1]).toBeGreaterThanOrEqual(0)
    expect(list[1]).toBeLessThan(10)
    expect(list[6]).toEqual(4)
  })

  it('can generate a list of random numbers', function() {
    let sum = dtl('(20 $ ?:100) /+')
    expect(sum / 20).toBeLessThanOrEqual(100)
  })

})


// duplicates
describe('duplicates', function() {

  it('can remove duplicates', function() {
    expect(dtl('1 1 2 2 3 3 4 4 ||')).toEqual([1, 2, 3, 4])
  })

  it('can remove duplicated lists', function() {
    expect(dtl('(3 3 $ i.3) || [')).toEqual([0, 1, 2])
  })

})

// head, tail
describe('head & tail', function() {

  it('can head', function() {
    expect(dtl('i.10 h3')).toEqual([0, 1, 2])
  })

  it('can tail', function() {
    expect(dtl('i.10 t3')).toEqual([7, 8, 9])
  })

})


// search & replace
describe('head & tail', function() {

  it('can search & replace', function() {
    expect(dtl('i.3 ? :0>=2 ri.3')).toEqual([0, 1, [0, 1, 2]])
  })

  it('can search & replace', function() {
    expect(dtl('i.4 ? :0==2 r`replaced`')).toEqual([0, 1, 'replaced', 3])
  })

})

describe('various tests, wip', function() {

  it('can use parenthesis', function() {
    expect(dtl('(5 + 1) * ((2 + 3) * 3)')).toEqual(90)
  })

  it('can add/multiply and parenthesis', function() {
    expect(dtl('3 * (1 2 + 2 3) * (3 4 + 5)')).toEqual([72, 135])
  })

  it('can sort columns', function() {
    expect(dtl('i.20 $ 3 3'))
  })

  // TODO
  // remove columns & rows
  // append & insert columns /|
  // insert rows
  // filters add regexp and test inter col comp
  // auto row/col totals
  // index like pandas DataFrames ? Map w/ array as keys ?

})





