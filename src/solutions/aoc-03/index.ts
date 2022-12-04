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
      const length = name.length
      const rucksack1=name.slice(0,length/2)
      const rucksack2=name.slice(length/2,length)
      const commonLetter = rucksack1.split('').find((c: string) => rucksack2.includes(c))
      let c
      values+=(c = commonLetter.charCodeAt(0)-96) < 0 ? c+31+27 : c
      // let ok=false
      // rucksack1.split('').forEach((letter: string) => {
      //   if (rucksack2.includes(letter) && !ok) {
      //     // console.log(letter,letter.charCodeAt(0)-96, letter.charCodeAt(0)-96+31+27)
      //     // if (letter.charCodeAt(0)-96 < 0)
      //     //   values+=letter.charCodeAt(0)-96+31+27
      //     // else 
      //     //   values+=letter.charCodeAt(0)-96
      //     let c
      //     values+=(c = letter.charCodeAt(0)-96) < 0 ? c+31+27 : c
      //     ok=true
      //   }
      // })
    })

    const result = values
    logger.result(result)
  }

  solve2 () {
    const logger = new Logger(`Day${this.day}-2`)
    let values = 0
    for(let i = 0; i < this.lines.length; i+=3) {
      const rucksack1  = this.lines[i].split("")
      const rucksack2  = this.lines[i+1].split("")
      const rucksack3  = this.lines[i+2].split("")
      let ok=false
      const commonLetter = rucksack1.find((c: string) => rucksack2.includes(c) && rucksack3.includes(c))
      let c
      values+=(c = commonLetter? commonLetter.charCodeAt(0)-96:0) < 0 ? c+31+27 : c
      // rucksack1.forEach(letter => {
      //   if (rucksack2.includes(letter) && rucksack3.includes(letter) && !ok) {
      //     if (letter.charCodeAt(0)-96 < 0)
      //       values+=letter.charCodeAt(0)-96+58
      //     else 
      //       values+=letter.charCodeAt(0)-96
      //     ok=true
      //   }
      // })
    }
    const result = values
    logger.result(result)
  }
}

const day = '03'
const testing = true

const resolver = new Resolver({ day, testing })
resolver.solve1()
resolver.solve2()