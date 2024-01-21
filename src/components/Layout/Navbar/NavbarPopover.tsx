import type { ComponentProps, FC } from "react";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import Link from "@components/Elements/Link";
import Util from "@util/index";
import Motion from "@components/Utilities/Motion";

const NavbarPopover: FC<{
  categoryName: string;
  subCategories: Array<{
    name: string;
    href: string;
    description?: string;
    icon?: (props: ComponentProps<"svg">) => JSX.Element;
  }>;
}> = ({ categoryName, subCategories }) => {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Motion>
            <Popover.Button
              className={Util.classNames(
                open
                  ? "text-lightmodetext dark:text-darkmodetext px-4 py-2 rounded-md"
                  : "px-4 py-2 rounded-md text-gray-400",
                "group inline-flex items-center text-base font-medium hover:text-hovertext hover:bg-hoverbackground"
              )}>
              <span> {categoryName} </span>
              <ChevronDownIcon
                className={Util.classNames(
                  open
                    ? "text-lightmodetext dark:text-darkmodetext"
                    : "text-gray-400",
                  "ml-2 h-5 w-5 group-hover:text-gray-500"
                )}
                aria-hidden="true"
              />
            </Popover.Button>
          </Motion>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1">
            <Popover.Panel className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-md sm:px-0">
              <div className="rounded-lg shadow-lg ring-1 ring-lightmodetext dark:ring-darkmodetext ring-opacity-5 overflow-hidden">
                <div className="relative grid gap-6 bg-lightmodeprimary dark:bg-darkmodeprimary px-5 py-6 sm:gap-8 sm:p-8">
                  {subCategories.map(item => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className=" -m-3 p-3 flex items-start rounded-lg hover:ring-2 hover:ring-primary">
                      {item.icon ? (
                        <item.icon
                          className="flex-shrink-0 h-6 w-6 text-primary"
                          aria-hidden="true"
                        />
                      ) : undefined}
                      <div className="ml-4">
                        <p className="text-base font-medium text-lightmodetext dark:text-darkmodetext">
                          {item.name}
                        </p>
                        {item.description ? (
                          <p className="mt-1 text-lg text-lightmodetext dark:text-darkmodetext font-coc-description">
                            {item.description}
                          </p>
                        ) : undefined}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};
export default NavbarPopover;
