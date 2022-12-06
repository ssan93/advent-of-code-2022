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

  solve1 () {
    const logger = new Logger(`Day${this.day}-1`)
    let values
    for (let i=0; i<this.file.length - 4; i++) {
        if (new Set(this.file.slice(i, i+4)).size === 4) {
          values = i + 4;
          break;
        }
    }
    const result = values
    logger.result(result)
  }

  solve2 () {
    const logger = new Logger(`Day${this.day}-2`)
    let values
    for (let i=0; i<this.file.length - 14; i++) {
        if (new Set(this.file.slice(i, i+14)).size === 14) {
          values = i + 14;
          break;
        }
    }
    const result = values
    logger.result(result)
  }
}

const day = '06'
const testing = false

const resolver = new Resolver({ day, testing })
resolver.solve1()
resolver.solve2()