import React from "react";
import { create } from "zustand";

const useDataStore = create((set, get) => ({
	contributors: [],
	addContributor: (contributor) =>
		set((state) => ({
			...state,
			contributors: [...state.contributors, contributor],
		})),
	setContributors: (contributor) =>
		set((state) => ({
			...state,
			contributors: contributor,
		})),
    deleteContributor: (id) => 
        set((state) => ({
            ...state, 
            contributors: [...state.contributors.filter(cbt => cbt.id !== id )]
        })),
    editContributor: (contributor) => 
        set((state) => ({
            ...state, 
            contributors: [...state.contributors.filter(cbt => cbt.id !== contributor.id ), contributor]
        })),
    // 
	budgetAmount: 0,
	setBudgetAmount: (budgetAmount) =>
		set((state) => ({ 
            ...state, 
            budgetAmount: budgetAmount 
        }
    )),
    // 
    id: null,
    setId: (id) => set((state) => ({...state, id: id})),
    //
    resetData: () => 
        set((state) => ({
            ...state,
            budgetAmount: 0,
            contributors: []
        }))
}));

export default useDataStore;
