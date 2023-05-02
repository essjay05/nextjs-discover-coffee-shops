import { table, getMinifiedRecords, findRecordByFilter } from "@/lib/airtable"

const createCoffeeStore = async(req, res) => {
  
  if (req.method === 'POST') {
    // find a record
    const { id, name, address, neighbourhood, voting, imgUrl } = req.body
    
    try {
      if (id) {
        const records = await findRecordByFilter(id)
    
        if (records.length !== 0) {
          res.json(records)
        } else {
          if (name) {
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
            const records = getMinifiedRecords(newRecord)
            res.status(200)
            res.json(records)
          } else {
            res.status(400)
            res.json({ message: 'Error: Name is missing' })
          }
        }
      } else {
        res.status(400)
        res.json({ message: 'Error: Id is missing' })
      }
    } catch(err) {
      console.error('Error in creating or finding the store', err)
      res.status(500)
      res.json({ message: 'Error in creating or finding a record.', err})
    }
    
  } else {
    res.json({ message: 'This is a get request'})
    
  }
}

export default createCoffeeStore