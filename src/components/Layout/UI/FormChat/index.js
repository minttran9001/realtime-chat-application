import * as React from "react";
import Button from "../Button";
import "./style.scss";
export default function FormChat(props) {
  const onChangeValue = (e)=>{
    props.onChange(e.target.value)
  }
  return (
    <form onSubmit={(e)=>props.handleFunction(e)} style={props.style} className="commentInput">
      <div className="input">
        <input onChange={(e)=>onChangeValue(e)} value={props.value} id="postComment" placeholder="Add comment here" />
      </div>
      <div className="button">
        <Button onClick={(e)=>props.handleFunction(e)} type={props.type}>Post</Button>
      </div>
    </form>
  );
}
