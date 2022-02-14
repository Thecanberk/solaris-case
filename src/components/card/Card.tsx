import React from "react";
import "./card.css";

type ICard ={
  header:string,
  children?: React.ReactNode
}

const Card = ({header = "", children}: ICard) => {
    return (
        <div className="card">
        <span className="card-header">{header}</span>
        <div className="card-wrapper">
          <span className="card-container">
            <>
            {children}
            </>
          </span>
        </div>
      </div>
    )
}

export default Card;