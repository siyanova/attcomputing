async function fetchWithAuth(url: string) {
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    console.error("Токен не найден");
    throw new Error("Токен не найден. Пожалуйста, авторизуйтесь.");
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    console.error("Ошибка ответа сервера:", response.statusText);
    throw new Error("Ошибка при получении данных");
  }

  return response.json();
}
export default fetchWithAuth;
