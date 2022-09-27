import React, { useState } from "react";

type PropsType = {
  title: string;
  callback: (newTitle: string) => void;
};
export const EditableSpan = (props: PropsType) => {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(props.title);

  const onNewTitleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value);
  };

  const changeItem = (newTitle: string) => {
    props.callback(newTitle);
  };

  const changeEditMode = () => {
    setEditMode((prevState) => !prevState);
    changeItem(newTitle);
  };

  return editMode ? (
    <input
      onChange={onNewTitleChangeHandler}
      onBlur={changeEditMode}
      autoFocus
      value={newTitle}
    />
  ) : (
    <span onDoubleClick={changeEditMode}>{props.title}</span>
  );
};
