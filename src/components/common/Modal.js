import { useModal } from "core/hooks";

function Modal() {
  const { close, isOpen, view } = useModal();
  return (
    isOpen && (
      <div
        className="absolute top-0 left-0 flex items-center justify-center w-full h-full overflow-hidden bg-black/70"
        // onClick={close}
      >
        <div
          className="relative p-4 bg-white rounded-md min-w-[500px] max-w-[500px]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute right-4 top-4">
            <button
              className="bg-transparent border border-transparent"
              onClick={close}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="w-6 h-6 text-gray-700"
                viewBox="0 0 1792 1792"
              >
                <path d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"></path>
              </svg>
            </button>
          </div>
          <div className="mt-6">{view}</div>
        </div>
      </div>
    )
  );
}

export default Modal;
