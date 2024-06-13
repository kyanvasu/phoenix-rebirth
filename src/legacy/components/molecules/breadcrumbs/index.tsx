import classNames from "classnames";
import Link from "next/link";

interface Props {
  pages: {
    name: string;
    current: false;
    url?: string;
  }[];
  textClass?: string;
}

export default function Breadcrumbs(props: Props) {
  const { pages, textClass } = props;
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        {pages.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <svg
                className="h-5 w-5 flex-shrink-0 text-gray-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
              <div
                className={classNames("ml-4 text-sm font-medium", textClass, {
                  "text-gray-500 hover:text-gray-700": !textClass,
                })}
                aria-current={page.current ? "page" : undefined}
              >
                {page.url
                  ? (
                    <Link href={page.url}>
                      {page.name}
                    </Link>
                  )
                  : (
                    page.name
                  )}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
