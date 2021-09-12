import zlib from 'react-zlib-js'
import { decode as atob, encode as btoa } from 'base-64'
import { Buffer } from 'buffer'

// inspired by https://github.com/obrassard/shc-extractorx

const numericShcToJwt = rawSHC =>
  rawSHC
    .replace('shc:/', '')
    .match(/(..?)/g)
    .map(number => String.fromCharCode(parseInt(number, 10) + 45))
    .join('')

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

const names = {
  208: 'Pfizer-BioNTech Covid-19 (CVX 208)',
}

const parsePayload = payload => {
  if (!payload) {
    return null
  }

  const { family, given } =
    payload.vc.credentialSubject.fhirBundle.entry[0].resource.name[0]

  const name = `${given} ${family}`

  const birthDay =
    payload.vc.credentialSubject.fhirBundle.entry[0].resource.birthDate

  const immunizations = payload.vc.credentialSubject.fhirBundle.entry
    .filter((_, index) => index > 0)
    .map((entry, index) => ({
      name: entry.resource.resourceType,
      code: entry.resource.vaccineCode.coding[0].code,
      lot: entry.resource.lotNumber,
      doseNumber: entry.resource.protocolApplied.doseNumber,
      date: entry.resource.occurrenceDateTime.split('T')[0],
      place: entry.resource.location.display.replace('"', ''),
      id: entry.resource.occurrenceDateTime.split('T')[0],
      vaccinName:
        names[entry.resource.vaccineCode.coding[0].code] ||
        entry.resource.vaccineCode.coding[0].code,
    }))

  return {
    name,
    birthDay,
    immunizations,
  }
}

export default rawSHC => {
  try {
    const jwt = numericShcToJwt(rawSHC)
    const splitJwt = jwt.split('.')
    const header = parseJwtHeader(splitJwt[0])
    const payload = parseJwtPayload(splitJwt[1])

    if (!payload) {
      throw new Error('Invalid SHC')
    }

    return {
      shc: {
        header,
        payload,
        jwt,
      },
      ...parsePayload(payload),
    }
  } catch (e) {
    return null
  }
}
