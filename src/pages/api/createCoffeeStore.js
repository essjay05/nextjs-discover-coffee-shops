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
    try {
      const findCoffeeStoreRecords = await table.select({
        filterByFormula: `id="2"`
      }).firstPage()
  
      if (findCoffeeStoreRecords.length !== 0) {
        const csFields = findCoffeeStoreRecords.map(record => {
          return {
            ...record.fields
  
          }
        })
        res.json(csFields)
      } else {
        // create record
        const newRecord = await table.create([
          {
            'fields': {
              'id': '2',
              'name': 'Test Coffee',
              'address': '2332 42nd Ave, San Francisco, CA 94121',
              'neighbourhood': 'Outer Richmond SF',
              'voting': 200,
              'img-url': 'https://unsplash-img.com/test-coffee'
            }
          }
        ])
        res.json({ message: 'Created a record', records: newRecord })
      }
    } catch(err) {
      console.error('Error finding the store', err)
      res.status(500)
      res.json({ message: 'Error in finding a record.', err})
    }
    
  } else {
    res.json({ message: 'This is a get request'})
    
  }
}

export default createCoffeeStore