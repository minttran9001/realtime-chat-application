import React from "react";
import "./style.scss";
import Mint from "../../images/mint.jpg";
import { AiOutlineSend, AiOutlineHeart, AiOutlineClose } from "react-icons/ai";
import { VscBookmark } from "react-icons/vsc";
import { BsChat } from "react-icons/bs";
import Button from "../Layout/UI/Button";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Layout/UI/Loading";
import { pushPost, pushPostComment } from "../../actions/post";
const PostDetail = () => {
  var { item, loading ,comments} = useSelector((state) => state.post.postbykey);
  const [commentValue, setCommentValue] = React.useState("");
  const auth = useSelector(state=>state.auth)
  const dispatch = useDispatch();
  const closePostDetail = () => {
    const postDetail = document.querySelector(".postDetail");
    postDetail.classList.remove("open");
  };
  const hanldePostComment = (e) => {
    e.preventDefault();
    const comment = {
      content : commentValue,
      pid : item.key,
      uid : auth.uid,
    }
    dispatch(pushPostComment(comment))
    setCommentValue("")
  };
  console.log(comments)
  return (
    <div className="postDetail">
      <AiOutlineClose className="exit" onClick={closePostDetail} />
      {loading ? (
        <Loading />
      ) : (
        <div className="postWrapper">
          <div className="postImage">
            <img src={item.file} />
          </div>
          <div className="postStatus">
            <div className="postOwner">
              <div className="ownerAvatar">
                <img src={Mint} />
                <p>mint_stillwalks</p>
              </div>
              <div className="more">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
              </div>
            </div>
            <div className="postDescription">
              <div className="ownerAvatar">
                <img src={Mint} />
                <p className="name">mint_stillwalks</p>
                <p className="status">{item.status}</p>
              </div>
              <div className="postedDate">
                <p>6d</p>
              </div>
              <div className="commentBox">
                {
                  comments.map((item,index)=>(
                    <p>{item.content}</p>
                  ))
                }
              </div>
              <div className="postLiked">
                <div className="iconBox">
                  <div className="likeIcon">
                    <AiOutlineHeart className="icon" />
                    <BsChat className="icon" />
                    <AiOutlineSend className="icon" />
                  </div>
                  <div className="saveIcon">
                    <VscBookmark className="icon" />
                  </div>
                </div>
                <div className="likedBy">
                  <p>Liked by 0 peoples</p>
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
