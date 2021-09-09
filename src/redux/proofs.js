import { createSlice, createSelector } from '@reduxjs/toolkit'

const initialState = { byId: {}, allIds: [] }

const proofsSlice = createSlice({
  name: 'proofs',
  initialState,
  reducers: {
    addProof(state, action) {
      const proof = action.payload
      state.byId[proof.id] = proof
      state.allIds.push(proof.id)
    },
    removeProof(state, action) {
      const { id } = action.payload
      delete state.byId[id]
      state.allIds = state.allIds.filter(i => i !== id)
    },
  },
})

export const getProofs = createSelector(
  state => state.proofs.byId,
  state => state.proofs.allIds,
  (byId, allIds) => allIds.map(id => byId[id])
)

export const { addProof, removeProof } = proofsSlice.actions
export default proofsSlice.reducer

export const getFullName = proof => {
  if (!proof) return ''

  const { family, given } =
    proof.payload.vc.credentialSubject.fhirBundle.entry[0].resource.name[0]

  return `${given} ${family}`
}

export const getBirthday = proof => {
  if (!proof) return ''

  return proof.payload.vc.credentialSubject.fhirBundle.entry[0].resource
    .birthDate
}
export const getId = proof => proof.header.kid

const names = {
  208: 'Pfizer-BioNTech Covid-19 (CVX 208)',
}

export const getListOfImmunizations = proof =>
  proof.payload.vc.credentialSubject.fhirBundle.entry
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
