import { useState } from "react";

function SidebarHandler({ sidebar = 0, children }) {
  return sidebar > 0 && children;
}

export default SidebarHandler;

export function useSidebar() {
  const [sidebar, setSidebar] = useState(0);

  return { sidebar, setSidebar };
}
