const apiFetch = async (url, options = {}, router) => {
  const token = localStorage.getItem("token");

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    router.push("/");
    return null;
  }

  return res;
};
export default apiFetch;
