import React, { useState } from "react";
import Background from "../Components/Three/Background";
import TransparentCard from "../Components/TransparentCard";
import Button from "../Components/Button";
import { NavLanding } from "../Components/Nav";

export default function LandingPage() {
  const [zoom, setZoom] = useState(false);
  const [focus, setFocus] = useState({});
  const [anglex, setAnglex] = useState(0.0);
  const [angley, setAngley] = useState(0.0);

  const xyzPoints = [
    [3.422061460869188, 5.315856452720275, 10.150449432123484],
    [-5.114473986630136, 2.6231953010250595, 1.6614216138819227],
    [7.658402354938028, 2.943413345147272, 3.1554605601864076],
    [2.3065315124912007, 0.43763093313155715, 7.161719141961215],
  ];
  const [stage, setStage] = useState(0);
  const introductionData = [
    {
      btn: "Get started",
      info: "Empowering Your Drive, Saving Your Wallet!",
    },
    {
      btn: "Continue",
      info: "Save on gas and earn gift cards",
    },
    {
      btn: "Continue",
      info: "Offering amenities tailored to your journey",
    },
    {
      btn: "Sign up",
      info: "Sign up now and start saving money",
    },
  ];
  const handleButtonClick = () => {
    setAnglex(0);
    setAngley(0);
    const copyStage = stage + 1;
    setStage((prevStage) => prevStage + 1);
    //   setAnglex(-0.2)
    // setAngley(-0.2);
    if (copyStage === 1) {
      setAnglex(-1.7);
    } else if (copyStage === 3) {
      setAngley(-0.2);
    } else if (copyStage === 4) {
      // to do sign up
    }

    setZoom(true);
    setFocus({
      x: xyzPoints[copyStage][0],
      y: xyzPoints[copyStage][1],
      z: xyzPoints[copyStage][2],
    });
  };
  return (
    <div className="w-screen h-screen relative">
      <Background zoom={zoom} focus={focus} anglex={anglex} angley={angley} />
      <div className="absolute top-0 right-0 w-screen h-[54px]">
        <NavLanding />
      </div>
      <div className=" absolute bottom-20 right-20 w-[350px] h-[175px] max-[500px]:w-full max-[500px]:bottom-0 max-[500px]:right-0 rounded-b-none max-[500px]:h-[200px]">
        <TransparentCard>
          <div className="w-full h-full p-4 flex flex-col justify-between ">
            <h3 className="  text-lightMode-header dark:text-lightMode-header text-2xl text-center pb-4">
              {introductionData[stage].info}
            </h3>
            <Button
              data={introductionData[stage].btn}
              handleButtonClick={handleButtonClick}
            />
          </div>
        </TransparentCard>
      </div>
    </div>
  );
}
