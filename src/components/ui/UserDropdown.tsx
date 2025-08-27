"use client";

import { signOutAction } from "@/actions/auth.action";
import { useAuth } from "@/hooks/useAuth";
import { Menu, Transition } from "@headlessui/react";
import { LogOut, User as UserIcon } from "lucide-react";
import { Fragment } from "react";

const UserDropdown = () => {
  const { user } = useAuth(); // assuming useAuth provides user + logout()

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex items-center gap-2 rounded-full bg-gray-800 p-2 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none">
          <UserIcon className="h-4 w-4 text-white" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="ring-opacity-5 absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-700 rounded-md bg-gray-900 shadow-lg ring-1 ring-black focus:outline-none">
          <div className="px-4 py-3">
            <p className="text-sm font-medium text-white">
              {user?.user_metadata?.display_name || "User name"}
            </p>
            <p className="truncate text-sm text-gray-400">{user?.email || "No email"}</p>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={async () => await signOutAction()}
                  className={`${
                    active ? "bg-gray-800 text-red-400" : "text-red-500"
                  } flex w-full items-center gap-2 px-4 py-2 text-sm`}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserDropdown;
