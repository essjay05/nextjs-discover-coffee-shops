import { table, getMinifiedRecords, findRecordByFilter } from "@/lib/airtable"

const favoriteCoffeeStoreById = async (req, res) => {
  
  if (req.method === 'PUT') {
    try {
      // find a record
      const { id } = req.body
    
      if (id) {
        const records = await findRecordByFilter(id)

        if (records.length !== 0) {
          res.json(records)
        } else {
          res.status(400)
          res.json({ message: `Coffee store id: ${id} doesn't exist.`})
        }
        res.json({ message: 'this is working', id })
      } else {
        res.status(500)
        res.json({ message: "Error: id is missing"})
      }
      
    } catch(err) {
      console.error('Error favoriting coffee store', err)
      res.status(500)
      res.json({ message: 'Error favoriting coffee store', err})
    }
  }
}

export default favoriteCoffeeStoreById