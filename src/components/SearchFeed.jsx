import { useState, useEffect } from "react";
import { Box, Typography } from '@mui/material';
import {useParams} from 'react-router-dom';

import { fetchFromAPI } from '../utils/fetchFromAPI';
import { Videos } from "./";

const SearchFeed = () => {
  const [videos, setVideos] = useState([]);
  const {searchTerm} = useParams();

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`).then((data) => setVideos(data.items))
  }, [searchTerm]);

  return (
    <Box p={2} sx={{ overflowY: 'auto', height: '90vh', flex: 2 }}>
      <Typography variant='h4' fontWeight='520' mb={2} sx={{ color: 'black' }}>
        Search Results for:  <span style={{ color: '#DBA979' }}>{searchTerm}</span>
      </Typography>
      <Videos videos={videos} />
    </Box>
  )
}

export default SearchFeed