import { table, getMinifiedRecords, findRecordByFilter } from "@/lib/airtable"

const favoriteCoffeeStoreById = (req, res) => {
  
  if (req.method === 'PUT') {
    // find a record
    const { id } = req.body
    res.json({ message: 'this is working', id })
    
    // try {
    //   if (id) {
    //     const records = await findRecordByFilter(id)
    
    //     if (records.length !== 0) {
    //       res.json(records)
    //     } else {
    //       if (name) {
    //         // create record
    //         // res.json({ message: 'Record not found so CREATE a record'})
    //         const newRecord = await table.update([
    //           {
    //             fields: {
    //               id,
    //               name,
    //               address,
    //               neighbourhood,
    //               voting,
    //               imgUrl
    //             }
    //           }
    //         ])
    //         const records = getMinifiedRecords(newRecord)
    //         res.status(200)
    //         res.json(records)
    //       } else {
    //         res.status(400)
    //         res.json({ message: 'Error: Name is missing' })
    //       }
    //     }
    //   } else {
    //     res.status(400)
    //     res.json({ message: 'Error: Id is missing' })
    //   }
    // } catch(err) {
    //   console.error('Error in creating or finding the store', err)
    //   res.status(500)
    //   res.json({ message: 'Error in creating or finding a record.', err})
    // }
  }
}

export default favoriteCoffeeStoreById