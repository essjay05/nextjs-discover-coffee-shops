const Airtable = require('airtable');
const base = new Airtable({
  apiKey: process.env.AIRTABLE_KEY
}).base(process.env.AIRTABLE_BASE);

const table = base('coffee-stores')

console.log({table})

const createCoffeeStore = async(req, res) => {
  console.log({req})
  
  if (req.method === 'POST') {
    // find a record
    const findCoffeeStoreRecord = await table.select({
      filterByFormula: `id="0"`
    }).firstPage()

    if (findCoffeeStoreRecord.length !== 0) {
      res.json(findCoffeeStoreRecord)
    } else {
      // create record
      res.json({ message: 'Record not found so CREATE a record'})
    }
  } else {
    res.json({ message: 'This is a get request'})
  }
}

export default createCoffeeStore