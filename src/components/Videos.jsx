import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Firebase from "../firebase-config";
import videos from "../videos";

const StyledVideos = styled.div`
  padding: 50px;
  padding-top: 0px;
  display: flex;
  flex-direction: column;
  & * {
    outline: none;
  }
  & .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    & button {
      margin: 20px 0px;
      border-radius: 25px;
      width: 150px;
      background-color: black;
      color: white;
      font-weight: 900;
      padding: 10px;
      font-size: 18px;
      cursor: pointer;
    }
  }
  & .videos {
    display: flex;
    gap: 100px;
    overflow: scroll;
  }
`;

const Videos = ({ user }) => {
  const [videoCount, setVideoCount] = useState(0);
  const [messageId, setMessageId] = useState("");

  useEffect(() => {
    if (user) {
      Firebase.database()
        .ref()
        .child(user?.uid)
        .on("value", (snapshot) => {
          if (snapshot.val()) {
            Object.keys(snapshot.val()).map((msgId) => {
              setMessageId(msgId);
              setVideoCount(snapshot.val()[msgId].count);
            });
          } else {
            setVideoCount(0);
          }
        });
    }
  }, [user]);

  const handleLogout = () => {
    Firebase.auth().signOut();
  };

  const handleVideoWatched = (e) => {
    if (videoCount === 0) {
      Firebase.database().ref().child(user?.uid).push({
        count: 1,
      });
    } else {
      Firebase.database()
        .ref()
        .child(user?.uid)
        .child(messageId)
        .set({
          count: videoCount + 1,
        });
    }
    setVideoCount(videoCount + 1);
  };

  return (
    <StyledVideos>
      <div className="header">
        <h1>{user ? `Welcome ${user.email}` : "No user loged in"}</h1>
        {user && <h3>{`Count: ${videoCount}`}</h3>}
        {user && (
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
      {user && (
        <div className="videos">
          <video
            width="480"
            height="400"
            controls={true}
            id={1}
            onEnded={handleVideoWatched}
          >
            <source type="video/mp4" src={videos.video1}></source>
          </video>
          <video
            width="480"
            height="400"
            controls={true}
            id={2}
            onEnded={handleVideoWatched}
          >
            <source type="video/mp4" src={videos.video2}></source>
          </video>
          <video
            width="480"
            height="400"
            controls={true}
            id={3}
            onEnded={handleVideoWatched}
          >
            <source type="video/mp4" src={videos.video3}></source>
          </video>
          <video
            width="480"
            height="400"
            controls={true}
            id={4}
            onEnded={handleVideoWatched}
          >
            <source type="video/mp4" src={videos.video4}></source>
          </video>
          <video
            width="480"
            height="400"
            controls={true}
            id={5}
            onEnded={handleVideoWatched}
          >
            <source type="video/mp4" src={videos.video5}></source>
          </video>
          <video
            width="480"
            height="400"
            controls={true}
            id={6}
            onEnded={handleVideoWatched}
          >
            <source type="video/mp4" src={videos.video6}></source>
          </video>
          <video
            width="480"
            height="400"
            controls={true}
            id={7}
            onEnded={handleVideoWatched}
          >
            <source type="video/mp4" src={videos.video7}></source>
          </video>
          <video
            width="480"
            height="400"
            controls={true}
            id={8}
            onEnded={handleVideoWatched}
          >
            <source type="video/mp4" src={videos.video8}></source>
          </video>
        </div>
      )}
    </StyledVideos>
  );
};

export default Videos;
