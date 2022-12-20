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
    const values: { line: number; originalIndex: number }[] = []
    this.lines.forEach((line,index) => {
      values.push({line:+line, originalIndex:index});
    })
    for(let i = 0; i < values.length; i++) {
      const index = values.find(v => v.originalIndex === i) ? values.findIndex(v => v.originalIndex === i) : 0
      const line = values[index].line
      const v = values.splice(index, 1)[0]
      // console.log("index", index, "originalIndex", originalIndex, "line", line, "v", v, index - line)
      const newI = (index+line)%values.length
      values.splice(newI,0,v)
    }
    const indexZero = values.indexOf(values.find(v => v.line === 0))
    const result = values[(indexZero+1000)%values.length].line + values[(indexZero+2000)%values.length].line + values[(indexZero+3000)%values.length].line
    logger.result(result)
  }

  solve2 () {
    const logger = new Logger(`Day${this.day}-2`)
    const values: { line: number; originalIndex: number }[] = []
    this.lines.forEach((line,index) => {
      values.push({line:+line, originalIndex:index});
    })
    values.map(v => v.line = v.line*811589153)
    for(let k = 0 ; k < 10; k++) {
      for(let i = 0; i < values.length; i++) {
        const index = values.find(v => v.originalIndex === i) ? values.findIndex(v => v.originalIndex === i) : 0
        const line = values[index].line
        const v = values.splice(index, 1)[0]
        // console.log("index", index, "originalIndex", originalIndex, "line", line, "v", v, index - line)
        const newI = (index+line)%values.length
        values.splice(newI,0,v)
      }
    }
    const indexZero = values.indexOf(values.find(v => v.line === 0))
    const result = values[(indexZero+1000)%values.length].line + values[(indexZero+2000)%values.length].line + values[(indexZero+3000)%values.length].line
    logger.result(result)
  }
}

const day = '20'
const testing = false

const resolver = new Resolver({ day, testing })
// resolver.solve1()
resolver.solve2()
