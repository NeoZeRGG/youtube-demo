import React from "react";
import Video from "../Video/Video";
import "./Videos.css";

function Videos({ data, defaultList }) {
  return (
    <ul className={defaultList ? 'videos' : 'videos videos_grid'}>
      {data.map((video) => (
        <Video
          key={video.etag}
          video={video}
          defaultList={defaultList}
        />
      ))}
    </ul>
  );
}

export default Videos;
