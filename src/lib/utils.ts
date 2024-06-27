import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * dispatch custom dom events
 *
 */
export function useEvents<T extends any = any>() {
  /**
   * dispatch custom event
   * @param name {string}
   * @param data {any}
   */
  const emit = (name: string, data: T) => {
    const event = new CustomEvent(name, { detail: data });

    document.dispatchEvent(event);
  };

  /**
   * listen custom events
   * @param name
   * @param listener
   */
  const on = (name: string, listener: (data: { detail: T }) => void) => {
    document.addEventListener(name, ({ detail }: any) => listener({ detail }));

    /**
     * unsubcribe from listen custom event
     */
    return () => document.removeEventListener(name, listener as any);
  };

  return {
    emit,
    on,
  };
}
