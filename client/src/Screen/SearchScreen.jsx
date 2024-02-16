import React from "react";
import BottomNav from "../Components/User/BottomNav";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { IndividualStationsList } from "../Components/User/TopNav";
export default function SearchScreen() {
  return (
    <div className=" w-screen h-screen flex flex-col bg">
      <div className="h-[56px] w-full sbg px-2 flex flex-row items-center border-b-[1px] cborder">
        <div className=" w-full relative">
          <input
            placeholder="Search"
            className="customInput px-10"
            type="text"
          />
        </div>
        <div className=" absolute top-[-7] left-[20px]">
          <SearchOutlinedIcon sx={{ color: "#747c88" }} />
        </div>
      </div>

      <div className="flex-1 my-4  w-full min-w-auto flex h-full flex-col overflow-y-auto px-2 gap-4 items-center">
        <IndividualStationsList isTransparent={true} />
        <IndividualStationsList isTransparent={true} />
        <IndividualStationsList isTransparent={true} />
        <IndividualStationsList isTransparent={true} />
        <IndividualStationsList isTransparent={true} />
      </div>

      <BottomNav />
    </div>
  );
}
