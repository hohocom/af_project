const { useState } = require("react");

function useLoading() {
  const [loading, setLoading] = useState(false);

  return {
    loading,
    setLoading,
  };
}

export default useLoading;
