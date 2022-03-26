import { auth } from "utils/firebase";
import "assets/styles/table.css";
import { useRecoilValue } from "recoil";
import { loadingState } from "core/state";
import AdminLayoutView from "./AdminLayoutView";

export default function AdminLayout({ children, title = "제목" }) {
  const loading = useRecoilValue(loadingState);

  const props = {
    children,
    title,
    loading,
    signOut: () => auth.signOut(),
  };

  return <AdminLayoutView {...props} />;
}
