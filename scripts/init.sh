printf -v day "%02d" $1
bash ./scripts/fetch-data.sh $1
bash ./scripts/create-files.sh $1
npm run watch --day=$day