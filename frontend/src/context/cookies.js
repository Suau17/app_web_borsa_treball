export function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      let date = new Date();
      days = parseInt(days)
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  }
export function getCookie(name) {
    let cookieName = name + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookies = decodedCookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let currentCookie = cookies[i].trim();
      if (currentCookie.indexOf(cookieName) === 0) {
        return currentCookie.substring(cookieName.length, currentCookie.length);
      }
    }
    return "";
  }
  
export function removeCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
  