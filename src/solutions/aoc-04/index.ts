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
    let values = 0
    this.lines.forEach(line => {
      const { name } = parseLine(line, /(?<name>.+)/)
      const elf1 = name.split(",")[0]
      const elf2 = name.split(",")[1]
      const x1 = +elf1.split("-")[0]
      const y1 = +elf1.split("-")[1]
      const x2 = +elf2.split("-")[0]
      const y2 = +elf2.split("-")[1]
      if((x1 <= x2 && y2 <= y1) || (x2 <= x1 && y1 <= y2)){
        // console.log("name", name)
        values++
      }
    })

    const result = values
    logger.result(result)
  }

  solve2 () {
    const logger = new Logger(`Day${this.day}-2`)
    let values = 0
    this.lines.forEach(line => {
      const { name } = parseLine(line, /(?<name>.+)/)
      const elf1 = name.split(",")[0]
      const elf2 = name.split(",")[1]
      const x1 = +elf1.split("-")[0]
      const y1 = +elf1.split("-")[1]
      const x2 = +elf2.split("-")[0]
      const y2 = +elf2.split("-")[1]
      if((x1 <= y2) && (x2 <= y1)){
        values++
      }
    })
    const result = values
    logger.result(result)
  }
}

const day = '04'
const testing = false

const resolver = new Resolver({ day, testing })
resolver.solve1()
resolver.solve2()