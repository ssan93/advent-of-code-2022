import { Logger } from '../../lib/logger'
import { parseFile, parseLine } from '../../lib/parser'

class Resolver {
  day: string
  file: string
  lines: string[]

  constructor ({ day, testing }: { day: string, testing: boolean}) {
    this.day = day
    this.file = parseFile(day, testing ? 'test' : 'data')
    this.lines = this.file.split('\n')
  }
  check = (cycle) => {
    if(cycle == 20 ||  cycle == 60 || cycle == 100 || cycle == 140 || cycle == 180 || cycle == 220) {
      return true
    }return false}
  solve1 () {
    const logger = new Logger(`Day${this.day}-1`)
    let values = 0
    let cycle = 0
    let value = 1
    this.lines.forEach(line => {
      const { name } = parseLine(line, /(?<name>.+)/)
      const instruction = name.split(' ')
      // console.log(instruction)
      if (instruction[0] == 'noop') {
        cycle++
        if (this.check(cycle)) { values += value * cycle}

      }
      else if (instruction[0] == 'addx') {
        cycle++
        if (this.check(cycle)) { values += value * cycle}
        cycle++ 
        if (this.check(cycle)) { values += value * cycle}

        value += parseInt(instruction[1])
        
      }

      // values[name] = 0
    })
    const result = values
    logger.result(result)
  }

  solve2 () {
    const logger = new Logger(`Day${this.day}-2`)
    let drawing = ''
    let cycle = 0
    let value = 1
    this.lines.forEach(line => {
      const { name } = parseLine(line, /(?<name>.+)/)
      const instruction = name.split(' ')
      if(cycle % 40==value || cycle % 40==value-1 || cycle % 40==value+1) drawing += '#'
      else drawing += ' '
      cycle++
      if(cycle % 40==0) drawing += '\n'
      if (instruction[0] == 'addx') {

        if(cycle % 40==value || cycle % 40==value-1 || cycle % 40==value+1) drawing += '#'
        else drawing += ' '
        cycle++
        if(cycle % 40==0) drawing += '\n'
        value += parseInt(instruction[1])
      }

    })
    console.log(drawing)
    const result = 0
    logger.result(result)
  }
}

const day = '10'
const testing = false

const resolver = new Resolver({ day, testing })
resolver.solve1()
resolver.solve2()