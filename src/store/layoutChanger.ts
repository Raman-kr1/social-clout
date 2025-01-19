import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface SocialLayoutChanger {
  columns: number;
  disbaled: boolean;
  setDisabled: (val: boolean) => void;
  setColumns: (col: number) => void;
}

const useLayoutChanger = create<SocialLayoutChanger>()(
  persist(
    (set) => ({
      columns: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('social-layout') || '[]') : 3,
      disbaled: false,
      setDisabled: (val) => set({ disbaled: val }),
      setColumns: (newColumns) => set({ columns: newColumns }),
    }),
    {
      name: 'social-layout', // Name for the persisted storage key
      storage: createJSONStorage(() => localStorage)
    }
  )
);

export default useLayoutChanger;