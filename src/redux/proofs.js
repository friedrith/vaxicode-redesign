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
