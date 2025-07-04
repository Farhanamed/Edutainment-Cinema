import { useState, useEffect } from "react";
import {Box, Stack, Typography} from '@mui/material';

import { fetchFromAPI } from '../utils/fetchFromAPI';
import {Sidebar, Videos} from "./";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState('New');
  const [videos, setVideos] = useState([]);

  useEffect(()=>{
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`).then((data)=>setVideos(data.items))
  }, [selectedCategory]);

  return (
    <Stack sx={{flexDirection: {sx: "column", md: "row"}}}>
      {/* <Box sx={{height: {sx: 'auto', md: '92vh'}, borderRight: '1px solid #3d3d3d', px: {sx: 0, md: 2}}}> */}
      <Box sx={{height: {sx: 'auto', md: '92vh'}, px: {sx: 0, md: 2}}}>
        <Sidebar 
          selectedCategory = {selectedCategory}
          setSelectedCategory = {setSelectedCategory}
        />
        <Typography className="copyright" variant="body2" sx={{mt: 1.5, color: 'black'}}>
          <b> © 2025 Farhan </b>
        </Typography>
      </Box>
      <Box p={2} sx={{overflowY: 'auto', height: '90vh', flex: 2}}>
        <Typography variant='h4' fontWeight='520' mb={2} sx={{color:'black'}}>
         {selectedCategory} <span style={{color: '#DBA979'}}>videos</span>
        </Typography>
        <Videos videos={videos}/>
      </Box>
    </Stack>
  )
}

export default Feed