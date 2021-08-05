import { makeStyles } from '@material-ui/core/styles';

//
export default makeStyles((theme) => ({
  img: {
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: '10px',
  },
  slider: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '100px',
  },
  'left-arrow': {
    position: 'absolute',
    top: '45%',
    left: '40px',
    fontSize: '1rem',
    zIndex: '10',
    cursor: 'pointer',
    userSelect: 'none',
    color: 'white',
    backgroundColor: '#2161d6',
    borderRadius: '100%',
    transform: 'scale(1.8)',
  },
  'right-arrow': {
    position: 'absolute',
    top: '45%',
    right: '40px',
    fontSize: '1rem',
    zIndex: '10',
    cursor: 'pointer',
    userSelect: 'none',
    color: 'white',
    backgroundColor: '#2161d6',
    borderRadius: '100%',
    transform: 'scale(1.8)',
  },
  slide: {
    objectFit: 'cover',
    opacity: '0',
    transitionDuration: '2s ease',
  },
  'slide-active': {
    opacity: '1',
    transitionDuration: '2s',
    transform: 'scale(1)',
  },
  dot: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    border: '3px solid #f1f1f1',
    margin: '0 5px',
    background: '#f1f1f1',
    cursor: 'pointer',
  },
  'dot-active': {
    background: 'rgb(32, 32, 32)',
  },
  'container-dots': {
    position: 'absolute',
    bottom: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
  },
}));
