import React, { useEffect } from "react";

export default function BgBlackOpacity({ children}) {
  const toggleBodyScroll = (enableScroll) => {
    const body = document.body;
    const html = document.documentElement;

    if (enableScroll) {
      body.style.overflow = "visible";
      html.style.overflow = "visible";
    } else {
      body.style.overflow = "hidden";
      html.style.overflow = "hidden";
    }
  };

  useEffect(() => {
    toggleBodyScroll(false);

    return () => {
      toggleBodyScroll(true);
    };
  }, []);

  return (
    <div   className=" absolute top-0 right-0 w-screen h-screen bg-[rgb(1,1,1,0.5)]">
    {children}
    </div>
  );
}
