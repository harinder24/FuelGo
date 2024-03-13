import { useState } from 'react';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SideBar from '../Components/SideBar/SideBar';
import TopNav from '../Components/TopNav/TopNav';
import ModalContent from '../Components/StationDetail/ModalContent';
import StationInfo from '../Components/StationDetail/StationInfo';
import GasPrice from '../Components/StationDetail/GasPrice';
import Amenities from '../Components/StationDetail/Amenities';
import Contributor from '../Components/StationDetail/Contributor/Contributor';
import CommentSection from '../Components/StationDetail/CommentSection/CommentSection';
import Modal from '../Components/UI/Modal';
import { useLocation } from 'react-router-dom';

export default function GasStation() {
  const { station } = useLocation().state;
  const [isProfilePopUp, setIsProfilePopUp] = useState(false);
  const [showModal, setShowModal] = useState();
  const [gasInfo, setGasInfo] = useState([
    {
      type: 'Regular',
      price: 1.62,
      updatedBy: 'Harinder',
      updatedAt: new Date().setDate(new Date().getDate() - 3),
    },
    {
      type: 'Mid-grade',
      price: 1.72,
      updatedBy: 'Jinsoo',
      updatedAt: new Date().setHours(new Date().getHours() - 5),
    },
    {
      type: 'Premium',
      price: 1.76,
      updatedBy: 'Prab',
      updatedAt: new Date().setMinutes(new Date().getMinutes() - 7),
    },
    {
      type: 'Diesel',
      price: 1.78,
      updatedBy: 'Laghav',
      updatedAt: Date.now(),
    },
  ]);

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
          name='price'
          className=' flex flex-row items-center tp w-[100px] justify-center gap-x-1 cursor-pointer hover:text-white'
        >
          <EditOutlinedIcon />
          <div>Price</div>
        </div>
      </TopNav>
      <div className=' flex-1 flex-col overflow-auto mt-3'>
        <StationInfo station={station} />
        <GasPrice gasInfo={gasInfo} setShowModal={setShowModal} />
        <Amenities />
        <Contributor />

        <CommentSection />
      </div>

      {isProfilePopUp && (
        <SideBar isProfilePopUp setIsProfilePopUp={setIsProfilePopUp} />
      )}
    </>
  );
}
