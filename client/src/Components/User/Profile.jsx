import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import WalletOutlinedIcon from "@mui/icons-material/WalletOutlined";
import LensOutlinedIcon from "@mui/icons-material/LensOutlined";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import PixIcon from "@mui/icons-material/Pix";
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';


export default function Profile() {
    return (
      <div className="w-full h-full bg-lightMode-sbg flex flex-col dark:bg-darkMode-sbg rounded-xl max-[1000px]:rounded-none">
        <div className="p-2 pb-0 w-full mb-6">
          <div className="w-full border-t-[1px] border-lightMode-fbg h-[88px] rounded-xl tbg-gradient flex flex-row items-center  p-4 ">
            <div className="flex flex-row gap-x-4 items-center w-full justify-between">
              <div className="flex flex-row gap-x-4 items-center flex-1">
                <img
                  className="size-14 rounded-full"
                  src="../public/oilrig.jpg"
                  alt=""
                />
                <div className="flex flex-col flex-1 overflow-hidden">
                  <div className="text-lightMode-header text-base font-[400] width-full overflow-hidden text-ellipsis whitespace-nowrap">
                    Harinder Sran
                  </div>
                  <div className="text-lightMode-p dark:text-darkMode-p text-sm width-full overflow-hidden text-ellipsis whitespace-nowrap">
                    hss0220022gmail.com
                  </div>
                </div>
              </div>
              <div className=" cursor-pointer">
                <SettingsOutlinedIcon sx={{ color: "white", fontSize: "28px" }} />
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 flex-col mb-2">
          <div className="text-lightMode-p dark:text-darkMode-p text-sm mb-1">
            level 1
          </div>
          <div className="flex flex-row h-4 rounded-full bg-lightMode-tbg cborder border-[1px]">
            {" "}
            <div
              className="bg-lightMode-button rounded-full"
              style={{ width: "20%" }}
            ></div>
            <div className="flex-1"></div>
          </div>
          <div className="text-lightMode-p dark:text-darkMode-p text-sm mt-1 flex flex-row justify-between items center">
            <div>15</div>
            <div>15 / 75</div>
          </div>
        </div>
        <div className="px-2 w-full ">
          <div className=" flex flex-row items-center gap-x-4 p-4 rounded-xl cursor-pointer hover:bg-lightMode-tbg dark:hover:bg-darkMode-tbg">
            <FavoriteBorderOutlinedIcon sx={{ color: "#ffffff", fontSize: 25 }} />
            <div className="text-lightMode-header dark:text-darkMode-header text-sm">
              Favourite
            </div>
          </div>
        </div>
        <div className="px-2 w-full ">
          <div className=" flex flex-row items-center gap-x-4 p-4 rounded-xl cursor-pointer hover:bg-lightMode-tbg dark:hover:bg-darkMode-tbg">
            <WalletOutlinedIcon sx={{ color: "#ffffff", fontSize: 25 }} />
            <div className="text-lightMode-header dark:text-darkMode-header text-sm">
              Rewards
            </div>
          </div>
        </div>
        <div className="px-2 w-full ">
          <div className=" flex flex-row items-center gap-x-4 p-4 rounded-xl cursor-pointer hover:bg-lightMode-tbg dark:hover:bg-darkMode-tbg">
            <SentimentSatisfiedOutlinedIcon
              sx={{ color: "#ffffff", fontSize: 25 }}
            />
            <div className="text-lightMode-header dark:text-darkMode-header text-sm">
              Favourite
            </div>
          </div>
        </div>
        <div className="px-2 w-full ">
          <div className=" flex flex-row items-center gap-x-4 p-4 rounded-xl cursor-pointer hover:bg-lightMode-tbg dark:hover:bg-darkMode-tbg">
            <LensOutlinedIcon sx={{ color: "#ffffff", fontSize: 25 }} />
            <div className="text-lightMode-header dark:text-darkMode-header text-sm">
              Frame
            </div>
          </div>
        </div>
        <div className="px-2 w-full mb-4">
          <div className=" flex flex-row items-center gap-x-4 p-4 py-[8.5px] rounded-xl cursor-pointer hover:bg-lightMode-tbg dark:hover:bg-darkMode-tbg">
            <CardGiftcardOutlinedIcon sx={{ color: "#ffffff", fontSize: 25 }} />
            <div className=" flex flex-col">
              <div className="text-lightMode-header dark:text-darkMode-header text-sm">
                Invite friends
              </div>
              <div className=" flex flex-row items-center gap-x-1">
                <div className="text-lightMode-p dark:text-darkMode-p text-sm ">
                  You earn 100
                </div>{" "}
                <PixIcon sx={{ color: "white", fontSize: 14 }} />
              </div>
            </div>
          </div>
        </div>
        <div className=" border-b-[1px] border-lightMode-border dark:border-darkMode-border "></div>
        <div className="px-2 w-full mt-2">
          <div className=" flex flex-row items-center gap-x-4 p-4 rounded-xl cursor-pointer hover:bg-lightMode-tbg dark:hover:bg-darkMode-tbg">
            <ContactSupportOutlinedIcon sx={{ color: "#ffffff", fontSize: 25 }} />
            <div className="text-lightMode-header dark:text-darkMode-header text-sm">
              Contact us
            </div>
          </div>
        </div>
        <div className="px-2 w-full ">
          <div className=" flex flex-row items-center gap-x-4 p-4 rounded-xl cursor-pointer hover:bg-lightMode-tbg dark:hover:bg-darkMode-tbg">
            <PowerSettingsNewOutlinedIcon sx={{ color: "#ffffff", fontSize: 25 }} />
            <div className="text-lightMode-header dark:text-darkMode-header text-sm">
              Sign out
            </div>
          </div>
        </div>
      </div>
    );
  }
  