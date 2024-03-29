import type { FC } from "react";
import Link from "@components/Elements/Link";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Util from "@util/index";
import Image from "@components/Elements/Image";
import Motion from "@components/Utilities/Motion";
import { useAuth } from "@util/hooks";

const userNavigation: Array<{
  name: string;
  href: string;
}> = [
  {
    name: "My Account",
    href: "/account"
  }
];

const NavbarComponent: FC<{ isMobile?: boolean }> = ({ isMobile }) => {
  const { user, logout } = useAuth();
  function logOut() {
    return () => {
      logout();
    };
  }
  if (user) {
    if (isMobile)
      return (
        <div className="pt-4 pb-3 border-t border-lightmodetext dark:border-darkmodetext">
          <div className="flex items-center px-5">
            <Image className="rounded-full h-10 w-10" src="/Images/user.png" />
            <div className="ml-3">
              <div className="text-base font-medium leading-none text-lightmodetext dark:text-darkmodetext">
                {user.displayName}
              </div>
              <div className="text-sm font-medium leading-none text-lightmodetext dark:text-darkmodetext font-coc-description">
                {user.email}
              </div>
            </div>
          </div>
          <div className="mt-3 px-2 space-y-1">
            {userNavigation.map(item => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-lightmodetext dark:text-darkmodetext hover:text-hovertext hover:bg-hoverbackground">
                {" "}
                {item.name}{" "}
              </Link>
            ))}
            <Link
              key="Logout"
              onClick={logOut()}
              className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:bg-hoverbackground">
              {" "}
              Sign Out{" "}
            </Link>
          </div>
        </div>
      );
    else
      return (
        <Menu as="div" className="relative hidden lg:block">
          <Motion>
            <Menu.Button className="resize-none max-w-xs rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <Image className="rounded-full w-8 h-8" src="/Images/user.png" />
            </Menu.Button>
          </Motion>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95">
            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-lightmodeprimary dark:bg-darkmodeprimary ring-1 ring-lightmodetext dark:ring-darkmodetext ring-opacity-5 focus:outline-none">
              {userNavigation.map(item => (
                <Menu.Item key={item.name}>
                  {({ active }) => (
                    <Link
                      disablehovermotion
                      href={item.href}
                      className={Util.classNames(
                        active ? "bg-hoverbackground text-hovertext" : "",
                        "block px-4 py-2 text-sm text-lightmodetext dark:text-darkmodetext"
                      )}>
                      {" "}
                      {item.name}{" "}
                    </Link>
                  )}
                </Menu.Item>
              ))}
              <Menu.Item key="Sign Out">
                {({ active }) => (
                  <Link
                    disablehovermotion
                    onClick={logOut()}
                    className={Util.classNames(
                      active ? "bg-hoverbackground" : "",
                      "block px-4 py-2 text-sm text-primary hover:text-indigo-500"
                    )}>
                    {" "}
                    Sign Out{" "}
                  </Link>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      );
  } else
    return (
      <div
        className={
          isMobile
            ? undefined
            : "hidden lg:flex items-center justify-end lg:flex-1 lg:w-0"
        }>
        {isMobile ? (
          <>
            <Link
              href="/auth"
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-indigo-700">
              {" "}
              Sign up{" "}
            </Link>
            <p className="mt-6 text-center text-base font-medium text-lightmodetext dark:text-darkmodetext">
              Got an account already?
              <Link href="/auth" className="text-primary hover:text-indigo-500">
                {" "}
                Sign in{" "}
              </Link>
            </p>
          </>
        ) : (
          <>
            <Link
              href="/auth"
              className="whitespace-nowrap text-base font-medium text-lightmodetext dark:text-darkmodetext">
              {" "}
              Sign in{" "}
            </Link>
            <Link
              href="/auth"
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-indigo-700">
              {" "}
              Sign up{" "}
            </Link>
          </>
        )}
      </div>
    );
};
export default NavbarComponent;
