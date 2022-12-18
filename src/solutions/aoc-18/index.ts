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
    const values = []
    let surface = 0
    this.lines.forEach(line => {
      const { name } = parseLine(line, /(?<name>.+)/)
      const coords = name.split(',')
      const x = +coords[0]
      const y = +coords[1]
      const z = +coords[2]
      let addSurface = 6
      for(let i = 0; i < values.length; i++) {
        const v = values[i]
        const d = Math.abs(x - v.x) + Math.abs(y - v.y) + Math.abs(z - v.z)
        if (d <= 1) {
          // console.log('add', d, x, y, z, v.x, v.y, v.z)
          addSurface -= 2
        }
      }
      surface += addSurface
      values.push({ x, y, z })
      

      // console.log(values, surface)
      // values[name] = 0
    })

    const result = surface
    logger.result(result)
  }
  add(x, y, z, values) {
    let addSurface = 6
      for(let i = 0; i < values.length; i++) {
        const v = values[i]
        const d = Math.abs(x - v.x) + Math.abs(y - v.y) + Math.abs(z - v.z)
        if (d <= 1) {
          // console.log('add', d, x, y, z, v.x, v.y, v.z)
          addSurface -= 2
        }
      }
      return addSurface
  }
  solve2 () {
    const logger = new Logger(`Day${this.day}-2`)
    
  }
}

const day = '18'
const testing = false

const resolver = new Resolver({ day, testing })
// resolver.solve1()
resolver.solve2()