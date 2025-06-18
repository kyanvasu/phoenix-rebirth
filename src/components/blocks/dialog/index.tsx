"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { Show } from "@/lib/server";

interface DialogAlertProps {
  pendingSpinner?: () => JSX.Element;
  onOpenChange?: (open: boolean) => void;
  dangerAction: boolean;
  onAction?: () => void;
  description: string;
  open: boolean;
  title: string;
  cancel?: {
    title: string;
  };
  action: {
    title: string;
    disable?: boolean;
    pending?: boolean;
  };
}

export function DialogAlert(props: DialogAlertProps) {
  return (
    <AlertDialog open={props.open} onOpenChange={props.onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{props.title}</AlertDialogTitle>
          <AlertDialogDescription>{props.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => props?.onOpenChange?.(false)}>
            {props.cancel?.title ?? "Cancel"}
          </AlertDialogCancel>
          <Button
            {...(props.dangerAction ? { variant: "destructive" } : {})}
            disabled={props.action.disable}
            onClick={props.onAction}
          >
            <Show
              when={!props.action.disable || props.action.pending}
              deps={[props.action.disable, props.action.pending]}
              fallback={
                props.pendingSpinner ? (
                  <props.pendingSpinner />
                ) : (
                  <>{props.action.title}</>
                )
              }
            >
              <p>{props.action.title}</p>
            </Show>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
