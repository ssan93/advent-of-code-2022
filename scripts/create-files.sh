printf -v day "%02d" $1
mkdir -p ./src/solutions
mkdir -p ./src/solutions/aoc-$day
cat ./src/template/aoc/template.ts > ./src/solutions/aoc-$day/index.ts
touch ./src/solutions/aoc-$day/data.txt
touch ./src/solutions/aoc-$day/test.txt