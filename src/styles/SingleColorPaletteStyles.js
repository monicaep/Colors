import sizes from './sizes';

export default {
    palette: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
    },
    paletteColors: {
        height: '90%'
    },
    goBack: {
        backgroundColor: 'black',
        width: '20%',
        height: '50%',
        margin: '0 auto',
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer',
        marginBottom: '-3.5px',
        textDecoration: 'none',
        '& a': {
            width: '100px',
            height: '30px',
            position: 'absolute',
            display: 'inline-block',
            top: '50%',
            left: '50%',
            marginLeft: '-50px',
            marginTop: '-15px',
            textAlign: 'center',
            outline: 'none',
            background: 'rgba(255, 255, 255, 0.3)',
            fontSize: '1rem',
            lineHeight: '30px',
            border: 'none',
            textDecoration: 'none',
            color: 'white'
        },
        [sizes.down('md')]: {
            width: '25%',
            height: '33.3333333%'
        },
        [sizes.down('sm')]: {
            width: '50%',
            height: '20%'
        },
        [sizes.down('xs')]: {
            width: '100%',
            height: '10%'
        }
    }
}