export const getCookie = (name: string) => {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];
};

export const setCookie = (name: string, value: string, expirationDate: Date) => {
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expirationDate.toUTCString()}; path=/`;
};
