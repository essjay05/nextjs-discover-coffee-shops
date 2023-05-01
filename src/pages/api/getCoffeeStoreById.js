import { table, getMinifiedRecords } from "@/lib/airtable"

const getCoffeeStoreById = async (req, res) => {
  const { id } = req.query

  try {
    if (id) {
      const findCoffeeStoreRecords = await table.select({
        filterByFormula: `id="${id}"`
      }).firstPage()
  
      if (findCoffeeStoreRecords.length !== 0) {
        const record = getMinifiedRecords(findCoffeeStoreRecords)
        res.json(record)
      } else {
        res.json({ message: 'Id could not be found'})
      }
    } else {
      res.status(400)
      res.json({ message: 'Error: Id is missing' })
    }
  } catch(err) {
    res.status(500)
    res.json({message: 'Something went wrong fetching the id.', err})
  }

}

export default getCoffeeStoreById