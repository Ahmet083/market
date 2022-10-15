import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../component/header"
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../component/Loading";




const EditBook =(props) => {
    const params = useParams();
    console.log("params" , params)
    const navigate = useNavigate()

    const [bookname, setBookName] = useState("")
    const [author, setAuthor] = useState("")
    const [isbn, setIsbn] = useState("")
    const [category, setCategory] = useState("")
    const [categories, setCategories] = useState(null)

    useEffect (()=> {
        axios.get(`http://localhost:3004/books/${params.bookId}`)
        .then((res) => {
            console.log(res.data);
            setBookName(res.data.name);
            setAuthor(res.data.author);
            setIsbn(res.data.isbn);
            setCategory(res.data.categoryId);
           

            axios
            .get("http://localhost:3004/categories")
            .then((res) => {
                setCategories(res.data);
                
            })
            .catch((err)=> console.log('categories error', err));
        })
        .catch((err)=> console.log(err))
    },[])
const handleSubmit = (event) => {
    event.preventDefault();
    if (bookname === "" || author === "" || category === "") {
      alert("Yazar, Kitap veya Kategori Bos Birakilamaz");
    };

    const updateBook = {
      id: params.bookId,
      name: bookname,
      author: author,
      isbn: isbn,
      categoryId: category,

    };
    console.log("updatebook", updateBook)
    axios
    .put(`http://localhost:3004/books/${params.bookId}`,updateBook)
    .then((res) => {
      console.log(res)
      navigate("/")
    })
  };
 




if (categories === null ) {
    return <Loading />
}

    return (
        <div>
           <Header />
          
           <div className="container my-5">
      <form onSubmit={handleSubmit}>
        <div className="row my-4">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Kitap Adi"
              value={bookname}
              onChange={(event) => setBookName(event.target.value)}
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Yazar Adi"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
            />
          </div>
        </div>
        <div className="row my-4">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="ISBN"
              value={isbn}
              onChange={(event) => setIsbn(event.target.value)}
            />
          </div>
          <div className="col">
            <select
              className="form-control"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option selected>Kategori Secin</option>
              {categories.map((cat) => {
                return <option key={cat.id} value={cat.id}>{cat.name}</option>;
              })}
            </select>
          </div>
        </div>
        <div className="d-flex justify-content-center">
        <button onClick={(() => navigate("/"))} type="submit" className="btn btn-outline-danger w-25 mx-4">
           Vazgec
          </button>
          <button type="submit" className="btn btn-outline-primary w-25 mx-4">
           Kitabi Guncelle
          </button>
        </div>
      </form>
    </div>
        </div>
       


    )
}

export default EditBook