import { inflate } from 'pako'
import cbor from 'cbor-js'
import decode_ from './base45-decoder'

// https://github.com/manekinekko/digital-covid-certificate-decoder/blob/main/index.js
// https://github.com/ehn-dcc-development/ehn-sign-verify-javascript-trivial/blob/main/cose_verify.js

const typedArrayToBufferSliced = array =>
  array.buffer.slice(array.byteOffset, array.byteLength + array.byteOffset)

const typedArrayToBuffer = array => {
  // eslint-disable-next-line no-undef
  let buffer = new ArrayBuffer(array.length)

  array.map(function (value, i) {
    buffer[i] = value
  })
  return array.buffer
}

export default raw => {
  let data = raw

  if (data.startsWith('HC1')) {
    data = data.substring(3)
    if (data.startsWith(':')) {
      data = data.substring(1)
    } else {
      return null
    }
  } else {
    return null
  }

  data = decode_(data)

  // Zlib magic headers:
  // 78 01 - No Compression/low
  // 78 9C - Default Compression
  // 78 DA - Best Compression

  if (data[0] == 0x78) {
    data = inflate(data)
  }

  data = cbor.decode(typedArrayToBuffer(data))

  let plaintext = data[2]
  let decoded = cbor.decode(typedArrayToBufferSliced(plaintext))

  const { fn, gn } = decoded['-260']['1'].nam

  const birthDay = decoded['-260']['1'].dob

  return {
    data: decoded,
    // name: 'foo',
    name: `${gn} ${fn}`,
    birthDay,
    immunizations: [],
  }
}
