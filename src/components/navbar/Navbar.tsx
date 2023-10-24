"use client";

import { Switch } from "@headlessui/react";
import { HiOutlineInformationCircle, HiOutlineChartBar } from "react-icons/hi2";
import { GAME_TITLE } from "../../globals/constants/strings";
import clsx from "clsx";

interface NavbarProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
  setIsInfoModalOpen: (isOpen: boolean) => void;
  setIsStatsModalOpen: (isOpen: boolean) => void;
}

export const Navbar = ({
  enabled,
  onToggle,
  setIsInfoModalOpen,
  setIsStatsModalOpen,
}: NavbarProps) => {
  return (
    <div className="navbar w-8/12 mt-16 mx-8 bg-gray-100 dark:bg-slate-800 rounded-xl">
      <div className="navbar-content px-5 short:h-auto">
        <div className="flex">
          <HiOutlineInformationCircle
            className="h-6 w-6 cursor-pointer dark:stroke-white"
            onClick={() => setIsInfoModalOpen(true)}
          />
        </div>
        <p className="text-xl font-bold dark:text-white">{GAME_TITLE}</p>
        <div className="right-icons">
          <HiOutlineChartBar
            className="mr-3 h-6 w-6 cursor-pointer dark:stroke-white"
            onClick={() => setIsStatsModalOpen(true)}
          />
          <Switch
            className={clsx(
              enabled
                ? "bg-gradient-to-r from-green-400 to-green-900"
                : "bg-gradient-to-r from-gray-400 to-gray-900",
              "relative inline-flex h-6 w-11 items-center rounded-full"
            )}
            checked={enabled}
            onChange={onToggle}
          >
            <span className="sr-only">Dark Mode Toggle</span>
            <span
              className={clsx(
                enabled ? "translate-x-1" : "translate-x-6",
                "inline-block h-4 w-4 transform rounded-full bg-white transition"
              )}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
};
