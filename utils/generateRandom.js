const generateRandom = (box, length) => {
  let str = ''

  for (let i = 0; i < length; i++) {
    let randomIndex = Math.floor(Math.random() * box.length)
    str += box[randomIndex]
  }

  return str
}

module.exports = generateRandom