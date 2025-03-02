const ENDPOINT = import.meta.env.VITE_API_ENDPOINT as string;

export const login = async (email: string, password: string) => {
  const response = await fetch(`${ENDPOINT}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include" // credentials trueにする
  });

  if (!response.ok) {
    throw new Error("ログインに失敗しました");
  }
  // jwtトークンの保存、cookieで
  const token = response.headers.get("Authorization")
  if(token){
    sessionStorage.setItem("token",token)
  }

  const userInfo = await response.json();
  return userInfo;
};
