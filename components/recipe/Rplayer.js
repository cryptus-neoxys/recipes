import { useRef } from "react";
import RMethod from "./RMethod";
function Rplayer({ str, directions }) {
  const ref = useRef();
  return (
    <div className="max-h-xl min-h-min min-w-min lg:max-w-xl lg:ml-36 max-w-xl mx-5 mt-10">
      {/* <ReactPlayer
            ref = {ref}
            url = 'https://manifest.prod.boltdns.net/manifest/v1/hls/v4/clear/1033249144001/146b639c-fc00-49f7-a73e-7f72d525060e/10s/master.m3u8?fastly_token=NjBhMTFiYzhfZjc0ZjRjOTAyODUyMDAyOTg3YmQ1ZTFkZDVmNjM1MmQ4NTQwMzU1MWU4ZmZhZjc3MzI2NDQ0YWRjZTIyMTgzMA%3D%3D'
            // onPlay = {()=>{
            //     ref.current.getCurrentTime() <6 ? ref.current.seekTo(6,"seconds"): null
            // }}
            onSeek = {()=>{
                ref.current.getCurrentTime() <9 ? ref.current.seekTo(9,"seconds"): null
            }}
            width = "100%"
            height = "100%"
            controls = {true}
            config = {
                {
                    file : {
                        hlsOptions: {
                            "startPosition" : 9
                        }
                    }
                }
            }
          /> */}
      <img src={str} />
      <RMethod meth={directions} />
    </div>
  );
}

export default Rplayer;
