import { modalState } from "core/state";
import { useRecoilState } from "recoil";

function useModal() {
  const [modal, setModal] = useRecoilState(modalState);

  const close = () => {
    setModal({ ...modal, isOpen: false, view: null });
  };

  const open = ({ setView }) => {
    setModal({ ...modal, isOpen: true, view: setView });
  };

  return {
    isOpen: modal.isOpen,
    view: modal.view,
    open,
    close,
  };
}

export default useModal;
