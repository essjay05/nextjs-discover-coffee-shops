const getCoffeeStoreById = (req, res) => {
  const { id } = req.query

  try {
    res.json({ message: `id is created ${id}`})
  } catch(err) {
    res.status(500)
    res.json({message: 'Something went wrong fetching the id.', err})
  }

}

export default getCoffeeStoreById