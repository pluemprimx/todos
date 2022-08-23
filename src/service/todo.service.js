import { API_ENDPOINT } from "./base.service"

export const get_all_todos_service = (token) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    };
    return fetch(`${API_ENDPOINT}/todos/ `, requestOptions)
        .then(response => response.json())
}

export const get_todo_service = (token, id) => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    };
    return fetch(`${API_ENDPOINT}/todos/${id} `, requestOptions)
        .then(response => response.json())
}

export const create_todo_service = (token, body) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        
        body: JSON.stringify(body)
    };
    return fetch(`${API_ENDPOINT}/todos/`, requestOptions)
        .then(response => response.json())
}

export const update_todo_service = (token, body, id) => {
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body)
    };
    return fetch(`${API_ENDPOINT}/todos/${id}`, requestOptions)
        .then(response => response.json())
}


export const delete_todo_service = (token, id) => {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    };
    return fetch(`${API_ENDPOINT}/todos/${id}`, requestOptions)
        .then(response => response.json())
}



