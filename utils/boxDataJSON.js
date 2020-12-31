const box = []

for (let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); i++) {
  box.push(String.fromCharCode(i))
}

for (let i = 'a'.charCodeAt(0); i <= 'z'.charCodeAt(0); i++) {
  box.push(String.fromCharCode(i))
}

for (let i = 0; i <= 9; i++) {
  box.push(i.toString())
}

console.log(JSON.stringify(box)) // output to JSON file