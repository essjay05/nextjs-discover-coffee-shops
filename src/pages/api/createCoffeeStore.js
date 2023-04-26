const Airtable = require('airtable');
const base = new Airtable({
  apiKey: process.env.AIRTABLE_KEY
}).base(process.env.AIRTABLE_BASE);

const table = base('coffee-stores')

// console.log({table})

const createCoffeeStore = async(req, res) => {
  // console.log({req})
  
  if (req.method === 'POST') {
    // find a record
    const { id, name, address, neighbourhood, voting, imgUrl } = req.body
    console.log('req.body:')
    console.log(req.body)
    console.log(`
      req.body values:
      id: ${id},
      name: ${name},
      address: ${address},
      neighbourhood: ${neighbourhood},
      voting: ${voting},
      imgUrl: ${imgUrl}
    `)
    try {
      const findCoffeeStoreRecords = await table.select({
        filterByFormula: `id=${id}`
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
        // res.json({ message: 'Record not found so CREATE a record'})
        const newRecord = await table.create([
          {
            fields: {
              id,
              name,
              address,
              neighbourhood,
              voting,
              imgUrl
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