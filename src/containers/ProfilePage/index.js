import React from "react";
import Layout from "../../components/Layout";
import Button from "../../components/Layout/UI/Button/index";
import {
  AiOutlineSetting,
  AiOutlinePlusCircle,
  AiOutlineHeart,
} from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import "./style.scss";
import Mint from "../../images/mint.jpg";
import PostDetail from "../../components/PostDetail/index";
import ModalPost from "../../components/ModalPost/index";
import { useSelector, useDispatch } from "react-redux";
import { getPostByKey, getRealTimePosts } from "../../actions";
import Loading from "../../components/Layout/UI/Loading/index";
const ProfilePage = () => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);
  const auth = useSelector((state) => state.auth);
  React.useEffect(() => {
    dispatch(getRealTimePosts(auth.uid));
  }, []);
  const openPostDetail = (key) => {
    const postDetail = document.querySelector(".postDetail");
    postDetail.classList.add("open");
    dispatch(getPostByKey(key))
  };
  const openModalPost = (item) => {
    document.querySelector(".modalPost").classList.add("open");
   
  };
  return (
    <Layout>
      <ModalPost />
      <PostDetail />
      <div className="profile">
        <div className="profileHead">
          <div className="avatar">
            <img alt={Mint} src={Mint} />
            <AiOutlinePlusCircle className="icon" />
          </div>
          <div className="details">
            <div className="userName">
              <p>Mint</p>
              <Button>Edit Profile</Button>
              <AiOutlineSetting className="icon" />
            </div>
            <div className="userFollow">
              <p>
                282 <span>followers</span>
              </p>
              <p>
                1003 <span>following</span>
              </p>
            </div>
            <div className="madeUpName">
              <p>小さなホタル</p>
            </div>
          </div>
        </div>
        <div className="postButton">
          <Button onClick={openModalPost}>Post something</Button>
        </div>
        <div className="allPosts">
          {!post.loadingPost ? (
            post.posts.length > 0 ? (
              post.posts.map((item, index) => (
                <div key={item.key} onClick={()=>openPostDetail(item.key)} className="post">
                  <div className="postImage">
                    <img alt={item.createdAt} src={item.file} />
                  </div>
                  <div className="postHover">
                    <p>
                      <AiOutlineHeart className="icon" /> 37{" "}
                    </p>
                    <p>
                      <BsChat className="icon" /> 37{" "}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="post">
                <p>Havent posted anything</p>
              </div>
            )
          ) : (
            <div className="post">
              <div className="loading">
                <Loading />
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
export default ProfilePage;
