import React from "react";
import Select from "react-select";
import "../App.css";
const Dialog = (props) => {
  let show = props.show;
  if (!show) {
    return null;
  }
  const onClose = (e) => {
    props.onClose(e);
  };
  const handleSelect = (e) => {
    props.handleSelect(e);
  };

  return (
    <div className="overlay">
      <div className="dialog">
        <Select
          options={props.options}
          formatOptionLabel={(champ) => (
            <div className="champ-option">
              <img src={champ.image} alt="champ-image" height={20} />
              <span>{champ.label}</span>
            </div>
          )}
          onChange={handleSelect}
        />
        <button className="margin btn btn-primary" onClick={onClose}>
          close
        </button>
      </div>
    </div>
  );
};

export default Dialog;
