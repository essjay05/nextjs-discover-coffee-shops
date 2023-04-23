export default function handler(req, res) {
  console.log({req, res})
  res.status(200).json({ message: `Max is the best doggo!` })
}
