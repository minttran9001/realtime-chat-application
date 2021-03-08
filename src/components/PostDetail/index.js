import React from "react";
import "./style.scss";
import Mint from "../../images/mint.jpg";
import {
  AiOutlineSend,
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineClose,
} from "react-icons/ai";
import { VscBookmark } from "react-icons/vsc";
import { BsChat } from "react-icons/bs";
import Button from "../Layout/UI/Button";
import { useDispatch, useSelector } from "react-redux";
import noavt from '../../images/noavtar.png'
import Loading from "../Layout/UI/Loading";
import { pushPostComment } from "../../actions/post";
import { getRealtimeInteractions, updateLike } from "../../actions";
const PostDetail = ({auth}) => {
  const dispatch = useDispatch();
  const [replySelected, setReplySelected] = React.useState([]);
  const [commentValue, setCommentValue] = React.useState("");
  const { post, interaction } = useSelector((state) => state);
  const auth_uid = React.useMemo(()=>{
    return auth
  },[auth])
  const interactionArr = React.useMemo(() => {
    return interaction.interactions;
  }, [interaction.interactions]);
  const { item, loading, comments } = React.useMemo(() => {
    return {
      item: post.postByKey.item,
      loading: post.postByKey.loading,
      comments: post.postByKey.comments,
    };
  }, [post.postByKey.item, post.postByKey.comments]);
  React.useEffect(() => {
    dispatch(getRealtimeInteractions(item.key));
  }, [item.key,dispatch]);
  const closePostDetail = () => {
    const postDetail = document.querySelector(".postDetail");
    postDetail.classList.remove("open");
    const replies = document.querySelector(".replies");
    if (replies != null) {
      replies.classList.remove("view");
      const newArr = [];
      setReplySelected(newArr);
    }
  };
  const hanldePostComment = (e) => {
    e.preventDefault();
    const comment = {
      content: commentValue,
      pid: item.key,
      uid: auth_uid,
    };
    dispatch(pushPostComment(comment));
    setCommentValue("");
  };
  const openReplyComment = (index) => {
    const newArr = [...replySelected];

    document.querySelectorAll(".replies")[index].classList.add("view");
    newArr[index] = true;
    setReplySelected(newArr);
  };

  const closeReplyComment = (index) => {
    const newArr = [...replySelected];
    document.querySelectorAll(".replies")[index].classList.remove("view");
    newArr[index] = false;
    setReplySelected(newArr);
  };
  const handleLikePost = () => {
    const obj = {
      pid: item.key,
      uid: auth_uid,
    };
    dispatch(updateLike(obj));
  };
  const isInArray = (arr)=> {
    console.log(interactionArr)
      if(arr.length>0)
      {
        for (let i =0;i<arr.length;i++) {
          console.log(arr[i].uid)
          if(arr[i].uid===auth_uid)
          {
            return true;
          }
        }
        return false
      }
      else{
        return false
      }
    
  }
  return (
    <div className="postDetail">
      <AiOutlineClose className="exit" onClick={closePostDetail} />
      {loading ? (
        <Loading />
      ) : (
        <div className="postWrapper">
          <div className="postImage">
            <img src={item.file} alt={item.key} />
          </div>
          <div className="postStatus">
            <div className="postOwner">
              <div className="ownerAvatar">
                <div>
                  <img src={item.owner.avatarUrl != null ? item.owner.avatarUrl : noavt} alt={item.key} />
                </div>
                <p>{item.owner.firstName + " " + item.owner.lastName}</p>
              </div>
              <div className="more">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
              </div>
            </div>
            <div className="postDescription">
              <div className="ownerAvatar">
                <div>
                  <img src={item.owner.avatarUrl != null ? item.owner.avatarUrl : noavt} alt={item.key} />
                </div>
                <p className="name">
                  {item.owner.firstName + " " + item.owner.lastName}
                </p>
                <p className="status">{item.status}</p>
              </div>
              <div className="postedDate">
                <p>6d</p>
              </div>
              <div className="commentBox">
                {comments.map((item, index) => (
                  <div key={index} className="comment">
                    <div className="ownerImage">
                      <div className='wrap'>
                      <img
                        src={item.sender.avatarUrl != null ? item.sender.avatarUrl : noavt}
                        alt={item.sender.firstName}
                      />
                      </div>
                    </div>
                    <div className="ownerDetail">
                      <div className="ownerName">
                        <div className="content">
                          {" "}
                          <p>{item.sender.firstName}</p>
                          <p>{item.content}</p>
                        </div>
                      </div>
                      <div className="reply">
                        <span>4d</span>
                        <p>Reply</p>
                        <div className="heartIcon">
                          <AiOutlineHeart className="icon" />
                        </div>
                      </div>
                      <div className="viewReplies">
                        <div className="line"></div>
                        {replySelected[index] ? (
                          <p onClick={() => closeReplyComment(index)}>
                            Hide replies(2)
                          </p>
                        ) : (
                          <p onClick={() => openReplyComment(index)}>
                            View replies(2)
                          </p>
                        )}
                      </div>
                      <div className="replies">
                        <div className="replyItem">
                          <div className="ownerImage">
                            <img src={Mint} alt={Mint} />
                          </div>
                          <div className="ownerDetail">
                            <div className="ownerName">
                              <div className="content">
                                {" "}
                                <p>mint_stillwalks</p>
                                <p>{item.content}</p>
                              </div>
                            </div>

                            <div className="reply">
                              <span>4d</span>
                              <p>Reply</p>
                              <div className="heartIcon">
                                <AiOutlineHeart className="icon" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="postLiked">
                <div className="iconBox">
                  <div className="likeIcon">
                    {isInArray(interactionArr) ? (
                      <AiFillHeart onClick={handleLikePost} className="icon" />
                    ) : (
                      <AiOutlineHeart
                        onClick={handleLikePost}
                        className="icon"
                      />
                    )}

                    <BsChat className="icon" />
                    <AiOutlineSend className="icon" />
                  </div>
                  <div className="saveIcon">
                    <VscBookmark className="icon" />
                  </div>
                </div>
                <div className="likedBy">
                  <p>Liked by {interactionArr.length} peoples</p>
                  <p>{item.createdAt.toDate().toDateString()}</p>
                </div>
              </div>
              <form className="commentInput">
                <div className="input">
                  <input
                    onChange={(e) => setCommentValue(e.target.value)}
                    value={commentValue}
                    id="postComment"
                    placeholder="Add comment here"
                  />
                </div>
                <div className="button">
                  <Button type="submit" onClick={hanldePostComment}>
                    Post
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default PostDetail;
