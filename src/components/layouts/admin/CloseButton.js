import closeImg from "assets/images/admin/close.svg";

function CloseButton({ changeStep, step = 0 }) {
  return (
    <button onClick={() => changeStep({ step: step })} className="mb-4">
      <img src={closeImg} alt="close_img" />
    </button>
  );
}

export default CloseButton;
