export default function handler(req, res) {
  console.log({req, res})
  res.status(200).json({ message: `Hi store!` })
}
