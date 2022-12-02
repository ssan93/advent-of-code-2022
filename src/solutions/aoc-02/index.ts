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
    const values = {}
    // values["A X"] = 3;  values["B X"] = 0;    values["C X"] = 6
    // values["A Y"] = 6;  values["B Y"] = 3;    values["C Y"] = 0
    // values["A Z"] = 0;  values["B Z"] = 6;    values["C Z"] = 3
    // values["X"] = 1
    // values["Y"] = 2
    // values["Z"] = 3
    // let points = 0
    // this.lines.forEach(line => {
    //   const { name } = parseLine(line, /(?<name>.+)/)
    //   points += values[name.split(" ")[1]] + values[name]
    // })

    values["A"] = 1;  values["X"] = 1;  
    values["B"] = 2;  values["Y"] = 2;  
    values["C"] = 3;  values["Z"] = 3;  
    //1-1 = 0 draw  2-1 = 1 win  3-1 = 2 lose
    //1-1 = 0 draw  1-2 = -1(2) lose  1-3 = -2(1) win
    let points = 0
    let outcome
    this.lines.forEach(line => {
      const { name } = parseLine(line, /(?<name>.+)/)
      points += values[name.split(" ")[1]]
      outcome = (((values[name.split(" ")[1]]-values[name.split(" ")[0]])%3)+3)%3
      outcome == 0 ? points += 3 : outcome == 1 ? points += 6 : points
    })

    const result = points
    logger.result(result)
  }

  solve2 () {
    const logger = new Logger(`Day${this.day}-2`)
    const values = {}
    const res = {}
    // values["A X"] = 3;    values["B X"] = 1;    values["C X"] = 2
    // values["A Y"] = 1;    values["B Y"] = 2;    values["C Y"] = 3
    // values["A Z"] = 2;    values["B Z"] = 3;    values["C Z"] = 1
    // values["X"] = 0
    // values["Y"] = 3
    // values["Z"] = 6
    // let points = 0
    // this.lines.forEach(line => {
    //   const { name } = parseLine(line, /(?<name>.+)/)
    //   points += values[name.split(" ")[1]] + values[name]
    // })

    values["A"] = 1;  values["X"] = 0;  res["X"] = 2
    values["B"] = 2;  values["Y"] = 3;  res["Y"] = 0
    values["C"] = 3;  values["Z"] = 6;  res["Z"] = 1
    //x-1=2 x-1=0 x-1=1  3 1 2  3 1 2
    //x-2=2 x-2=0 x-2=1  4 2 3  1 2 3
    //x-3=2 x-3=0 x-3=1  5 3 4  2 3 1
    //2:lose 0:draw 1:win  
    let points = 0
    this.lines.forEach(line => {
      const { name } = parseLine(line, /(?<name>.+)/)
      points += values[name.split(" ")[1]]
      let chosenForm = values[name.split(" ")[0]]+ res[name.split(" ")[1]]
      chosenForm > 3 ? chosenForm -= 3 : chosenForm
      points += chosenForm
    })
    const result = points
    logger.result(result)
  }
}

const day = '02'
const testing = false
const resolver = new Resolver({ day, testing })
resolver.solve1()
resolver.solve2()