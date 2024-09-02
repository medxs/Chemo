export const getAuthToken = () => {
    const token = localStorage.getItem("ChemoToken") || "";
    return token;
  };