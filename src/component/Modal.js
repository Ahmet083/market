import { useState } from "react";
import React from "react";
import AddBook from "../pages/AddBook";


const Modal = (props) => {
    const { setShowModel, yapilmasiGerekenIs, title, aciklama } = props;
    return (
        <div style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.3)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"

        }}>
            <div style={{
                width: "60%",
                padding: "30px",
                backgroundColor: "#fff",
                borderRadius: "150px"



            }}>
                <h2 className="text-center">{title}</h2>
                <p className="text-center">{aciklama}</p>
                <div className="d-flex justify-content-center -1">
                    <button onClick={() => setShowModel(false)}
                        className="btn btn-outline-danger mx-3 rounded-circle"
                        >
                        Kapat
                        </button>
                    <button 
                    onClick={yapilmasiGerekenIs}
                        className="btn btn-outline-primary rounded-circle"
                        >
                        Onayla
                        </button>
                </div>
            </div>

        </div>
    )
}

export default Modal