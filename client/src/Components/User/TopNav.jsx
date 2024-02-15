import WhatshotIcon from "@mui/icons-material/Whatshot";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
export default function TopNav({
  setIsProfilePopUpHandler,
  isList,
  setIsList,
}) {
  const navigate = useNavigate();
  const isFavouritePage = useLocation().pathname === "/favourite";
  return (
    <div className=" w-full rounded-lg sbg flex flex-row items-center p-4 gap-x-4 max-[520px]:rounded-none max-[520px]:p-2">
      {isFavouritePage ? (
        <>
          <div className=" flex flex-row items-center tp rounded-lg border-[1px] cborder h-10 px-2 tbg gap-x-1 cursor-pointer max-[520px]:hidden  hover:text-lightMode-header dark:hover:text-darkMode-header ">
            <HomeIcon />
            <div className=" max-[740px]:hidden">Home</div>
          </div>
          <div
          className="flex items-center gap-x-1 caret-transparent cursor-pointer min-[520px]:hidden"
          onClick={() => navigate("/home")}
        >
          <WhatshotIcon sx={{ color: "rgb(14,164,233)", fontSize: "28px" }} />
          {/* <Icon size={28} /> */}
          <div className="flex flex-row items-center  text-lightMode-button ">
            <div className="text-white">Fuel</div>
            Go
          </div>
        </div>
        </>
      ) : (
        <div
          className="flex items-center gap-x-1 caret-transparent cursor-pointer"
          onClick={() => navigate("/home")}
        >
          <WhatshotIcon sx={{ color: "rgb(14,164,233)", fontSize: "28px" }} />
          {/* <Icon size={28} /> */}
          <div className="flex flex-row items-center  text-lightMode-button ">
            <div className="text-white">Fuel</div>
            Go
          </div>
        </div>
      )}
      {/* <div className=" absolute top-0 left-0 w-screen h-full z-10 bg-[rgba(0,0,0,0.5)]">
        <div className=" flex flex-col">
        <div className=" w-full flex flex-row pt-7 max-[1000px]:pt-[30px]">
          <div className=" w-[449px] max-[1000px]:w-[125px]"></div>
          <div className=" flex-1 w-full relative max-[520px]:hidden">
            <input
              // style={errorEmailBorder ? { borderColor: "rgb(211 47 47 )" } : {}}
              // label="Email"
              // type="email"
              // value={email}
              autoFocus
              placeholder="Search"
              // onChange={(e) => setEmail(e.target.value)}
              className=" pl-10 customInput"
            />

            <div className=" absolute top-[7.5px] left-2">
              <SearchOutlinedIcon sx={{ color: "#747c88" }} />
            </div>
          </div>
          <div className=" w-[246px] max-[1000px]:w-[306px] max-[740px]:w-[186px]"></div>
        </div>
        </div>
      </div> */}
      <div className=" flex-1 w-full relative max-[520px]:hidden">
        <div className=" h-10 w-full rounded-lg border-[1px] cborder flex flex-row items-center cursor-text tbg">
          <div className="pl-10 tp">Search</div>
        </div>
        <div className=" absolute top-[7.5px] left-2">
          <SearchOutlinedIcon sx={{ color: "#747c88" }} />
        </div>
      </div>
      <div className="flex-1 min-[521px]:hidden"></div>
      <div className=" h-10 rounded-lg tbg cborder border-[1px] flex flex-row items-center caret-transparent ">
        <div
          onClick={() => setIsList(true)}
          className={`flex flex-row items-center ${
            isList
              ? "text-lightMode-button dark:text-darkMode-button"
              : "text-lightMode-p dark:text-darkMode-p  hover:text-lightMode-header dark:hover:text-darkMode-header "
          }    w-[100px] justify-center gap-x-1 ${"cursor-pointer"}  max-[740px]:w-10`}
        >
          <FormatListBulletedOutlinedIcon />
          <div className="max-[740px]:hidden">List</div>
        </div>
        <div className="h-full cborder border-l-[1px]"></div>

        <div
          onClick={() => setIsList(false)}
          className={`flex flex-row items-center ${
            !isList
              ? "text-lightMode-button dark:text-darkMode-button"
              : "text-lightMode-p dark:text-darkMode-p  hover:text-lightMode-header dark:hover:text-darkMode-header "
          } w-[100px] justify-center gap-x-1 ${"cursor-pointer"} max-[740px]:w-10`}
        >
          <MapOutlinedIcon />
          <div className="max-[740px]:hidden">Map</div>
        </div>
      </div>
      <div
        style={{
          backgroundImage: 'url("/frame/level5.jpg")',
          backgroundSize: "cover", // Adjust as needed

          backgroundPosition: "center", // Adjust as needed
          // Additional background properties can be added here
        }}
        className=" flex justify-center items-center size-[40px] rounded-full border-0 min-[1001px]:hidden max-[520px]:hidden"
      >
        <img
          onClick={() => setIsProfilePopUpHandler()}
          className="size-9 rounded-full  cursor-pointer object-cover relative"
          src="/oilrig.jpg"
          alt=""
        />
      </div>
    </div>
  );
}

function IndividualStationsList() {
  const rating = 3.1;
  const filledStars = Math.floor(rating);
  const totalStars = 5;
  const size = 16;
  const stars = [];
  const isFavourite = false;
  // Filled stars
  for (let i = 0; i < filledStars; i++) {
    stars.push(<StarIcon key={i} sx={{ color: "gold", fontSize: size }} />);
  }

  // Half star
  if (!Number.isInteger(rating)) {
    const halfStar = rating - filledStars;
    if (halfStar < 0.3) {
      stars.push(<StarIcon sx={{ fontSize: size }} />);
    } else if (halfStar > 0.7) {
      stars.push(<StarIcon sx={{ color: "gold", fontSize: size }} />);
    } else {
      stars.push(
        <StarHalfIcon
          key={filledStars}
          sx={{ color: "gold", fontSize: size }}
        />
      );
    }
  }

  // Empty stars
  for (let i = stars.length; i < totalStars; i++) {
    stars.push(<StarIcon key={i} sx={{ fontSize: size }} />);
  }
  return (
    <div className=" caret-transparent w-full rounded-lg border-[1px] cborder flex justify-between p-4  max-[720px]:w-fit  ">
      <div className=" flex flex-row gap-x-12 max-[720px]:flex-col ">
        <div className=" relative">
          <img
            className=" w-[320px] max-[720px]:w-[260px] max-[630px]:w-[320px]  aspect-video rounded-lg object-cover"
            src="/oilrig.jpg"
            alt=""
          />
          <div className=" absolute top-0 right-0  p-2 rounded-full cursor-pointer th min-[720px]:hidden">
            {isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </div>
        </div>
        <div className=" flex flex-col justify-center max-[720px]:pt-2 ">
          <div className=" flex flex-col gap-y-5 max-[720px]:gap-y-2">
            <div className="flex flex-row w-full items-center justify-between">
              <div className="w-[225px] max-[325px]:w-[200px] max-[300px]:w-[175px]  text-2xl font-[400] th max-[720px]:text-xl text-ellipsis whitespace-nowrap overflow-hidden">
                Chevron gas stations
              </div>
              <div className="p-[6px] rounded-full th fbg text-xs min-[720px]:hidden">
                {rating}
              </div>
            </div>
            <div className=" flex flex-row tp items-center gap-x-2 text-sm max-[720px]:hidden">
              <div>{rating}</div>
              <div className="  relative ">
                <div className=" flex flex-row gap-x-[2px]">{stars}</div>
              </div>
              <div>(246)</div>
            </div>
            <div className="tp flex w-full  flex-row gap-x-[2px] text-sm overflow-hidden">
              <div className="">22 km - </div>
              <div className=" text-ellipsis whitespace-nowrap overflow-hidden w-[175px] max-[285px]:w-[165px]">
                {" "}
                12343 st king highwaytdrjfyugiuhoijokojihgjyfhfxdz
              </div>
            </div>
            <div className=" flex flex-row justify-between">
              <div className="tp flex flex-row text-sm">
                <div className="">$1.23/</div> Regular
              </div>
              <div className=" min-[720px]:hidden tb text-sm hover:underline cursor-pointer">
                More info
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex flex-col justify-between th max-[720px]:hidden ml-4">
        <div className="  p-2 rounded-full sbg cursor-pointer">
          {isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </div>
        <div className=" tb p-2 rounded-full sbg cursor-pointer">
          <NavigateNextIcon />
        </div>
      </div>
    </div>
  );
}
