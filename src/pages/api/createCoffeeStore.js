const Airtable = require('airtable');
const base = new Airtable({
  apiKey: process.env.AIRTABLE_KEY
}).base(process.env.AIRTABLE_BASE);

const table = base('coffee-stores')

console.log({table})

const createCoffeeStore = (req, res) => {
  res.json({ message: 'Creating coffee store'})
}

export default createCoffeeStore