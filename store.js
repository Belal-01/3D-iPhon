import { create } from "zustand"


const store = (set)=>({
 Loaded:true,
 setLoaded:(state)=>set({Loaded:state})
})

export const useStore = create(store)