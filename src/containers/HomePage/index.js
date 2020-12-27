import React from "react";
import Layout from "../../components/Layout/index";
import Mint from "../../images/mint.jpg";
import Button from "../../components/Layout/UI/Button/index";
import "./style.scss";
import {
  AiOutlinePlusCircle,
  AiOutlineFileGif,
  AiOutlinePicture,
  AiOutlineHeart,
  AiOutlinePhone,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { BsCameraVideo } from "react-icons/bs";
import { MdTagFaces } from "react-icons/md";
export default function Home() {
  return (
    <Layout>
      <div className="homePage">
        <div className="friendList">
          <div className="friend">
            <div className="avatar">
              <img src={Mint} alt="avatar" />
            </div>
            <div className="friendState">
              <p className="friendName">Mint Tran</p>
              <div className="friendLastText">
                <p className="lastText">See you again </p>
                <span></span>
                <p>4 hours ago</p>
              </div>
            </div>
            <div className="friendButton">
              <button>
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
              </button>
            </div>
          </div>
        </div>
        <div className="chatBox">
          <div className="headBox">
            <div className="headUser">
              <img alt="avatar" src={Mint} />
              <p>Mint</p>
            </div>
            <div className="headCall">
              <AiOutlinePhone className='icon' />
              <BsCameraVideo className='icon' />

              <AiOutlineInfoCircle className='icon'/>
            </div>
          </div>
          <div className="chatArea"></div>
          <div className="typeArea">
            <div className="action">
              <AiOutlinePlusCircle className="icon" />
              <AiOutlinePicture className="icon" />
              <MdTagFaces className="icon" />
              <AiOutlineFileGif className="icon" />
            </div>
            <div className="input">
              <input type="text" placeholder="Aa" />
              <MdTagFaces className="icon" />
            </div>
            <div className="likeButton">
              <AiOutlineHeart className="icon" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
