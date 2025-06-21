import { useState, useEffect } from "react";
import {useParams} from 'react-router-dom';
import {Box} from '@mui/material';

import {Videos, ChannelCard} from './';
import { fetchFromAPI } from "../utils/fetchFromAPI";

const ChannelDetail = () => {
  const[ChannelDetail, setChannelDetail] = useState(null)
  const [videos, setVideos] = useState([])

  const {id} = useParams();

  useEffect(()=>{
    fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) => setChannelDetail(data?.items[0]));
    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then((data) => setVideos(data?.items));
  }, [id])

  return (
    <Box minHeight="95vh">
      <Box>
        <div style={{
          background: 'linear-gradient(135deg, rgba(227,227,227,1) 33%, rgba(236,202,156,1) 67%)',
          zIndex: 10,
          height: '300px',
        }}
        />
        <ChannelCard channelDetail={ChannelDetail} marginTop='-110px'/> 
        
      </Box>
      <Box display="flex">
        <Box sx={{mr: {sm: '100px'}}}/>
          <Videos videos={videos}/>
      </Box>

    </Box>
  )
}

export default ChannelDetail