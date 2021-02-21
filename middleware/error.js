module.exports = function (err, req, res, next) {
  if (err) return res.status(500).send({ message: 'Server Error' })
}
