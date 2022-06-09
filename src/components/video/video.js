import React from 'react'
import ReactPlayer from 'react-player'

function Video(){
    return(
        <div>
            <ReactPlayer url='https://res.cloudinary.com/colombia/video/upload/v1654275054/kuepa/los%20simpson/Simpsons_Intro_HD_nyv3vq.mp4' 
            width='100%'
            height='50%'
            loop
            playing
            controls
            />
        </div>
    )
}

export default Video;
