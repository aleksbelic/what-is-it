import abbrList from '@/data/abbr-list.json';

export default function handler(req, res) {
  res.status(200).json(abbrList);
}
