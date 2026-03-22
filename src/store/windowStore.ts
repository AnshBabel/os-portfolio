import { create } from 'zustand';

interface WindowState {
  openWindows: string[];
  minimizedWindows: string[];
  focusedWindowId: string | null;
  zIndexMap: Record<string, number>;
  nextZ: number;
  openWindow: (id: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
}

export const useWindowStore = create<WindowState>((set) => ({
  openWindows: [],
  minimizedWindows: [],
  focusedWindowId: null,
  zIndexMap: {},
  nextZ: 10,
  openWindow: (id) =>
    set((state) => ({
      openWindows: state.openWindows.includes(id) ? state.openWindows : [...state.openWindows, id],
      minimizedWindows: state.minimizedWindows.filter((w) => w !== id),
      focusedWindowId: id,
      zIndexMap: { ...state.zIndexMap, [id]: state.nextZ },
      nextZ: state.nextZ + 1,
    })),
  closeWindow: (id) =>
    set((state) => ({
      openWindows: state.openWindows.filter((w) => w !== id),
      focusedWindowId: state.focusedWindowId === id ? null : state.focusedWindowId,
    })),
  minimizeWindow: (id) =>
    set((state) => ({
      minimizedWindows: [...state.minimizedWindows, id],
      focusedWindowId: state.focusedWindowId === id ? null : state.focusedWindowId,
    })),
  focusWindow: (id) =>
    set((state) => ({
      focusedWindowId: id,
      zIndexMap: { ...state.zIndexMap, [id]: state.nextZ },
      nextZ: state.nextZ + 1,
    })),
}));
