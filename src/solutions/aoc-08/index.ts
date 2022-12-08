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
    const grid = this.lines
    // console.log("grid", grid)
    for(let i=0; i<grid.length; i++) {
      for (let j=0; j<grid[0].length; j++) {
        const directionsOk = [true, true, true, true]
        //up
        for (let k = i - 1; k >= 0; k--) {
          // console.log(grid[k][j], grid[i][j])
          if (grid[k][j] >= grid[i][j]) {
            directionsOk[0] = false
          }
        }
        //down
        for (let k = i + 1; k < grid.length; k++) {
          if (grid[k][j] >= grid[i][j]) {
            directionsOk[1] = false
          }
        }
        //left
        for (let k = j - 1; k >= 0; k--) {
          if (grid[i][k] >= grid[i][j]) {
            directionsOk[2] = false
          }
        }
        //right
        for (let k = j + 1; k < grid[i].length; k++) {
          if (grid[i][k] >= grid[i][j]) {
            directionsOk[3] = false
          }
			  }
        if (directionsOk.includes(true)) values++
      }
    }

    const result = values
    logger.result(result)
  }

  solve2 () {
    const logger = new Logger(`Day${this.day}-2`)
    let values = 0
    const grid = this.lines
    for(let i=0; i<grid.length; i++) {
      for (let j=0; j<grid[0].length; j++) {
        const directionsOk = [0, 0, 0, 0]
        //up
        for (let k = i - 1; k >= 0; k--) {
          directionsOk[0]++
          if (grid[k][j] >= grid[i][j]) {
            break
          }
        }
        //down
        for (let k = i + 1; k < grid.length; k++) {
          directionsOk[1]++
          if (grid[k][j] >= grid[i][j]) {
            break;
          }
        }
        //left
        for (let k = j - 1; k >= 0; k--) {
          directionsOk[2]++
          if (grid[i][k] >= grid[i][j]) {
            break;
          }
        }
        //right
        for (let k = j + 1; k < grid[i].length; k++) {
          directionsOk[3]++
          if (grid[i][k] >= grid[i][j]) {
            break;
          }
			  }
        values = Math.max(values, directionsOk.reduce((a, b) => a * b, 1));
      }
    }
    const result = values
    logger.result(result)
  }
}

const day = '08'
const testing = false

const resolver = new Resolver({ day, testing })
resolver.solve1()
resolver.solve2()