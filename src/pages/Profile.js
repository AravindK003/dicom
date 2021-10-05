import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';
import { CardContent, Grid } from '@mui/material';
import UserDetails from './UserDetails';

const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0'
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none'
  }
};

const useStyles = makeStyles(styles);

export default function Profile() {
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4} md={5}>
          <Card>
            {/* <CardAvatar profile> */}
            <a href="#pablo" onClick={(e) => e.preventDefault()} style={{ textAlign: 'center' }}>
              <img
                src="/static/mock-images/avatars/avatar_default.jpg"
                alt="..."
                style={{ marginLeft: 'auto', marginRight: 'auto', borderRadius: '60px' }}
              />
            </a>
            {/* </CardAvatar> */}
            <CardContent>
              <h3 className={classes.cardTitle} style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                Aravind
              </h3>
              <h6
                className={classes.cardCategory}
                style={{ marginLeft: 'auto', marginRight: 'auto' }}
              >
                CEO / CO-FOUNDER
              </h6>
              {/* <Divider /> */}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <UserDetails />
          {/* {phone && <PhoneChange />}
            {email && <EmailChange />}
            {password && <PasswordChange />}
            {detail && <BasicDetails handleEdit={handleEdit}/>}
            {edit && <ProfileEdit />} */}
        </Grid>
      </Grid>
    </div>
  );
}
