import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  gridContainer: {
    marginTop: '2rem',
    height: '400px',
    width: '100vw',
  },
  gridItem: {
    padding: '400px',
    width: '100%',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      height: '75%',
      textAlign: 'center',
    },
  },
  leftBox: {
    color: 'white',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& h5': {
      marginBottom: '2rem',
    },
    [theme.breakpoints.down('sm')]: {
      '& h5': {
        fontSize: '20px',
      },
    },
  },
  rightBox: {
    color: 'white',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'column',
    '& div': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '33.3333%',
      width: '100%',
      '& span': {
        marginLeft: '10%',
      },
    },
  },
}));
