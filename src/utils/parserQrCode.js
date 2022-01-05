import uuid from 'react-native-uuid'

import parseShc from './parseShc'
import parserEU from './parserEU'
import parserCa from './parseShcCanada'

const parsers = [parseShc, parserEU, parserCa]

export default raw => {
  // return parseShc(raw)
  // return { ...parseShc(raw), id: uuid.v4(), raw }
  const proof = parsers.map(parser => parser(raw)).find(proof => !!proof)

  if (!proof) {
    return { id: uuid.v4(), raw, parsingFailed: true }
  }
  return { ...proof, id: uuid.v4(), raw }
}
