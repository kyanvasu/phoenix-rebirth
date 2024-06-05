import React, { PropsWithChildren, ReactNode } from "react";
import classnames from "classnames";
import Icons from "../../atoms/icons";
import { UserInfo } from "../../molecules";

type Props = {
  Left?: ReactNode;
  Center?: ReactNode;
  className?: string;
};

export default function Header({ Left, Center, className }: Props) {
  return (
    <div
      className={classnames(
        "p-3 flex items-center justify-between",
        className,
        {
          "bg-base-neutral-grey-10 border-b border-base-neutral-grey-40":
            !className,
        },
      )}
    >
      <Section>
        {Left}
      </Section>
      <Section>
        {Center}
      </Section>
      <Section>
        <NotificationButton />
        <UserInfo />
      </Section>
    </div>
  );
}

type SectionProps = { className?: string } & PropsWithChildren;
function Section({ children, className }: SectionProps) {
  return (
    <div className={classnames("flex items-center gap-3", className)}>
      {children}
    </div>
  );
}

function NotificationButton() {
  return (
    <div className="cursor-pointer px-2.5">
      <Icons.Bell size={20} className="stroke-base-neutral-grey-80" />
    </div>
  );
}
