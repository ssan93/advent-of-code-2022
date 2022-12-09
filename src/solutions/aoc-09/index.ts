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
    let setPos = new Set()
    let currentHeadPos = [0,0]
    let currentTailPos = [0,0]
    setPos.add(currentTailPos[0]+','+currentTailPos[1])
    console.log("setPos", setPos)
    const directions = {
      'U': [0,1],
      'D': [0,-1],
      'R': [1,0],
      'L': [-1,0]
    }
    this.lines.forEach(line => {
      const { name } = parseLine(line, /(?<name>.+)/)
      const direction = name.split(' ')[0]
      let moves = +name.split(' ')[1]
      for(let i = 0; i < moves; i++){
        currentHeadPos = [currentHeadPos[0] + directions[direction][0], currentHeadPos[1] + directions[direction][1]]
        if (currentTailPos[0] == currentHeadPos[0]+1 && currentTailPos[1] == currentHeadPos[1]+2){
          currentTailPos[0]--
          currentTailPos[1]--
        }
        else if (currentTailPos[0] == currentHeadPos[0]-1 && currentTailPos[1] == currentHeadPos[1]+2){
          currentTailPos[0]++
          currentTailPos[1]--
        }
        else if (currentTailPos[0] == currentHeadPos[0]+1 && currentTailPos[1] == currentHeadPos[1]-2){
          currentTailPos[0]--
          currentTailPos[1]++
        }
        else if (currentTailPos[0] == currentHeadPos[0]-1 && currentTailPos[1] == currentHeadPos[1]-2){
          currentTailPos[0]++
          currentTailPos[1]++
        }
        else if (currentTailPos[0] == currentHeadPos[0]+2 && currentTailPos[1] == currentHeadPos[1]+1){
          currentTailPos[0]--
          currentTailPos[1]--
        }
        else if (currentTailPos[0] == currentHeadPos[0]-2 && currentTailPos[1] == currentHeadPos[1]+1){
          currentTailPos[0]++
          currentTailPos[1]--
        }
        else if (currentTailPos[0] == currentHeadPos[0]+2 && currentTailPos[1] == currentHeadPos[1]-1){
          currentTailPos[0]--
          currentTailPos[1]++
        }
        else if (currentTailPos[0] == currentHeadPos[0]-2 && currentTailPos[1] == currentHeadPos[1]-1){
          currentTailPos[0]++
          currentTailPos[1]++
        }
        else if(currentTailPos[0] == currentHeadPos[0]+2)
          currentTailPos[0]-- 
        else if (currentTailPos[0] == currentHeadPos[0]-2)
          currentTailPos[0]++
        else if (currentTailPos[1] == currentHeadPos[1]+2)
          currentTailPos[1]--
        else if (currentTailPos[1] == currentHeadPos[1]-2)
          currentTailPos[1]++
        // else if (currentTailPos[0] == currentHeadPos[0]-1 && currentTailPos[1] == currentHeadPos[1]+1){
        //   currentTailPos[0]++
        //   currentTailPos[1]--
        // }
        // else if (currentTailPos[0] == currentHeadPos[0]+1 && currentTailPos[1] == currentHeadPos[1]-1){
        //   currentTailPos[0]--
        //   currentTailPos[1]++
        // }
        // else if (currentTailPos[0] == currentHeadPos[0]-1 && currentTailPos[1] == currentHeadPos[1]-1){
        //   currentTailPos[0]++
        //   currentTailPos[1]++ 
        // }
        // console.log("currentHeadPos", currentHeadPos,"currentTailPos", currentTailPos)
        setPos.add(currentTailPos[0]+','+currentTailPos[1])
        // console.log("setPos", setPos)
      }
      // values[name] = 0
    })
    // console.log("setPos", setPos)
    const result = setPos.size
    logger.result(result)
  }

  solve2 () {
    const logger = new Logger(`Day${this.day}-2`)
    const values = {}
    let setPos = new Set()
    let currentPos = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]
    setPos.add(currentPos[0][0]+','+currentPos[0][1])
    console.log("setPos", setPos)
    const directions = {
      'U': [0,1],
      'D': [0,-1],
      'R': [1,0],
      'L': [-1,0]
    }
    this.lines.forEach(line => {
      const { name } = parseLine(line, /(?<name>.+)/)
      const direction = name.split(' ')[0]
      let moves = +name.split(' ')[1]
      for(let i = 0; i < moves; i++){
        currentPos[0] = [currentPos[0][0] + directions[direction][0], currentPos[0][1] + directions[direction][1]]
        for (let j = 1 ; j < currentPos.length; j++){
          if (currentPos[j][0] == currentPos[j-1][0]+1 && currentPos[j][1] == currentPos[j-1][1]+2){
            currentPos[j][0]--
            currentPos[j][1]--
          }
          else if (currentPos[j][0] == currentPos[j-1][0]-1 && currentPos[j][1] == currentPos[j-1][1]+2){
            currentPos[j][0]++
            currentPos[j][1]--
          }
          else if (currentPos[j][0] == currentPos[j-1][0]+1 && currentPos[j][1] == currentPos[j-1][1]-2){
            currentPos[j][0]--
            currentPos[j][1]++
          }
          else if (currentPos[j][0] == currentPos[j-1][0]-1 && currentPos[j][1] == currentPos[j-1][1]-2){
            currentPos[j][0]++
            currentPos[j][1]++
          }
          else if (currentPos[j][0] == currentPos[j-1][0]+2 && currentPos[j][1] == currentPos[j-1][1]+1){
            currentPos[j][0]--
            currentPos[j][1]--
          }
          else if (currentPos[j][0] == currentPos[j-1][0]-2 && currentPos[j][1] == currentPos[j-1][1]+1){
            currentPos[j][0]++
            currentPos[j][1]--
          }
          else if (currentPos[j][0] == currentPos[j-1][0]+2 && currentPos[j][1] == currentPos[j-1][1]-1){
            currentPos[j][0]--
            currentPos[j][1]++
          }
          else if (currentPos[j][0] == currentPos[j-1][0]-2 && currentPos[j][1] == currentPos[j-1][1]-1){
            currentPos[j][0]++
            currentPos[j][1]++
          }
          else if (currentPos[j][0] == currentPos[j-1][0]+2 && currentPos[j][1] == currentPos[j-1][1]+2){
            currentPos[j][0]--
            currentPos[j][1]--
          }
          else if (currentPos[j][0] == currentPos[j-1][0]-2 && currentPos[j][1] == currentPos[j-1][1]+2){
            currentPos[j][0]++
            currentPos[j][1]--
          }
          else if (currentPos[j][0] == currentPos[j-1][0]+2 && currentPos[j][1] == currentPos[j-1][1]-2){
            currentPos[j][0]--
            currentPos[j][1]++
          }
          else if (currentPos[j][0] == currentPos[j-1][0]-2 && currentPos[j][1] == currentPos[j-1][1]-2){
            currentPos[j][0]++
            currentPos[j][1]++
          }
          else if(currentPos[j][0] >= currentPos[j-1][0]+2)
            currentPos[j][0]-- 
          else if (currentPos[j][0] <= currentPos[j-1][0]-2)
            currentPos[j][0]++
          else if (currentPos[j][1] >= currentPos[j-1][1]+2)
            currentPos[j][1]--
          else if (currentPos[j][1] <= currentPos[j-1][1]-2)
            currentPos[j][1]++
        }   
        setPos.add(currentPos[9][0]+','+currentPos[9][1])
        // console.log("setPos", setPos)
      }
    })
    // console.log("setPos", setPos)
    const result = setPos.size
    logger.result(result)
  }
}

const day = '09'
const testing = false

const resolver = new Resolver({ day, testing })
resolver.solve1()
resolver.solve2()