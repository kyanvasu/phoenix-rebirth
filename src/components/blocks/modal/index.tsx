"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ButtonHTMLAttributes } from "react";
import { useMedia } from "react-use";
import { Show } from "@/lib/server";
import { cn } from "@/lib/utils";

interface Props extends React.PropsWithChildren {
  onOpenChange?: (open: boolean) => void;
  pendingSpinner?: () => JSX.Element;
  onAction?: () => void;
  className?: string;
  title: string;
  open: boolean;
  dialog?: {
    className?: string;
  };
  cancel?: {
    title: string;
  };
  action: {
    title: string;
    disable?: boolean;
    pending?: boolean;
    type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  };
}

export function ModalDialog(props: Props) {
  const isWide = useMedia("(min-width: 768px)", true);

  return (
    <Show
      when={isWide}
      deps={[isWide]}
      fallback={
        <Drawer open={props.open} onOpenChange={props.onOpenChange}>
          <DrawerContent className="bg-background! md:hidden">
            <DrawerHeader>
              <DrawerTitle>{props.title}</DrawerTitle>
            </DrawerHeader>

            <div className={cn("p-4", props.className)}>{props.children}</div>

            <DrawerFooter>
              <Button
                disabled={props.action?.disable || props.action.pending}
                onClick={() => props?.onAction?.()}
              >
                {props.action.pending
                  ? (
                    !!props.pendingSpinner ? <props.pendingSpinner /> : (
                      props.action.title
                    )
                  )
                  : (
                    props.action.title
                  )}
              </Button>
              <DrawerClose asChild>
                <Button variant="outline">
                  {props.cancel?.title ?? "Cancel"}
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      }
    >
      <Dialog open={props.open} onOpenChange={props.onOpenChange}>
        <DialogContent
          className={cn("sm:max-w-[525px] h-auto", props.dialog?.className)}
        >
          <DialogHeader>
            <DialogTitle className="text-center mb-2">
              {props.title}
            </DialogTitle>

            <Separator orientation="horizontal" />
          </DialogHeader>

          <div className={cn(props.className)}>{props.children}</div>

          <DialogFooter>
            <Button
              onClick={() => props?.onOpenChange?.(false)}
              variant="outline"
            >
              {props.cancel?.title ?? "Cancel"}
            </Button>

            <Button
              disabled={props.action?.disable || props.action.pending}
              type={props.action?.type ?? "submit"}
              onClick={() => props?.onAction?.()}
            >
              <Show
                when={props.action.pending}
                deps={[props.action.pending]}
                fallback={<>{props.action.title}</>}
              >
                <Show
                  when={!!props.pendingSpinner}
                  deps={[props.pendingSpinner]}
                  fallback={<>{props.action.title}</>}
                >
                  <>{props.pendingSpinner && <props.pendingSpinner />}</>
                </Show>
              </Show>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Show>
  );
}
