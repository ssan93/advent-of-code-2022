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
    const targetSet = new Set()
    const beaconSet = new Set()
    const target = 2000000
    //Sensor at x=1518415, y=2163633: closest beacon is at x=1111304, y=1535696
    this.lines.forEach(line => {
      const sensor = line.split(': ')[0].split('at ')[1].split(', ')
      const beacon = line.split(': ')[1].split('at ')[1].split(', ')
      const sensorX = parseInt(sensor[0].split('=')[1])
      const sensorY = parseInt(sensor[1].split('=')[1])
      const beaconX = parseInt(beacon[0].split('=')[1])
      const beaconY = parseInt(beacon[1].split('=')[1])
      let distanceFromBeacon = Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY)
      const distanceFromTarget = Math.abs(sensorY - target)
      if(beaconY == target) {
        beaconSet.add(beaconX)
      }
      // if (sensorX == 16 && sensorY == 7) {
        // console.log(sensorX, sensorY, beaconX, beaconY, distanceFromBeacon, distanceFromTarget)
        while (distanceFromBeacon >= distanceFromTarget) {
          targetSet.add(sensorX+distanceFromBeacon-distanceFromTarget)
          targetSet.add(sensorX-distanceFromBeacon+distanceFromTarget)
          distanceFromBeacon--
          // console.log(targetSet)
        }
      // }
      // values[name] = 0
    })
    beaconSet.forEach(beacon => {
      targetSet.delete(beacon)
    })
    console.log(beaconSet)
    const result = targetSet.size
    logger.result(result)
  }

  check(x: number, y: number) {
    this.lines.forEach(line => {
      const sensor = line.split(': ')[0].split('at ')[1].split(', ')
      const beacon = line.split(': ')[1].split('at ')[1].split(', ')
      const sensorX = parseInt(sensor[0].split('=')[1])
      const sensorY = parseInt(sensor[1].split('=')[1])
      const beaconX = parseInt(beacon[0].split('=')[1])
      const beaconY = parseInt(beacon[1].split('=')[1])
      const distanceFromBeacon = Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY)
			const dist2 = Math.abs(sensorX - x) + Math.abs(sensorY - y);

			if (dist2 < distanceFromBeacon) {
				return false;
			}
		})

		return true;
	}

  solve2 () {
    const logger = new Logger(`Day${this.day}-2`)
    let value = 0
    for (let target = 0; target < 4000000; target++) {
      const targetSet = new Set()
      const beaconSet = new Set()
      //Sensor at x=1518415, y=2163633: closest beacon is at x=1111304, y=1535696
      this.lines.forEach(line => {
        const sensor = line.split(': ')[0].split('at ')[1].split(', ')
        const beacon = line.split(': ')[1].split('at ')[1].split(', ')
        const sensorX = parseInt(sensor[0].split('=')[1])
        const sensorY = parseInt(sensor[1].split('=')[1])
        const beaconX = parseInt(beacon[0].split('=')[1])
        const beaconY = parseInt(beacon[1].split('=')[1])
        let distanceFromBeacon = Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY)
        for (const xx of [-1, 1]) {
          for (const yy of [-1, 1]) {
            for (let dx = 0; dx <= distanceFromBeacon + 1; dx++) {
              const dy = distanceFromBeacon + 1 - dx;
              let x = sensorX + dx * xx;
              let y = sensorY + dy * yy;
              if (x < 0 || y < 0 || x > 4000000 || y > 4000000) {
                return false;
              }
              if (this.check(x, y)) {
                return x * 4000000 + y;
              }
            }
          }
        }
        // const distanceFromTarget = Math.abs(sensorY - target)
        // beaconSet.add(beaconX)
        // const x1 = sensorX + distanceFromBeacon - distanceFromTarget;
        // const x2 = sensorX - distanceFromBeacon + distanceFromTarget;
        // if (x1 >= 0 && x1 < 4000000) {
        //   targetSet.add(x1)
        // }
        // while (distanceFromBeacon >= distanceFromTarget) {
        //   targetSet.add(sensorX+distanceFromBeacon-distanceFromTarget)
        //   targetSet.add(sensorX-distanceFromBeacon+distanceFromTarget)
        //   distanceFromBeacon--
        // }
      })
      // if(targetSet.size < 4861077) {
      //   console.log(target, targetSet.size)
      //   for(let i = 0; i < 4000000; i++) {
      //     if (!targetSet.has(i)) {
      //       console.log('here', i, i*4000000+target)
      //     }
      //   }
      // }
      // for(let i = 0; i < 1; i++) {
      //   if (!targetSet.has(i)) {
      //     console.log('here', i, i*4000000+target)
      //   }
      // }
      // console.log(beaconSet)
    }

    const result = 0
    logger.result(result)
  }
}

const day = '15'
const testing = false

const resolver = new Resolver({ day, testing })
// resolver.solve1()
resolver.solve2()