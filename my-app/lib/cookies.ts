/**
 * Cookie utility functions for authentication
 */

/**
 * Set a cookie
 */
export function setCookie(name: string, value: string, days: number = 7): void {
  if (typeof window === 'undefined') return;
  
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

/**
 * Get a cookie value
 */
export function getCookie(name: string): string | null {
  if (typeof window === 'undefined') return null;
  
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  
  return null;
}

/**
 * Delete a cookie
 */
export function deleteCookie(name: string): void {
  if (typeof window === 'undefined') return;
  
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

/**
 * Set authentication cookies
 */
export function setAuthCookies(token: string, role: string, isLoggedIn: boolean = true): void {
  setCookie('authToken', token, 7); // 7 days
  setCookie('userRole', role, 7);
  setCookie('isLoggedIn', isLoggedIn ? 'true' : 'false', 7);
}

/**
 * Clear authentication cookies
 */
export function clearAuthCookies(): void {
  deleteCookie('authToken');
  deleteCookie('userRole');
  deleteCookie('isLoggedIn');
  deleteCookie('isAdminLoggedIn');
  deleteCookie('adminCompany');
  deleteCookie('adminName');
  deleteCookie('adminEmail');
}


