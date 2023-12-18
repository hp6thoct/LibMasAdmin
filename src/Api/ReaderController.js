import axios from "axios";

export function getReaderList(){
    return axios.get(`http://localhost:8080/api/reader`)
}

export function getReaderBorrow(user) {
    return axios.post(`http://localhost:8080/api/borrow/reader-borrow`,user);
  }