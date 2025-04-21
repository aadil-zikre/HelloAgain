import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  TextField,
  IconButton,
  Fab,
  InputAdornment,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Contacts: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - replace with real data later
  const contacts = [
    {
      id: '1',
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 8900',
      categories: ['Family', 'Close Friends'],
    },
    {
      id: '2',
      fullName: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 234 567 8901',
      categories: ['Work', 'College'],
    },
  ];

  const filteredContacts = contacts.filter((contact) =>
    contact.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Contacts</Typography>
        <Fab
          color="primary"
          aria-label="add contact"
          onClick={() => {
            // TODO: Implement add contact functionality
          }}
        >
          <AddIcon />
        </Fab>
      </Box>

      <Paper sx={{ mb: 3, p: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search contacts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      <Paper>
        <List>
          {filteredContacts.map((contact) => (
            <ListItem
              key={contact.id}
              onClick={() => navigate(`/contacts/${contact.id}`)}
              sx={{
                cursor: 'pointer',
                '&:hover': { backgroundColor: 'action.hover' },
              }}
            >
              <ListItemAvatar>
                <Avatar>{contact.fullName[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={contact.fullName}
                secondary={
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EmailIcon fontSize="small" />
                      {contact.email}
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PhoneIcon fontSize="small" />
                      {contact.phone}
                    </Box>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Contacts; 