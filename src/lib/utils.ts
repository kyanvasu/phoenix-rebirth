import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useState } from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * dispatch custom dom events
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

type ServerCallback = (port: MessagePort, data?: any) => Promise<any>;

type ClientCallback = () => Promise<any>;

const THREAD_TIMEOUT = 60 * 1000; // 60 seconds

function CreateWorkerFromString(workerCode: string, name?: string) {
  const blob = new Blob([workerCode], { type: "application/javascript" });
  const workerUrl = URL.createObjectURL(blob);

  return new Worker(workerUrl, {
    credentials: "same-origin",
    name,
  });
}

export function useThread(name?: string) {
  /**
   * execute code on server thread
   */
  const server = (callback: ServerCallback, workerData?: any) => {
    return async () => {
      const response = await fetch("/api/threads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          execute: btoa(callback.toString()),
          workerData: btoa(JSON.stringify(workerData ?? {})),
        }),
      });

      const { response: rspns } = await response.json();

      return rspns;
    };
  };

  /**
   * execute code on client thread
   */
  const client = (callback: ClientCallback) => {
    return () =>
      new Promise((resolve) => {
        const workerCode = `
        const FN = ${callback.toString()};

        FN().then((data) => self.postMessage(data));`;

        const worker = CreateWorkerFromString(workerCode, name);

        worker.onmessage = function (e) {
          resolve(e.data);
        };

        setTimeout(() => worker.terminate(), THREAD_TIMEOUT);
      });
  };

  return {
    server,
    client,
  };
}

export type Leaves<T> = T extends Array<infer U>
  ? `${number}.${Leaves<U>}` | `[${number}].${Leaves<U>}`
  : T extends object
  ? {
      [K in keyof T]: `${Exclude<K, symbol>}${Leaves<T[K]> extends never
        ? ""
        : `.${Leaves<T[K]>}`}`;
    }[keyof T]
  : never;

export function useSet<T>(initialValues: T[] = []) {
  const [set, setSetState] = useState(new Set(initialValues));

  type UnionSet = typeof set;

  const add = (value: T) => {
    setSetState((prevSet) => {
      const newSet = new Set(prevSet);
      newSet.add(value);
      return newSet;
    });
  };

  const remove = (value: T) => {
    setSetState((prevSet) => {
      const newSet = new Set(prevSet);
      newSet.delete(value);
      return newSet;
    });
  };

  const has = (value: T) => {
    return set.has(value);
  };

  const clear = () => {
    setSetState(new Set());
  };

  const size = () => {
    return set.size;
  };

  const values = () => {
    return Array.from(set);
  };

  const union = (otherSet: UnionSet) => {
    setSetState((prevSet) => {
      const newSet = new Set(prevSet);
      otherSet.forEach((value) => newSet.add(value));
      return newSet;
    });
  };

  const intersection = (otherSet: UnionSet) => {
    setSetState((prevSet) => {
      const newSet = new Set([...prevSet].filter((x) => otherSet.has(x)));
      return newSet;
    });
  };

  const difference = (otherSet: UnionSet) => {
    setSetState((prevSet) => {
      const newSet = new Set([...prevSet].filter((x) => !otherSet.has(x)));
      return newSet;
    });
  };

  return {
    add,
    has,
    clear,
    size,
    values,
    union,
    value: set,
    difference,
    intersection,
    delete: remove,
  };
}

export function useMap<
  T extends string | number | symbol = string,
  E extends unknown = any
>(initialEntries: Iterable<readonly [T, E]> | null | undefined) {
  const [map, setMapState] = useState(new Map<T, E>(initialEntries));

  const set = (key: T, value: E) => {
    setMapState((prevMap) => {
      const newMap = new Map(prevMap);
      newMap.set(key, value);

      return newMap;
    });
  };

  const get = (key: T) => {
    return map.get(key);
  };

  const remove = (key: T) => {
    setMapState((prevMap) => {
      const newMap = new Map(prevMap);
      newMap.delete(key);
      return newMap;
    });
  };

  const has = (key: T) => {
    return map.has(key);
  };

  const clear = () => {
    setMapState(new Map());
  };

  const size = () => {
    return map.size;
  };

  const keys = () => {
    return Array.from(map.keys());
  };

  const values = () => {
    return Array.from(map.values());
  };

  const entries = () => {
    return Array.from(map.entries());
  };

  return {
    set,
    get,
    has,
    clear,
    size,
    keys,
    values,
    entries,
    value: map,
    delete: remove,
  };
}

export const toListValues = (values: string) =>
  values.split(",").map((v) => v.trim());

export const fromListValues = (values: string[] = []) =>
  values.map((v) => v.trim()).join(",");
