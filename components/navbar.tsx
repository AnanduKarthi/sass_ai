import { UserButton } from "@clerk/nextjs";

import MobileSidebar from "./moblie-sidebar";
export default function Navbar() {
  return (
    <div className="flex items-center p-4">
      <MobileSidebar />
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}
