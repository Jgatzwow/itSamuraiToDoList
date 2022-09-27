import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { Button, TextField } from "@mui/material";

type PropsType = {
  callback: (newTitle: string) => void;
};

export const AddItemForm = (props: PropsType) => {
  let [title, setTitle] = useState("");
  let [error, setError] = useState<boolean>(false);

  const addItem = () => {
    if (title.trim() !== "") {
      props.callback(title);
      setTitle("");
      setError(false);
    }
    setError(true);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(false);
    if (e.charCode === 13) {
      addItem();
    }
  };
  const addFormBtnStyle = {
    backgroundColor: "blue",
    maxWidth: "39px",
    maxHeight: "39px",
    minWidth: "39px",
    minHeight: "39px",
  };
  return (
    <div>
      <TextField
        error={error}
        id="outlined-basic"
        label={error ? "enter your task name" : "type in..."}
        variant="outlined"
        value={title}
        size="small"
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        className={error ? "error" : ""}
      />
      {/*<input
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        className={error ? "error" : ""}
      />*/}
      <Button style={addFormBtnStyle} variant="contained" onClick={addItem}>
        +
      </Button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};
