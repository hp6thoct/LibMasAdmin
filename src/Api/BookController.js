import axios from "axios";

export function getBookList(){
    return axios.get('http://localhost:8080/api/book') 
}

export function getAuthorList(){
    return axios.get('http://localhost:8080/api/author') 
}

export function getPublisherList(){
    return axios.get('http://localhost:8080/api/publishers') 
}

export function getCategoryList(){
    return axios.get('http://localhost:8080/api/category') 
}

export function addBook(data){
    return axios.post('http://localhost:8080/api/book/add',data)
}

export function updateBook(bookid, data){
    return axios.put(`http://localhost:8080/api/book/add/${bookid}`,data)
}