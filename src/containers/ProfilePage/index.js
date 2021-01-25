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
import PostDetail from "../../components/PostDetail/index";
import ModalPost from "../../components/ModalPost/index";
import { useSelector, useDispatch } from "react-redux";
import { getPostByKey, getUserById } from "../../actions";
import Loading from "../../components/Layout/UI/Loading/index";
import noavt from "../../images/noavtar.png";

import ModalUpdateAvatar from "../../components/ModalUpdateAvatar";

const ProfilePage = (props) => {
  const dispatch = useDispatch();
  const { user, auth } = useSelector((state) => state);

  //use Memo

  const userByKey = React.useMemo(() => {
    return user.userByKey;
  }, [user.userByKey]);
  const auth_uid = React.useMemo(() => {
    return auth.uid;
  }, [auth.uid]);
  const uidParam = React.useMemo(() => {
    return props.match.params;
  }, [props.match.params]);

  //end use Memo

  React.useEffect(() => {
    dispatch(getUserById(uidParam));
  }, [uidParam]);

  const openPostDetail = (key) => {
    
    const postDetail = document.querySelector(".postDetail");
    postDetail.classList.add("open");
    dispatch(getPostByKey(key,userByKey.uid));
  };

  const openModalPost = () => {
    document.querySelector(".modalPost").classList.add("open");
  };

  const openModalUpdateAvatar = () => {
    document.querySelector(".modalUpdateAvatar").classList.add("open");
  };

  return (
    <Layout>
      <ModalPost />
      <ModalUpdateAvatar />
      <PostDetail auth = {auth_uid} />
      {!user.loadingUserByKey ? (
        <div className="profile">
          <div className="profileHead">
            <div className="avatar">
              <div className="avatarWrap">
                {
                  <img
                    src={
                      userByKey.avatarUrl != null ? userByKey.avatarUrl : noavt
                    }
                    alt="avatar"
                  />
                }
              </div>
              <AiOutlinePlusCircle
                onClick={openModalUpdateAvatar}
                className="icon"
              />
            </div>
            <div className="details">
              <div className="userName">
                <p>{userByKey.firstName + " " + userByKey.lastName}</p>
                <Button>
                  {auth_uid === userByKey.uid ? "Edit Profile" : "Follow"}
                </Button>
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
          {auth_uid === userByKey.uid ? (
            <div className="postButton">
              <Button onClick={openModalPost}>Post something</Button>
            </div>
          ) : (
            <></>
          )}
          <div className="allPosts">
            {userByKey.posts.length > 0 ? (
              userByKey.posts.map((item) => (
                <div
                  key={item.key}
                  onClick={() => openPostDetail(item.key)}
                  className="post"
                >
                  <div className="postImage">
                    <img alt={item.createdAt} src={item.file} />
                  </div>
                  <div className="postHover">
                    <p>
                      <AiOutlineHeart className="icon" /> {item.likeCount}
                    </p>
                    <p>
                      <BsChat className="icon" /> {item.commentCount}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="post">
                <p>Havent posted anything</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="loadingWrap">
          <Loading />
        </div>
      )}
    </Layout>
  );
};
export default ProfilePage;
