import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  Button,
} from '@mui/material';
import {
  Edit as EditIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Cake as CakeIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';

const ContactDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Mock data - replace with real data later
  const contact = {
    id: '1',
    fullName: 'John Doe',
    nickname: 'Johnny',
    email: 'john@example.com',
    phone: '+1 234 567 8900',
    birthday: '1990-05-15',
    categories: ['Family', 'Close Friends'],
    customFields: {
      'Favorite Food': 'Pizza',
      'Anniversary': '2020-06-20',
    },
  };

  const lifeEvents = [
    {
      id: '1',
      type: 'New Job',
      date: '2024-03-15',
      description: 'Started working at Google as Senior Software Engineer',
    },
    {
      id: '2',
      type: 'Moved',
      date: '2024-01-01',
      description: 'Relocated to San Francisco',
    },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Contact Details</Typography>
        <IconButton color="primary" aria-label="edit contact">
          <EditIcon />
        </IconButton>
      </Box>

      <Grid container spacing={3}>
        {/* Basic Information */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <Avatar
                sx={{ width: 100, height: 100, mb: 2, fontSize: '2.5rem' }}
              >
                {contact.fullName[0]}
              </Avatar>
              <Typography variant="h5">{contact.fullName}</Typography>
              {contact.nickname && (
                <Typography variant="subtitle1" color="text.secondary">
                  "{contact.nickname}"
                </Typography>
              )}
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Categories
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {contact.categories.map((category) => (
                  <Chip
                    key={category}
                    icon={<CategoryIcon />}
                    label={category}
                    size="small"
                  />
                ))}
              </Box>
            </Box>

            <List>
              <ListItem>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EmailIcon />
                      {contact.email}
                    </Box>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PhoneIcon />
                      {contact.phone}
                    </Box>
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CakeIcon />
                      {contact.birthday}
                    </Box>
                  }
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Life Events */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">Life Events</Typography>
              <Button variant="outlined" startIcon={<EditIcon />}>
                Add Event
              </Button>
            </Box>

            <List>
              {lifeEvents.map((event, index) => (
                <React.Fragment key={event.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" color="primary">
                          {event.type}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" color="text.secondary">
                            {event.date}
                          </Typography>
                          <Typography variant="body1">
                            {event.description}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                  {index < lifeEvents.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>

          {/* Custom Fields */}
          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Custom Fields
            </Typography>
            <List>
              {Object.entries(contact.customFields).map(([key, value], index) => (
                <React.Fragment key={key}>
                  <ListItem>
                    <ListItemText
                      primary={key}
                      secondary={value}
                    />
                  </ListItem>
                  {index < Object.entries(contact.customFields).length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactDetail; 