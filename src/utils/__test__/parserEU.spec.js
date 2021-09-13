import parser from '../parserFrench'

const raw = `foo` // replace this line with real qr code value

describe('parserFrench', () => {
  it('should return true', () => {
    const result = parser(raw)
    expect(result).toEqual(true)
  })
})
