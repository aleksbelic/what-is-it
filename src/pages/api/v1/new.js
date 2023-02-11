import fs from 'fs';
import path from 'path';
import abbrList from '@/data/abbr-list';

export default function handler(req, res) {
  const body = req.body;
  let newAbbrKey = body.newAbbrKey.toUpperCase();
  let newAbbrValue = body.newAbbrValue;

  if (!newAbbrKey || !newAbbrValue) {
    return res
      .status(400)
      .json({msg: '❌ Invalid input, new abbreviation could not be added.'});
  }

  // TODO: validate if duplicate
  abbrList[newAbbrKey] = newAbbrValue;

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
        res.status(500).json({msg: '❌ New abbreviation could not be saved.'});
      } else {
        res.status(200).json({msg: 'New abbreviation successfuly saved.'});
      }
    }
  );
}
