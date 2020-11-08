import React from "react";

const ListGroup = (props) => {
  const { items, textProperty, valueProperty, selectedItem, onItemSelect } = props;
  return (
    <div class="list-group">
      {items.map((item) => {
        const { [textProperty]: text, [valueProperty]: value } = item;
        return (
          <button
            key={value}
            onClick={() => onItemSelect(item)}
            className={`text-nowrap list-group-item list-group-item-action ${
              selectedItem[valueProperty] === value ? "active" : ""
            }`}>
            {text}
          </button>
        );
      })}
    </div>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
