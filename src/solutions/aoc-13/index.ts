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
  compare (first, second) {
    let ok = true
    // console.log("first", first, "second", second)
    for(let i = 0; i < first.length; i++) {
      // console.log(first[i], second[i],typeof first[i], typeof second[i], typeof first[i] === typeof second[i])
      if(typeof first[i] === typeof second[i]) {
        if(typeof first[i] === 'number') {
          if(first[i] > second[i])
            return false
          else if(first[i] < second[i])
            return true
        }
        else if(typeof first[i] === 'object') {
          return this.compare(first[i], second[i])
        }
      }
      else if (typeof first[i] === 'number' && typeof second[i] === 'object') {
        // console.log("first", [first[i]], "second", second[i])
        return this.compare([first[i]], second[i])
      }
      else if (typeof first[i] === 'object' && typeof second[i] === 'number') {
        return this.compare(first[i], [second[i]])
      }
      else {
        return false
      }
    }
    return ok
    // console.log("first", first.length, "second", second.length)
    // if(first.length > second.length)
    //   return false
    // return true
  }
  solve1 () {
    const logger = new Logger(`Day${this.day}-1`)
    let values = 0
    
    this.lines.forEach((line,index) => {
      const pairs = line.split('\n')
      const first = JSON.parse(pairs[0])
      const second = JSON.parse(pairs[1])
      let ok
      // if(index === 1  ){
      values += this.compare(first, second) ? index+1 : 0
        // console.log("ok",this.compare(first, second), first, second, index+1)
      // }
    })

    const result = values
    logger.result(result)
  }

  solve2 () {
    const logger = new Logger(`Day${this.day}-2`)
    const values = []
    this.lines.forEach((line,index) => {
      const first = line ? JSON.parse(line) : ''
      if (first)
        values.push(first)
    })
    values.push([[2]], [[6]]);
    values.sort((a,b) => {
      return this.compare(a,b) ? -1 : 1
    })
    let first,second = 0
    for(let i = 0; i < values.length; i++) {
      if(JSON.stringify(values[i]) === "[[2]]") 
        first = i+1
      if(JSON.stringify(values[i]) === "[[6]]")
        second = i+1
    }


    const result = first * second
    logger.result(result)
  }
}

const day = '13'
const testing = false

const resolver = new Resolver({ day, testing })
// resolver.solve1()
resolver.solve2()