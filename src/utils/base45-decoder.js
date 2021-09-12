const BASE45_CHARSET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:'
const fromCharCode = c => BASE45_CHARSET.charAt(c)

// https://stackoverflow.com/questions/68612766/decode-a-base45-string-that-will-lead-to-a-cbor-compressed-file

const divmod = (a, b) => [Math.floor(a / b), a % b]

export default str => {
  let output = []
  let buf = []

  for (var i = 0, length = str.length; i < length; i++) {
    //console.log(i);
    let j = BASE45_CHARSET.indexOf(str[i])
    if (j < 0) console.log('Base45 decode: unknown character n.', i, j)
    //throw new Error('Base45 decode: unknown character');
    buf.push(j)
  }

  for (var i = 0, length = buf.length; i < length; i += 3) {
    let x = buf[i] + buf[i + 1] * 45
    if (length - i >= 3) {
      var [d, c] = divmod(x + buf[i + 2] * 45 * 45, 256)
      output.push(d)
      output.push(c)
    } else {
      output.push(x)
    }
  }

  return output
}
