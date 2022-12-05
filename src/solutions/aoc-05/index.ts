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
    let stack: any[][] = [[],[],[],[],[],[],[],[],[],[],[],[]]
    
// [M]                     [N] [Z]    
// [F]             [R] [Z] [C] [C]    
// [C]     [V]     [L] [N] [G] [V]    
// [W]     [L]     [T] [H] [V] [F] [H]
// [T]     [T] [W] [F] [B] [P] [J] [L]
// [D] [L] [H] [J] [C] [G] [S] [R] [M]
// [L] [B] [C] [P] [S] [D] [M] [Q] [P]
// [B] [N] [J] [S] [Z] [W] [F] [W] [R]
//  1   2   3   4   5   6   7   8   9 
    stack[1].push("B","L","D","T","W","C","F","M")
    stack[2].push("N","B","L")
    stack[3].push("J","C","H","T","L","V")
    stack[4].push("S","P","F","W")
    stack[5].push("Z","S","C","F","T","L","R")
    stack[6].push("W","D","G","B","H","N","Z")
    stack[7].push("F","M","S","P","V","G","C","N")
    stack[8].push("W","Q","R","J","F","V","C","Z")
    stack[9].push("R","P","M","L","H")
    this.lines.forEach(line => {
      const { name } = parseLine(line, /(?<name>.+)/)
      if(name && name[0] === "m"){
        const instruc = name.split(" ")
        for(let i = 0; i < +instruc[1]; i++){
          stack[+instruc[5]].push(stack[+instruc[3]].pop())
        }
      }
    })
    let result = ""

    stack.forEach((stack, index) => {result+=stack.length ?stack.pop() : ""})
    logger.result(result)
  }

  solve2 () {
    const logger = new Logger(`Day${this.day}-2`)
    
    let stack: any[][] = [[],[],[],[],[],[],[],[],[],[],[],[]]
    stack[1].push("B","L","D","T","W","C","F","M")
    stack[2].push("N","B","L")
    stack[3].push("J","C","H","T","L","V")
    stack[4].push("S","P","F","W")
    stack[5].push("Z","S","C","F","T","L","R")
    stack[6].push("W","D","G","B","H","N","Z")
    stack[7].push("F","M","S","P","V","G","C","N")
    stack[8].push("W","Q","R","J","F","V","C","Z")
    stack[9].push("R","P","M","L","H")
    
    // stack[1].push("Z","N")
    // stack[2].push("M","C","D")
    // stack[3].push("P")
    this.lines.forEach(line => {
      const { name } = parseLine(line, /(?<name>.+)/)
      if(name && name[0] === "m"){
        const instruc = name.split(" ")
        let queue = []
        for(let i = 0; i < +instruc[1]; i++){
          queue.push(stack[+instruc[3]].pop())
        }
        for(let j = 0; j < queue.length; j++){
          // console.log("queue",queue,j)
          stack[+instruc[5]].push(queue.pop())
          j--
        }
      }
    })
    let result = ""

    stack.forEach((stack, index) => {result+=stack.length ?stack.pop() : ""})
    logger.result(result)
  }
}

const day = '05'
const testing = false

const resolver = new Resolver({ day, testing })
resolver.solve1()
resolver.solve2()