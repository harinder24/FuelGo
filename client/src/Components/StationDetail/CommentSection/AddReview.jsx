import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
export default function AddReview() {
  const size = 36;
  const [comment, setComment] = useState("");
  const [photosVideos, setPhotosVideos] = useState("")
  const [review, setReview] = useState(0)
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className=" flex-1 rounded-lg border-[1px] cborder p-4 flex-col">
      <div className=" th text-xl flex flex-row items-center gap-x-2">
        <RateReviewOutlinedIcon sx={{ fontSize: 24 }} />{" "}
        {isEditing ? (
          <div>Edit your review review</div>
        ) : (
          <div>Write a review</div>
        )}
      </div>
      <div className=" mt-4 flex flex-row justify-center">
        {" "}
        <div className=" bg-transparent tp flex flex-row gap-x-1">
          <StarIcon sx={{ fontSize: size }} />
          <StarIcon sx={{ fontSize: size }} />
          <StarIcon sx={{ fontSize: size }} />
          <StarIcon sx={{ fontSize: size }} />
          <StarIcon sx={{ fontSize: size }} />
        </div>
      </div>
      <div className=" mt-4 w-full flex">
        <textarea
          value={comment}
          onChange={(e) => setComment(e)}
          placeholder="Share details of your experience"
          className="flex-1 rounded-lg border-[1px] cborder  text-sm tbg p-2 h-[120px] th resize-none caret-lightMode-p dark:caret-darkMode-p outline-0"
        ></textarea>
      </div>
      <div className="w-full flex flex-row justify-between mt-4 gap-x-2 overflow-auto">
        <div className="h-20 relative">
          <img className="h-20" src="/oilrig.jpg" alt="" />
          <div className=" absolute right-[2px] top-[2px] text-lightMode-error dark:text-darkMode-error hover:cursor-pointer">
            <RemoveCircleIcon/>

          </div>
        </div>
      </div>
      <div className="w-full flex flex-row justify-between mt-4 ">
        <div className="tp rounded-lg h-10 flex flex-row items-center px-2 tbg hover:text-lightMode-header dark:hover:text-darkMode-header border-[1px] cborder gap-x-2 cursor-pointer">
          <AddAPhotoOutlinedIcon />
          <div className=" flex max-[360px]:hidden max-[640px]:flex max-[710px]:hidden min-[1000px]:hidden  min-[1040px]:flex">
            Add photos & videos
          </div>
        </div>
        <div className=" rounded-lg h-10 flex flex-row items-center px-4 bgbtn hover:bg-lightMode-buttonHover dark:hover:bg-darkMode-buttonHover th cursor-pointer">
          <div className="">{isEditing ? "Edit" : "Post"}</div>
        </div>
      </div>
    </div>
  );
}
