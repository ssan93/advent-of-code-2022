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
    // let walls = Array.from({length:10},()=> Array.from({length:550},()=> "."))
    let walls = Array.from({length:162},()=> Array.from({length:1000},()=> "."))
    this.lines.forEach(line => {
      const { name } = parseLine(line, /(?<name>.+)/)
      const coords = name.split(' -> ')
      for(let i = 1; i < coords.length; i++) {
        const [x, y] = coords[i].split(',').map(x => parseInt(x))
        const [x2, y2] = coords[i-1].split(',').map(x => parseInt(x))
        if(x !== x2) {
          for(let j = Math.min(x, x2); j <= Math.max(x, x2); j++) {
            walls[y][j] = "#"
            // console.log("wall", y, j, walls[y][j])
          }
        } else {
          for(let j = Math.min(y, y2); j <= Math.max(y, y2); j++) {
            walls[j][x] = "#"
          }
        }
        
      }
      // console.log("walls",walls)

      // values[name] = 0
    })
    // console.log("wall", walls.length, walls[400][0], walls[501][9])
    // this.draw(walls)

    const sandPoint = [500, 0]
    
    const cave = JSON.parse(JSON.stringify(walls)).concat(
      Array.from({ length: 2 }, (_, i) =>
        Array.from({ length: walls[0].length }, () => (i ? '#' : '.'))
      )
    );
    this.draw(cave)
    let sand = true;
    let count = -1;
    while (sand) {
      sand = this.addSand(cave, sandPoint);
      count++;
    }
    this.draw(cave)
    const result = count
    logger.result(result)
  }

  draw(walls){
    let drawing = ''
      for(let j = 0; j <= 11; j++) {
        for(let i = 490; i <= 512; i++) {
          drawing += walls[j][i]
        }
      
      drawing += "\n"
    }
    //    console.log("minSet", minWallx, maxWally, maxWallx, minWally)
    // minSet 494 9 503 4
    // minSet 473 161 578 14
    console.log(drawing)
  }
  fill = (grid: string[][], coord) => {
    const [x, y] = coord
    if (y === grid.length - 1) return [null, false]
    if (grid[y + 1][x] === '.') return [[x, y + 1], false]
    if (x < 0) return [null, false]
    if (grid[y + 1][x - 1] === '.') return [[x - 1, y], false]
    if (x > grid[0].length - 1) return [null, false]
    if (grid[y + 1][x + 1] === '.') return [[x + 1, y], false]
    return [coord, true]
  }
  addSand = (walls: string[][], sandPoint): boolean => {
    let sand = sandPoint
    if (walls[sand[1]][sand[0]] === 'o') return false
    let ok = false
    while (ok === false) {
      [sand, ok] = this.fill(walls, sand)
      if (sand === null) return false
    }
    walls[sand[1]][sand[0]] = 'o'
    return true
  }

  solve2 () {
    const logger = new Logger(`Day${this.day}-2`)

    const result = 0
    logger.result(result)
  }
}

const day = '14'
const testing = false

const resolver = new Resolver({ day, testing })
resolver.solve1()
// resolver.solve2()