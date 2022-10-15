/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { Link, navigate } from "react-router-dom";
import Modal from "./Modal";



const ListBooks = (props) => {
  const [books, setBooks] = useState(null);
  const [categories, setCategories] = useState(null);
  const [didUpdate, setDidUpdate] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [silinecekKitap, setSilinecekKitap] = useState(null);
  const [silinecekKitapName, setSilinecekKitapName] = useState("")

  useEffect(() => {
    axios
      .get("http://localhost:3004/books")
      .then((resBook) => {
        console.log("resBook", resBook);
        setBooks(resBook.data);
        axios
          .get("http://localhost:3004/categories")
          .then((resCat) => {
            setTimeout(() => {
              setCategories(resCat.data);
            }, 1000);
          })
          .catch((err) => console.log("categories err", err));
      })
      .catch((err) => console.log("books err", err));
  }, [didUpdate]);

  const deleteBook =(id) => {
    console.log(`http://localhost:3004/books/${id}`);
    axios.delete(`http://localhost:3004/books/${id}`)
    .then((res) => {
      console.log("delete res", res)
      setDidUpdate(!didUpdate)
      setShowModel(false)
    })
    .catch((err) => console.log(err));
   
  }



  if (books === null || categories === null) {
    return <Loading />;
  }

  return (
    <div className="container my-5">
      <div className="my-4 mx-4 d-flex justify-content-end">
        <Link to="/add-book" className="btn btn-primary">
          Kitap Ekle
        </Link>
      </div>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Kitap Adi</th>
              <th scope="col">Yazar Adi</th>
              <th scope="col">Kategori</th>
              <th className="text-center" scope="col">
                ISBN{" "}
              </th>
              <th className="text-center" scope="col">
                Islem{" "}
              </th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => {
              const category = categories.find(
                (cat) => cat.id == book.categoryId
              );
              return (
                <tr key={book.id}>
                  <td>{book?.name}</td>
                  <td>{book?.author}</td>
                  <td>{category?.name}</td>
                  <td className="text-center">
                    {book.isbn === "" ? "-------" : book.isbn}
                  </td>
                  <td>
                    <div className="d-grid gap-2 d-md-block">
                      <button
                        className="btn btn- btn-sm btn-outline-danger mx-1"
                        type="button"
                       onClick={()=> { 
                        setShowModel(true);                       
                        setSilinecekKitap(book.id);
                        setSilinecekKitapName(book.name)
                      } }
                      >
                        Delete
                      </button>
                      <Link
                      // to="/edit-book"
                      to={`edit-book/${book.id}`}
                        className="btn btn-outline-primary btn-sm"
                        type="button"
                        
                      >
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
         {
          showModel === true && (
            <Modal
            aciklama="Silmek istediginizden emin misiniz?"
            title={silinecekKitapName}
           yapilmasiGerekenIs={() => deleteBook(silinecekKitap)} 
           setShowModel={setShowModel}
           /> 
  )}
       
        

      </div>
    </div>
  );
};

export default ListBooks;
