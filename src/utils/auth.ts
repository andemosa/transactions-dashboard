export function getToken() {
  return window.localStorage.getItem("token");
}

export function setToken(token: string) {
  window.localStorage.setItem("token", token);
}

export function clearToken() {
  window.localStorage.removeItem("token");
}

export async function loginUser(
  email: string,
  password: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "test@abc.com" && password === "Pass1234") {
        const token = "fake-jwt-token";
        setToken(token);
        resolve(token);
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 1000);
  });
}
