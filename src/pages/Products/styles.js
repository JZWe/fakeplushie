import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  root: {
    flexGrow: 1,
  },
  categoriesList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: '3px',
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'column',
      height: '80vh',
      marginRight: '30px',
    },
    [theme.breakpoints.down('md')]: {
      width: '100%',
      alignItems: 'center',
      marginLeft: '0px',
    },
  },
  categoryItem: {
    border: '1px solid grey',
    boxSizing: 'border-box',
    borderRadius: '3px',
    color: '#64748b',
    marginLeft: '10px',
    marginTop: '5px',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      width: '90%',
      marginBottom: '10px',
    },
  },

  active: {
    border: '2px solid red',
    boxShadow: '3px 3px 3px 1px rgba(0, 0, 0, 0.4) ',
  },

  productsList: {
    [theme.breakpoints.up('md')]: {
      height: '80vh',
    },
  },
  container: {
    marginTop: '2rem',
    display: 'grid',

    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '15% 80%',
      gridGap: '30px',
      margin: '0 auto',
    },
  },
}));
