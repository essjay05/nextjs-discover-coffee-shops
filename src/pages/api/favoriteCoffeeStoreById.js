import { table, getMinifiedRecords, findRecordByFilter } from "@/lib/airtable"

const favoriteCoffeeStoreById = async (req, res) => {
  
  if (req.method === 'PUT') {
    try {
      const { id } = req.body
    
      if (id) {
        const records = await findRecordByFilter(id)

        if (records.length !== 0) {
          const record = records[0]
          const calculateVoting = parseInt(record.voting) + 1
          
          const updateRecord = await table.update([
            {
              "id": record.recordId,
              "fields": {
                voting: calculateVoting
              }
            }
          ])

          if (updateRecord) {
            const minifiedRecords = getMinifiedRecords(updateRecord)
            res.status(200)
            res.json(minifiedRecords)
          } else {
            res.status(500)
            res.json({ message: 'Error in favoriting coffee store.'})
          }
        } else {
          res.status(400)
          res.json({ message: `Coffee store id: ${id} doesn't exist.`})
        }
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