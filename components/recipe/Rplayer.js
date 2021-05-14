import { useRef } from 'react'
import ReactPlayer from 'react-player'
function Rplayer() {
    const ref = useRef()
    return (
        <div className="max-w-3xl max-h-xl min-h-1/2 min-w-1/2 mt-10 mx-5 lg:ml-36">
            <ReactPlayer
            ref = {ref}
            url = 'https://manifest.prod.boltdns.net/manifest/v1/hls/v4/clear/1033249144001/07f0f064-357d-4b03-bd90-530816031df2/10s/master.m3u8?fastly_token=NjBhMTFhMGRfMTNmODJhY2YxNDFlYWZmMGFjMjJiYjNjZTAyM2U2YTE4YWNlZWUzOTNiMzYzYzNmNTFmNmY3NjgzNjkzZGYzNg%3D%3D'
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
          />
        </div>
    )
}

export default Rplayer
