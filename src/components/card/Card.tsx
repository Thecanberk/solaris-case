import React from "react";
import "./card.css";

const Card = ({header = "", footer = "", children}:React.PropsWithChildren<{header?: string, footer?: string}>) => {
    return (
        <div className="card">
        <span className="card-header">{header}</span>
        <div className="card-wrapper">
          <span className="card-container">
              {children}
          </span>
        </div>
        {/* <span className="featuredSub">{footer}</span> */}
      </div>
    )
}

export default Card;