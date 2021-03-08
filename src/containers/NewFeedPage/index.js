import React, { useState } from "react";
import Layout from "../../components/Layout";
import "./style.scss";
import testImg from "../../images/mint.jpg";
import { AiOutlineSend, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import noavt from '../../images/noavtar.png';
import { BsChat } from "react-icons/bs";
import { VscBookmark } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import {
  getRealTimePostsNewFeed,
  pushPostComment,
  setOffLine,
  updateLike,
} from "../../actions";
import moment from "moment";
import Button from "../../components/Layout/UI/Button";
import FormChat from "../../components/Layout/UI/FormChat";
import { NavLink } from "react-router-dom";
const NewFeedPage = () => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const { post, auth } = useSelector((state) => state);
  const posts = React.useMemo(() => {
    return post.posts;
  }, [post.posts]);
  React.useEffect(() => {
    dispatch(getRealTimePostsNewFeed());
  }, []);
  const handleUpdateLike = (pid) => {
    const interaction = {
      pid,
      uid: auth.uid,
    };
    dispatch(updateLike(interaction));
  };
  const isInArray = (arr) => {
    if (arr.length > 0) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].uid === auth.uid) {
          return true;
        }
      }
      return false;
    } else {
      return false;
    }
  };
 
  const handlePushComment = (e,pid) => {
    e.preventDefault();
  
     if(comment!=='')
     {
      dispatch(pushPostComment({ pid, uid: auth.uid, content: comment }))
      setComment('')
     }
    
  };
  return (
    <Layout>
      <div className="newFeed">
        <div className="newFeedWrap">
          <div className="swipeSide">
            <div className="storyLine">
              <div className="storyBox">
                <div className="avatarWrap">
                  <img src={testImg} alt="avatar" />
                </div>
                <div className="nameWrap">
                  <p>minttran</p>
                </div>
              </div>
              <div className="storyBox">
                <div className="avatarWrap">
                  <img src={testImg} alt="avatar" />
                </div>
                <div className="nameWrap">
                  <p>miran</p>
                </div>
              </div>
              <div className="storyBox">
                <div className="avatarWrap">
                  <img src={testImg} alt="avatar" />
                </div>
                <div className="nameWrap">
                  <p>minttran</p>
                </div>
              </div>
            </div>
            <div className="postWrapper">
              {posts.map((item, index) => (
                <div key={index} className="post">
                  <NavLink to={`profile/${item.uid}`} className="postOwner">
                    <div className="ownerImage">
                      <img
                        src={
                          item.owner.avatarUrl != null ? item.owner.avatarUrl : noavt
                        }
                        alt="avatar owner"
                      />
                    </div>
                    <div className="ownerName">
                      <p>{item.owner.firstName + " " + item.owner.lastName}</p>
                    </div>
                  </NavLink>
                  <div className="postImage">
                    <img src={item.file} alt={item.status} />
                  </div>
                  <div className="interactionBox">
                    <div className="button">
                      {!isInArray(item.interactions) ? (
                        <AiOutlineHeart
                          onClick={() => handleUpdateLike(item.key)}
                          className="icon"
                        />
                      ) : (
                        <AiFillHeart
                          onClick={() => handleUpdateLike(item.key)}
                          className="icon"
                        />
                      )}
                      <BsChat className="icon" />
                      <AiOutlineSend className="icon" />
                    </div>
                    <div className="save">
                      <VscBookmark className="icon" />
                    </div>
                  </div>
                  <div className="likedBy">
                    <p>Liked by {item.interactions.length} peoples</p>
                  </div>
                  <div className="postContent">
                    <div className="ownerName">
                      <span className="name">
                        {item.owner.firstName + " " + item.owner.lastName}
                      </span>
                      <span className="content">{item.status}</span>
                    </div>
                  </div>
                  <div className="viewAllComment">
                    {item.comments.length > 2 ? (
                      <p>View All {item.comments.length} Comments</p>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="commentBox">
                    {item.comments.slice(0,2).map((comment, commentIndex) => (
                      <div key={commentIndex} className="comment">
                        <span className="name">
                          {comment.sender.firstName +
                            " " +
                            comment.sender.lastName}
                        </span>
                        <span className="conent">{comment.content}</span>
                      </div>
                    ))}
                  </div>
                  <div className="createdAt">
                    <p>{moment(item.createdAt.toDate()).fromNow(true)} ago</p>
                  </div>
                  <FormChat
                    onChange={(value) => setComment(value)}
                    style={{ paddingLeft:10,paddingRight:10}}
                    type="submit"
                    value={comment}
                    handleFunction={(e) => handlePushComment(e,item.key)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default NewFeedPage;
