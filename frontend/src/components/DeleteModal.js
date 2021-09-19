import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

const DeleteModal = ({ isOpen, onRequestClose, deleteHandler, setOpen }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        content: {
          minHeight: "250px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        },
      }}
    >
      <div className="flex w-full h-full flex-col justify-evenly item-center bg-blue-500">
        <div className="text-center">
          <span className="text-white text-3xl">Are you sure ?</span>
        </div>
        <div className="flex w-full justify-evenly items-center">
          <button
            className="border py-1 px-4 border-solid border-white text-white rounded-xl"
            onClick={() => deleteHandler()}
          >
            Confirm
          </button>
          <button
            className="border py-1 px-4 border-solid border-white text-white rounded-xl"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default DeleteModal;
