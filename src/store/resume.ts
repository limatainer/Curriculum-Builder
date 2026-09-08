import { atom, getDefaultStore } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { DEFAULT } from "@/constants";
import { mergeStored } from "@/helpers/mergeStored";
import type { ResumeData } from "@/types";

const STORAGE_KEY = "webcv:resume";

const WRITE_DELAY_MS = 300;

const QUOTA_MESSAGE = "Não foi possível salvar: armazenamento cheio. Use uma foto menor.";

export const saveErrorAtom = atom<string | null>(null);

const base = createJSONStorage<ResumeData>(() => localStorage);

let timer: ReturnType<typeof setTimeout> | null = null;
let queued: { key: string; value: ResumeData } | null = null;

const flush = () => {
  timer = null;
  if (!queued) return;
  const { key, value } = queued;
  queued = null;
  try {
    base.setItem(key, value);
    getDefaultStore().set(saveErrorAtom, null);
  } catch {
    getDefaultStore().set(saveErrorAtom, QUOTA_MESSAGE);
  }
};

const storage = {
  getItem: (key: string, initial: ResumeData) => {
    try {
      return mergeStored(base.getItem(key, initial), initial);
    } catch {
      return initial;
    }
  },
  setItem: (key: string, value: ResumeData) => {
    queued = { key, value };
    if (timer) clearTimeout(timer);
    timer = setTimeout(flush, WRITE_DELAY_MS);
  },
  removeItem: (key: string) => {
    if (timer) clearTimeout(timer);
    timer = null;
    queued = null;
    base.removeItem(key);
  },
  subscribe: base.subscribe,
};

export const resumeAtom = atomWithStorage<ResumeData>(STORAGE_KEY, DEFAULT, storage, {
  getOnInit: true,
});
