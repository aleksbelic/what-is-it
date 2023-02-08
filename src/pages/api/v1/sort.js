import fs from 'fs';
import path from 'path';
import abbrList from '@/data/abbr-list';

export default function handler(req, res) {
  let sortedAbbrList = Object.keys(abbrList)
    .sort()
    .reduce((unsortedList, currValue) => {
      unsortedList[currValue] = abbrList[currValue];
      return unsortedList;
    }, {});

  fs.writeFile(
    path.join(process.cwd(), '/data/abbr-list.json'),
    JSON.stringify(sortedAbbrList),
    err => {
      if (err) {
        res.status(500).send('Error: ' + err);
      } else {
        res.status(200).send('Sorted.');
      }
    }
  );
}
