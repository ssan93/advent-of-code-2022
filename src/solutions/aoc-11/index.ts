import { Logger } from '../../lib/logger'
import { parseFile, parseLine } from '../../lib/parser'

class Resolver {
  day: string
  file: string
  lines: string[]

  constructor ({ day, testing }: { day: string, testing: boolean}) {
    this.day = day
    this.file = parseFile(day, testing ? 'test' : 'data')
    this.lines = this.file.split('\n\n')
  }

  solve1 () {
    const logger = new Logger(`Day${this.day}-1`)
    const monkeys = {}
    this.lines.forEach(line => {
      const info = line.split('\n')
      const monkey = info[0].split(' ')[1][0]
      const items = info[1].split(': ')[1].split(', ')
      const operation = info[2].split('= ')[1].split(' ')
      const test = +info[3].split('by ')[1]
      const res = [+info[4].split('monkey ')[1], +info[5].split('monkey ')[1]]
      // console.log(monkey, items, operation, test, res)
      monkeys[monkey] = [ items, operation, test, res, 0 ]
      // values[name] = 0
    })
    // console.log(monkeys)
    
    for (let round = 0; round < 20; round++) {
      for(let monkey in monkeys) {
        const [ items, operation, test, res ] = monkeys[monkey]
        // console.log("monk",monkey, items, items[0], operation, test, res)
        let result = 0
        let item = 0 
        while (item < items.length) {
          if (items[item]) {
            switch(operation[1]) {
              case '+':
                items[item] = +items[item] + (operation[2] == "old" ? items[item] : +operation[2])
                break
              case '*':
                items[item] = +items[item] * (operation[2] == "old" ? items[item] : +operation[2])
                break
            }
            // console.log("item",items[item], items[item]/3, Math.trunc(items[item]/3))
            items[item] = Math.trunc(items[item]/3) 
            if(items[item] % test == 0) {
              const i = items.shift()
              monkeys[res[0]][0].push(i)
              // console.log("throw ", i, " to ", res[0])
            }
            else {
              const i = items.shift()
              monkeys[res[1]][0].push(i)
              // console.log("throw ", i, " to ", res[1])          
            }
            monkeys[monkey][4]++
            // console.log("item",item, items)
          }
        }
      }
        
    }
    console.log(monkeys)
    let res= []
    for(let monkey in monkeys) {
      res.push(monkeys[monkey][4])
    }
    res = res.sort((a,b) => a-b).reverse()
    const result = res[0] * res[1]
    logger.result(result)
  }

  solve2 () {
    const logger = new Logger(`Day${this.day}-2`)
    const monkeys = {}
    this.lines.forEach(line => {
      const info = line.split('\n')
      const monkey = info[0].split(' ')[1][0]
      const items = info[1].split(': ')[1].split(', ').map(i => BigInt(i))
      const operation = info[2].split('= ')[1].split(' ')
      const test = +info[3].split('by ')[1]
      const res = [+info[4].split('monkey ')[1], +info[5].split('monkey ')[1]]
      // console.log(monkey, items, operation, test, res)
      monkeys[monkey] = [ items, operation, test, res, 0 ]
      // values[name] = 0
    })
    // console.log(monkeys)
    
    let prod = 1;
    for (let monkey in monkeys) {
      prod *= +monkeys[monkey][2];
    }

    for (let round = 0; round < 10000; round++) {
      for(let monkey in monkeys) {
        const [ items, operation, test, res ] = monkeys[monkey]
        // console.log("monk",monkey, items, items[0], operation, test, res)
        let result = 0
        let item = 0 
        while (item < items.length) {
          if (items[item]) {
            switch(operation[1]) {
              case '+':
                items[item] += (operation[2] == "old" ? items[item] : BigInt(operation[2]))
                break
              case '*':
                items[item] *= (operation[2] == "old" ? items[item] : BigInt(operation[2]))
                break
            }
            // console.log("item",items[item], items[item]/3, Math.trunc(items[item]/3))
            // items[item] = Math.trunc(items[item]/3) 
            items[item] = items[item] % BigInt(prod)
            if(items[item] % BigInt(test) == BigInt(0)) {
              const i = items.shift()
              monkeys[res[0]][0].push(i)
              // console.log("throw ", i, " to ", res[0])
            }
            else {
              const i = items.shift()
              monkeys[res[1]][0].push(i)
              // console.log("throw ", i, " to ", res[1])          
            }
            monkeys[monkey][4]++
            // console.log("item",item, items)
          }
        }
      }
        
    }
    console.log(monkeys)
    let res= []
    for(let monkey in monkeys) {
      res.push(monkeys[monkey][4])
    }
    res = res.sort((a,b) => a-b).reverse()
    const result = res[0] * res[1]
    logger.result(result)
  }
}

const day = '11'
const testing = false

const resolver = new Resolver({ day, testing })
// resolver.solve1()
resolver.solve2()