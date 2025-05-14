import React from "react";

const CreateRoomPopup = ({
  setCreateRoomPopup,
}: {
  setCreateRoomPopup: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="w-full h-screen bg-black/50 z-50 fixed">
      CreateRoomPopup
    </div>
  );
};

export default CreateRoomPopup;
