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
