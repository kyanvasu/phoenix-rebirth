import { useClientContext } from "../../../../model/store/core.store/client.store";
import { SidebarItem } from "../../../../model/types";
import NavItem from "../../molecules/nav-item";
import React, { ReactNode } from "react";
import Icons from "../../atoms/icons";
import { Body } from "../../atoms";

interface Props
  extends React.HTMLAttributes<HTMLDivElement>, React.PropsWithChildren {
  Logo?: ReactNode;
  pathname: string;
  items: SidebarItem[];
  companies?: Record<string, any>[];
  className?: string;
  bottonInfo?: boolean;
  bottonPart?: ReactNode;
}

function useSidebar({ items, pathname }: Props) {
  const currentItem = (current: SidebarItem): boolean => {
    if (!pathname) return false;
    const item = items.find((value) => pathname.includes(value.link));
    if (!item) return false;
    return current.key === item.key;
  };

  return {
    currentItem,
  };
}

export default function Sidebar(props: Props) {
  const { items, Logo, companies } = props;
  const { currentItem } = useSidebar(props);
  const { theme } = useClientContext();

  return (
    <div
      className={theme.sidebar.container}
    >
      {Logo && <div className={theme.sidebar.logoContainer}>{Logo}</div>}

      <nav className={theme.sidebar.nav}>
        <ul role="list" className={theme.sidebar.ul}>
          {items.map((item, index) => (
            <NavItem
              item={item}
              key={index}
              pathname={props.pathname}
              active={currentItem(item)}
              className={theme.sidebar.navItem}
            />
          ))}
        </ul>
      </nav>

      {companies && (
        <div className={theme.sidebar.companyContainer}>
          <ChangeCompany />
        </div>
      )}
      {props.bottonInfo && (
        <div>
          {props.bottonPart}
        </div>
      )}
    </div>
  );
}

// TODO: translates missing here
function ChangeCompany() {
  const { theme } = useClientContext();

  return (
    <div className={theme.sidebar.changeCompany}>
      <Body.Three className={theme.sidebar.changeCompanyText}>
        Change Company
      </Body.Three>
      <Icons.ChevronLeft className={theme.sidebar.changeCompanyIcon} />
    </div>
  );
}
