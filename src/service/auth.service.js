import { API_ENDPOINT } from "./base.service"

export const login_service = (body) => {
    const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      };
  return  fetch(`${API_ENDPOINT}/users/auth `, requestOptions)
        .then(response => response.json())
}