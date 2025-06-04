import React from "react";
import "./new.scss";

const New = ({ inputs, title }) => {
  return (
    <div className="new">
      <div className="newContainer">
        <h1 className="title">{title}</h1>
        <form className="form">
          {inputs.map((input) => (
            <div className="formInput" key={input.id}>
              <label>{input.label}</label>
              <input type={input.type} placeholder={input.placeholder} />
            </div>
          ))}
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default New;
