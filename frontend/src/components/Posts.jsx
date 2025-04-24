import React, { useState } from "react";
import {
  FaArrowAltCircleUp,
  FaBookmark,
  FaComment,
  FaEdit,
  FaExpand,
  FaExpandAlt,
  FaExpandArrowsAlt,
  FaHeart,
  FaLink,
  FaShare,
  FaTrash,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData } from "../pages/features/usersSlice";
import {
  deletePost,
  getAllPosts,
  updateLikes,
  updatePost,
} from "../pages/features/postSlice";
import { Link } from "react-router-dom";

const Posts = ({
  posts,
  showComments = false,
  thePostId = null,
}) => {
  const [editedPost, setEditedPost] = useState(null);
  const [comment, setComment] = useState("");

  const post = posts.find((post) => post._id === thePostId);

  const dispatch = useDispatch();
  const { logedInUser } = useSelector((state) => state.users);

  const bookMarkHandler = (postId) => {
    const index = logedInUser.bookmarkPosts.findIndex((id) => id == postId);
    if (index == -1) {
      const bookMarks = {
        bookmarkPosts: [...logedInUser.bookmarkPosts, postId],
      };
      dispatch(
        updateUserData({ userId: logedInUser._id, userData: bookMarks })
      );
    } else {
      const bookMarks = {
        bookmarkPosts: logedInUser.bookmarkPosts.filter((id) => id != postId),
      };
      dispatch(
        updateUserData({ userId: logedInUser._id, userData: bookMarks })
      );
    }
  };

  const likeHandler = (postId) => {
    const index = logedInUser.likedPosts.findIndex((id) => id == postId);
    const post = posts.find((post) => post._id === postId);
    const currentLikes = post.postLikes ? post.postLikes : 0;

    if (index == -1) {
      const likes = {
        likedPosts: [...logedInUser.likedPosts, postId],
      };
      const likeOfPost = {
        postLikes: currentLikes + 1,
      };
      dispatch(updateUserData({ userId: logedInUser._id, userData: likes }));
      dispatch(updatePost({ postId, updatedData: likeOfPost }));
      dispatch(updateLikes({ postId, updatedData: likeOfPost }));
    } else {
      const likes = {
        likedPosts: logedInUser.likedPosts.filter((id) => id != postId),
      };
      const likeOfPost = {
        postLikes: currentLikes > 0 ? currentLikes - 1 : 0,
      };
      dispatch(updateUserData({ userId: logedInUser._id, userData: likes }));
      dispatch(updatePost({ postId, updatedData: likeOfPost }));
      dispatch(updateLikes({ postId, updatedData: likeOfPost }));
    }
  };

  const deleteHandler = (postId) => {
    const likeIndex = logedInUser.likedPosts.findIndex((id) => id == postId);
    const bookmarkIndex = logedInUser.bookmarkPosts.findIndex(
      (id) => id == postId
    );
    if (likeIndex != -1) {
      const likes = {
        likedPosts: logedInUser.likedPosts.filter((id) => id != postId),
      };
      dispatch(updateUserData({ userId: logedInUser._id, userData: likes }));
    }
    if (bookmarkIndex != -1) {
      const bookMarks = {
        bookmarkPosts: logedInUser.bookmarkPosts.filter((id) => id != postId),
      };
      dispatch(
        updateUserData({ userId: logedInUser._id, userData: bookMarks })
      );
    }
    dispatch(deletePost(postId));
  };

  const handleUpdate = async (postId) => {
    const updatedData = {
      postText: editedPost,
    };
    dispatch(updatePost({ postId, updatedData })).then(() => {
      dispatch(getAllPosts());
    });
    setEditedPost(null);
  };

  const handleComment = () => {
    const theData = { ...logedInUser, userComment: comment };
    const updatedData = {
      postComments: [theData, ...post.postComments],
    };
    dispatch(updatePost({ postId: thePostId, updatedData })).then(() => {
      dispatch(getAllPosts());
    });

    setComment("");
  };

  const isLiked = (postId) => logedInUser.likedPosts.includes(postId);
  const isBookmared = (postId) => logedInUser.bookmarkPosts.includes(postId);

  console.log("The posts : ", posts)

  return (
    <div>
      <div className="row">
        {posts.map((post) => (
          <React.Fragment key={post._id}>
            <div className="col-md-1">
              <img
                src={`${post.userImage
                  ? post.userImage
                  : "https://img.freepik.com/premium-photo/lego-figure-boy-wearing-glasses-jacket-with-hood_113255-94249.jpg?size=626&ext=jpg&ga=GA1.1.975262890.1723114701&semt=ais_hybrid"
                  }`}
                alt="userImage"
                className="img-fluid rounded-circle"
              />
            </div>
            <div className="col-md-10">
              <p>
                <span className="fw-normal ">{post.fullName}</span>
                <span className="text-body-secondary ">
                  @{post.userName} &#8226;{" "}
                </span>

                {thePostId ? (
                  <Link to={"/home"}>
                    <FaExpandAlt />
                  </Link>
                ) : (
                  <Link to={`/post/${post._id}`}>
                    <FaExpandAlt />{" "}
                  </Link>
                )}
              </p>

              <div>
                <div>
                  {post.postMedia && (
                    <div>
                      {post.postMedia.includes("image") ? (
                        <img
                          src={post.postMedia}
                          alt="media"
                          className="img-fluid py-3"
                        />
                      ) : (
                        <>
                          <video width="100%" height="240" controls>
                            <source src={post.postMedia} type="video/mp4" />
                            <source src={post.postMedia} type="video/ogg" />
                            Your browser does not support the video tag.
                          </video>
                        </>
                      )}
                    </div>
                  )}
                </div>
                {post.postText.split("\n").map((text, index) => (
                  <p key={index}>{text}</p>
                ))}
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  <FaHeart
                    style={{
                      cursor: "pointer",
                      color: isLiked(post._id) ? "red" : "black",
                    }}
                    onClick={() => likeHandler(post._id)}
                  />
                  <span> {post.postLikes}</span>

                </div>

                {thePostId ? (
                  <Link to={"/home"}>
                    <FaComment style={{ cursor: "pointer", color: "red" }} />
                  </Link>
                ) : (
                  <div>
                    <Link to={`/post/${post._id}`}>
                      <FaComment style={{ cursor: "pointer", color: "black" }} />{" "}
                    </Link>
                    <span> {post.postComments.length > 0 ? post.postComments.length : null}</span>
                  </div>
                )}
                {/* <FaShare style={{cursor : 'pointer'}}/> */}
                <FaBookmark
                  style={{
                    cursor: "pointer",
                    color: isBookmared(post._id) ? "green" : "black",
                  }}
                  onClick={() => bookMarkHandler(post._id)}
                />
              </div>
              <hr />
            </div>
            {/*  */}
            <div className="col-md-1">
              {post.userName === logedInUser.userName ? (
                <div className="d-flex justify-content-between">
                  <div>
                    <div
                      className="modal fade"
                      id={`postModal${post._id}`}
                      tabIndex="-1"
                      aria-labelledby={`postModalLabel${post._id}`}
                      inert
                    >
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h1
                              className="modal-title fs-5"
                              id={`postModalLabel${post._id}`}
                            >
                              Update Post
                            </h1>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <textarea
                              className="form-control"
                              value={editedPost ? editedPost : post.postText}
                              onChange={(e) => setEditedPost(e.target.value)}
                            ></textarea>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary"
                              data-bs-dismiss="modal"
                              onClick={() => handleUpdate(post._id)}
                            >
                              Save changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {showComments ? null : (
                    <FaEdit
                      style={{ cursor: "pointer" }}
                      data-bs-toggle="modal"
                      data-bs-target={`#postModal${post._id}`}
                      title="Edit"
                    />
                  )}
                  <FaTrash
                    style={{ cursor: "pointer" }}
                    onClick={() => deleteHandler(post._id)}
                    title="Delete"
                  />
                </div>
              ) : null}
            </div>
            {showComments && (
              <div>
                <div className="row">
                  <div className="col-md-1">
                    <img
                      src={logedInUser.userImage}
                      alt="userImage"
                      className="img-fluid rounded-circle"
                    />
                  </div>
                  <div className="col-md-9">
                    <input
                      className="form-control"
                      placeholder="write comment here..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>
                  <div className="col-md-2">
                    <button className="btn btn-danger" onClick={handleComment}>
                      Comment
                    </button>
                  </div>
                </div>
                <br />
                {post.postComments.map((cmt) => (
                  <div className="row">
                    <hr className="border-danger" />
                    <div className="col-md-1">
                      <img
                        src={cmt.userImage}
                        alt="userImage"
                        className="img-fluid rounded-circle"
                      />
                    </div>
                    <div className="col-md-11">
                      <p>
                        <span className="text-body-secondary">
                          {" "}
                          @{cmt.userName} &#8226;{" "}
                        </span>{" "}
                      </p>
                      <div>
                        {cmt.userComment.split(".").map((text, index) => (
                          <p key={index}>{text}.</p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Posts;
