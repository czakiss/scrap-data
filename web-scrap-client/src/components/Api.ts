const API_HOST = "http://localhost:8000";

const API_DATA = `${API_HOST}/data`;
const headers = {
  "Content-Type": "application/json",
  "x-access-token": "token-value",
};

export const removeData = async (id: number) => {
  const res = await fetch(`${API_DATA}`, {
    method: "delete",
    headers,
    body: JSON.stringify({ id }),
  });
  if (!res.ok) {
    const message = `An error has occured: ${res.status} - ${res.statusText}`;
    console.error(message);
    return false;
  }
  return true;
};
export const getAllData = async () => {
  const res = await fetch(`${API_DATA}/all`);
  if (!res.ok) {
    const message = `An error has occured: ${res.status} - ${res.statusText}`;
    throw new Error(message);
  }

  return res.json();
};

export const initData = async (body: object) => {
  const res = await fetch(`${API_DATA}`, {
    method: "put",
    headers,
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const message = `An error has occured: ${res.status} - ${res.statusText}`;
    throw new Error(message);
  }
  return res.json();
};
