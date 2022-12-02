import { log } from 'console'
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
    const values = new Int32Array(3);
    this.lines.forEach(line => {
      values[2]=(line.split('\n').reduce((acc, num) => acc + +num, 0))
      values.sort((a, b) => b - a)
    })
    // const maxCal = this.file.split('\n\n').reduce((max, next) => {
    //   const allCalories = next.split('\n').reduce((acc, num) => acc + parseInt(num), 0);
    //   return Math.max(max, allCalories);
    // },0);
    const result = values[0]
    logger.result(result)
  }

  solve2 () {
    const logger = new Logger(`Day${this.day}-2`)
    const allCalories = this.file.split('\n\n').map(element => {
      return element.split('\n').reduce((acc, num) => acc + parseInt(num), 0);
    }).sort((a, b) => b - a);
    
    const result = allCalories[0] + allCalories[1] + allCalories[2];
    logger.result(result)
  }
}

const day = '01'
const testing = true

const resolver = new Resolver({ day, testing })
resolver.solve1()
resolver.solve2()