export default function handler(req, res) {
  const body = req.body;
  console.log('body: ', body);

  if (!body.newAbbrKey || !body.newAbbrValue) {
    return res.status(400).json({data: 'Abbr not found'});
  }

  res.status(200).json({data: `${body.newAbbrKey} ${body.newAbbrValue}`});
}
