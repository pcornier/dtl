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

// states
describe('states', function() {

  it('can save/load states', function() {
    expect(dtl('1 2 3 @:1 4 5 6 @1')).toEqual([1, 2, 3])
  })

  it('can use states in other verbs', function() {
    expect(dtl('10 @:1 i.@1')).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    expect(dtl('1 2 3 @:1 5 + @1')).toEqual([6, 7, 8])
    expect(dtl('1 2 @:1 (2 2 $ @1)')).toEqual([[1, 2], [1, 2]])
    expect(dtl('2 3 @:1 (@1 $ @1)')).toEqual([[2, 3, 2], [3, 2, 3]])
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
    expect(dtl('1 2 3 -; 4 5 6')).toEqual([4, 5, 6, 1, 2, 3])
  })

  it('can merge lists', function() {
    expect(dtl('1 2 3; i.10')).toEqual([1, 2, 3, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
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


describe('various tests, wip', function() {

  it('can multiply', function() {
    expect(dtl('2 * 3 * 4 * 5')).toEqual(120)
  })

  it('can add a scalar to a list', function() {
    expect(dtl('1 2 3 + 5')).toEqual([6, 7, 8])
  })

  it('can add two lists', function() {
    expect(dtl('1 2 3 + 4 5')).toEqual([5, 7, 7])
  })

  it('can use parenthesis', function() {
    expect(dtl('(5 + 1) * ((2 + 3) * 3)')).toEqual(90)
  })

  it('can add and multiply lists', function() {
    expect(dtl('(3 * 1 2) + (2 3 * 3 4) + 5')).toEqual([14, 23])
  })

  it('can add/multiply and parenthesis', function() {
    expect(dtl('3 * (1 2 + 2 3) * (3 4 + 5)')).toEqual([72, 135])
  })

  it('can multiply a list with a scalar', function() {
    expect(dtl('1 2 3 * 4')).toEqual([4, 8, 12])
  })

  it('can multiply two lists', function() {
    expect(dtl('1 2 3 * 4 2')).toEqual([4, 4, 12])
  })

  it('can generate a list with i.', function() {
    expect(dtl('i.11 + 2')).toEqual([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
    expect(dtl('i.11 !')).toEqual([10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0])
  })

  it('can create a list from a csv file', function() {
    expect(dtl('csv`spec/sample.csv` :0')).toEqual([['CLASS', 'LW', 'LD', 'RW', 'RD']])
  })

  it('can swap axes', function() {
    expect(dtl('(3 3 $ 1 2 3) :|')).toEqual([
      [1, 1, 1],
      [2, 2, 2],
      [3, 3, 3]
    ])
  })

  it('can join lists', function() {
    expect(dtl('(3 3 $ 1 2) & (2 2 $ 1 `one` 2 `two`) 0=0 :1')).toEqual([
      [1, 2, 1, 'one'],
      [2, 1, 2, 'two'],
      [1, 2, 1, 'one']
    ])
  })

  it('can join lists with states', function() {
    expect(dtl('(3 3 $ 1 2) @:1 (2 2 $ 1 `one` 2 `two`) @:2 @1 & @2 0=0 :1')).toEqual([
      [1, 2, 1, 'one'],
      [2, 1, 2, 'two'],
      [1, 2, 1, 'one']
    ])
  })


  // todo remove columns & rows

  // it('can insert columns', function() {
  //   todo (3 3 $ 1 2 3) /|(1 2 3,4 5 6):1 [[1, 1, 4, 2, 3], [1, 2, 5, 2, 3], [1, 3, 6, 2, 3]]
  // })

  // it('can append columns', function() {
  //   todo (3 3 $ 1 2 3) /|(4 5 6,7 8 9) [[1, 2, 3, 4, 7], [1, 2, 3, 5, 8], [1, 2, 3, 3, 9]]
  // })

  // it('can insert rows', function() {
  //   todo 3 3 $(1 2 3) -\(4 5 6,7 8 9):1 [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 2, 3], [1, 2, 3]]
  // })

  // it('can append rows', function() {
  //   todo 3 3 $(1 2 3) -\(4 5 6,7 8 9) [[1, 2, 3], [1, 2, 3], [1, 2, 3], [4, 5, 6], [7, 8, 9]]
  // })


// todo create tests for each verbs

// sort
// replace
// tail
// head
// remove duplicates
// filters add regexp and test inter col comp
// random
// auto row/col totals
// index like pandas DataFrames ? Map w/ array as keys ?

})





