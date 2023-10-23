import {
  HiOutlineInformationCircle,
  HiOutlineCog6Tooth,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { GAME_TITLE } from "../../globals/constants/strings";

interface NavbarProps {
  setIsInfoModalOpen: (isOpen: boolean) => void;
  setIsStatsModalOpen: (isOpen: boolean) => void;
  setIsSettingsModalOpen: (isOpen: boolean) => void;
}

export const Navbar = ({
  setIsInfoModalOpen,
  setIsStatsModalOpen,
  setIsSettingsModalOpen,
}: NavbarProps) => {
  return (
    <div className="navbar">
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
          <HiOutlineCog6Tooth
            className="h-6 w-6 cursor-pointer dark:stroke-white"
            onClick={() => setIsSettingsModalOpen(true)}
          />
        </div>
      </div>
      <hr></hr>
    </div>
  );
};
