"use client";

export const localStorageFns = {
  get: (key: string) => {
    if (typeof window === "undefined") return null;
    const item = window.localStorage.getItem(key);
    if (!item) return null;
    if (typeof item === "string") return item;
    return JSON.parse(item);
  },
  set: (key: string, value: string) => {
    if (typeof window === "undefined") return null;
    window.localStorage.setItem(key, JSON.stringify(value));
  },
  remove: (key: string) => {
    if (typeof window === "undefined") return null;
    window.localStorage.removeItem(key);
  },
};
