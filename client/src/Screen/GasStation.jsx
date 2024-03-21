import { useEffect, useState } from "react";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SideBar from "../Components/SideBar/SideBar";
import TopNav from "../Components/TopNav/TopNav";
import ModalContent from "../Components/StationDetail/ModalContent";
import StationInfo from "../Components/StationDetail/StationInfo";
import GasPrice from "../Components/StationDetail/GasPrice";
import Amenities from "../Components/StationDetail/Amenities";
import Contributor from "../Components/StationDetail/Contributor/Contributor";
import CommentSection from "../Components/StationDetail/CommentSection/CommentSection";
import Modal from "../Components/UI/Modal";
import { getGasStationById } from "../api/gasStation";
import { useAuth } from "../context/AuthContext";
import Loading from "../Components/UI/Loading";

export default function GasStation() {
  const [isProfilePopUp, setIsProfilePopUp] = useState(false);
  const [showModal, setShowModal] = useState();
  const [placeId, setPlaceId] = useState(null);
  const [station, setStation] = useState(null);
  const { user, token } = useAuth();
  useEffect(() => {
    const path = window.location.pathname;
    const parts = path.split("/");
    const lastPart = parts[parts.length - 1];
    setPlaceId(lastPart);
  }, []);

  const [gasInfo, setGasInfo] = useState([
    {
      type: "Regular",
      price: " - -",
      updatedBy: "- -",
      updatedAt: "Not updated",
    },
    {
      type: "Mid-grade",
      price: " - -",
      updatedBy: "- -",
      updatedAt: "Not updated",
    },
    {
      type: "Premium",
      price: " - -",
      updatedBy: "- -",
      updatedAt: "Not updated",
    },
    {
      type: "Diesel",
      price: " - -",
      updatedBy: "- -",
      updatedAt: "Not updated",
    },
  ]);
  
  useEffect(() => {
    if (token && placeId) {
      getStationData();
    }
  }, [token, placeId]);
  const getStationData = async () => {
    try {
      const placeInfo = await getGasStationById(placeId, token);

      setStation(placeInfo);
    } catch (error) {
      console.log(error);
    }
  };

  if (!station) {
    return      <Loading bgColor='bg-inherit' />;
  }

  // TODO: get gasInfo from real database
  // add useEffect for all the info
  return (
    <>
      {showModal && (
        <Modal>
          <ModalContent setShowModal={setShowModal} gasInfo={gasInfo} />
        </Modal>
      )}
      <TopNav setIsProfilePopUp={setIsProfilePopUp}>
        <div
          onClick={() => {
            setShowModal(true);
          }}
          name="price"
          className=" flex flex-row items-center tp w-[100px] justify-center gap-x-1 cursor-pointer hover:text-white"
        >
          <EditOutlinedIcon />
          <div>Price</div>
        </div>
      </TopNav>
      <div className=" flex-1 flex-col overflow-auto mt-3">
        <StationInfo placeId={placeId} station={station} />
        <GasPrice gasInfo={gasInfo} setShowModal={setShowModal} />
        <Amenities station={station} />
        <Contributor   station={station}/>

        <CommentSection station={station}/>
      </div>

      {isProfilePopUp && (
        <SideBar isProfilePopUp setIsProfilePopUp={setIsProfilePopUp} />
      )}
    </>
  );
}
