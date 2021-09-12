import parser from '../parserEU'

const raw = `foo` // replace this line with real qr code value

describe('parserEU', () => {
  it('should return true', () => {
    const result = parser(raw)
    expect(result).toEqual(true)
  })
})
