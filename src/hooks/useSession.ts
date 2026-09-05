import { useSyncExternalStore } from "react";

const KEY = "webcv:session";

const read = () => {
  try {
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
};

const write = (value: boolean) => {
  try {
    if (value) sessionStorage.setItem(KEY, "1");
    else sessionStorage.removeItem(KEY);
  } catch {}
};

let signedIn = read();
const listeners = new Set<() => void>();

const emit = () => {
  for (const listener of listeners) listener();
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const isSignedIn = () => signedIn;

export const signIn = () => {
  signedIn = true;
  write(true);
  emit();
};

export const signOut = () => {
  signedIn = false;
  write(false);
  emit();
};

export const useSession = () => useSyncExternalStore(subscribe, isSignedIn);
