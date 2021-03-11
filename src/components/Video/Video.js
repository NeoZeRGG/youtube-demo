import React from "react";
import "./Video.css";

function Video({ video, defaultList }) {
  return (
    <div className={defaultList ? 'video' : 'video video_grid'}>
      <div className={defaultList ? 'video__frame' : 'video__frame video__frame_grid'}>
        <iframe
          title={video.snippet.description}
          className="video-iframe"
          src={`https://www.youtube.com/embed/${video.id.videoId}`}
          frameBorder="0"
          fs="0"
          width="100%"
          height="100%"
        />
      </div>
      <div  className={defaultList ? 'video__info' : 'video__info video__info_grid'}>
        <p className="video__title">{video.snippet.title}</p>
        <p>{video.snippet.channelTitle}</p>
      </div>
    </div>
  );
}

export default Video;
