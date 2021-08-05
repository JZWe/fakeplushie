import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  backdrop: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100vh',
    zIndex: '10',
    background: 'rgba(0, 0, 0, 0.75)',
  },
  header: {
    background: '#4f005f',
    padding: '1rem',
    color: 'white',
  },
  actions: {
    padding: '1rem',
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));
