import zlib from 'react-zlib-js'
import { decode as atob, encode as btoa } from 'base-64'
import { Buffer } from 'buffer'

const numericShcToJwt = rawSHC => {
  if (rawSHC.startsWith('shc:/')) {
    rawSHC = rawSHC.split('/')[1]
  }

  return rawSHC
    .match(/(..?)/g)
    .map(number => String.fromCharCode(parseInt(number, 10) + 45))
    .join('')
}

const parseJwtHeader = header => {
  const headerData = atob(header)
  return JSON.parse(headerData)
}

const parseJwtPayload = payload => {
  // return payload
  try {
    const buffer = Buffer.from(payload, 'base64')
    const payloadJson = zlib.inflateRawSync(buffer)
    return JSON.parse(payloadJson)
  } catch (e) {
    return e.toString()
  }
}

export default rawSHC => {
  const jwt = numericShcToJwt(rawSHC)
  const splitJwt = jwt.split('.')
  const header = parseJwtHeader(splitJwt[0])
  const payload = parseJwtPayload(splitJwt[1])

  return {
    header,
    payload,
    jwt,
    splitJwt,
  }
}
