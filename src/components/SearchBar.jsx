import { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Paper, IconButton, Box } from '@mui/material';
import { Search, Mic } from '@mui/icons-material';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const recognitionRef = useRef(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchTerm(transcript);
        navigate(`/search/${transcript}`);
      };

      recognition.onerror = (event) => {
        alert("Speech recognition error: " + event.error);
      };

      recognitionRef.current = recognition;
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
      setSearchTerm('');
    }
  };

  const startVoiceSearch = async () => {
    if (!recognitionRef.current) {
      alert('Voice search not supported in this browser.');
      return;
    }

    try {
      if (navigator.permissions) {
        const permission = await navigator.permissions.query({ name: 'microphone' });
        if (permission.state === 'denied') {
          alert('Microphone access is denied. Please allow it in your browser settings.');
          return;
        }
      }

      recognitionRef.current.start();
      alert('🎤 Listening... Please speak now.');
    } catch (error) {
      alert('Microphone access failed. Please check your browser settings.');
    }
  };

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          alignItems: 'center',
          borderRadius: '30px',
          pl: 2,
          pr: 1,
          backgroundColor: 'white',
          boxShadow: 'none',
          border: 'px solid #ccc',
          width: { xs: '100%', sm: '450' },
        }}
      >
        <input
          className="search-bar"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            fontSize: '16px',
            backgroundColor: 'transparent',
            padding: '10px 0',
          }}
        />
        <IconButton type="submit" sx={{ color: 'red' }}>
          <Search />
        </IconButton>
      </Paper>

      <IconButton
        onClick={startVoiceSearch}
        sx={{
          bgcolor: '#f1f1f1',
          '&:hover': { bgcolor: '#e0e0e0' },
          borderRadius: '50%',
          p: 1.2,
        }}
      >
        <Mic />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
