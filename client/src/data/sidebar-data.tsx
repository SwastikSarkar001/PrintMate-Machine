import HelpSection from "@/components/print/sections/Help";
import MyFilesSection from "@/components/print/sections/MyFiles";
import RecentsSection from "@/components/print/sections/Recents";
import SearchSection from "@/components/print/sections/Search";
import SettingsSection from "@/components/print/sections/Settings";

import {
  ClockIcon,
  FolderIcon,
  SettingsIcon,
  HelpCircleIcon,
  SearchIcon,
  LucideIcon,
} from "lucide-react";

export type NavData = {
  navMain: {
    title: string;
    url: string;
    icon: LucideIcon;
    component: React.ComponentType;
    isDefault?: true;
  }[];
  navSecondary: {
    title: string;
    url: string;
    icon: LucideIcon;
    component: React.ComponentType;
    isDefault?: true;
  }[];
}

const data: NavData = {
  navMain: [
    {
      title: "Recent Documents",
      url: "#recents",
      component: RecentsSection,
      icon: ClockIcon,
    },
    {
      title: "My Files",
      url: "#files",
      component: MyFilesSection,
      icon: FolderIcon,
    }
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#settings",
      component: SettingsSection,
      icon: SettingsIcon,
    },
    {
      title: "Get Help",
      url: "#help",
      component: HelpSection,
      icon: HelpCircleIcon,
    },
    {
      title: "Search",
      url: "#search",
      component: SearchSection,
      icon: SearchIcon,
    },
  ]
}

export default data;