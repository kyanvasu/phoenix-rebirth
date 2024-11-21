"use client";

import { Config, driver, DriveStep } from "driver.js";
import { forwardRef, HTMLAttributes } from "react";

interface Steps extends DriveStep {
  wrappertName: string;
}

interface Options {
  steps: Array<Omit<Steps, "element">>;
  options: Config;
}

type WrapperProps = HTMLAttributes<HTMLDivElement>;

const WrapperComponent = forwardRef((props: WrapperProps, _) => (
  <div {...props} />
));

type WrapperRecord = typeof WrapperComponent;

export function useTourBuilder(options: Options) {
  const Wrappers = new Map<string, WrapperRecord>();
  const steps: DriveStep[] = [];

  const idBuilder = () => "tour-item-" + globalThis?.crypto?.randomUUID();

  options.steps.forEach((step) => {
    const { wrappertName, ...rest } = step;

    if (Wrappers.has(wrappertName)) {
      console.error(
        `Error: Already exist a <${wrappertName} /> Wrapper component, please use unique names for steps Wrappers\n`,
      );

      // skip this component
      return;
    }

    const id = idBuilder();

    const WithID = forwardRef((props: WrapperProps, ref) => (
      <WrapperComponent id={id} {...props} ref={ref} />
    ));

    Wrappers.set(wrappertName, WithID);

    steps.push({
      element: `#${id}`,
      ...rest,
    });
  });

  const { options: restOptions } = options;

  const Driver = driver({
    steps: steps,
    ...restOptions,
  });

  const proxy = new Proxy<Record<string, WrapperRecord>>(
    {},
    {
      get(_, componentName: string) {
        if (!Wrappers.has(componentName)) {
          console.error(
            `Error: tour wrapper component <${componentName} /> not exist, skiped on render\n`,
          );

          return () => null;
        }

        return Wrappers.get(componentName);
      },
      set() {
        console.error(`Error: tour wrapper components are read-only\n`);

        return false;
      },
    },
  );

  return {
    TourComponents: proxy,
    Driver,
  };
}
