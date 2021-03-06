import sizes from './sizes'

export default {
    navbar: {
        display: 'flex',
        alignContent: 'flex-start',
        alignItems: 'center',
        height: '6vh'      
    },
    logo: {
        marginRight: '15px',
        padding: '0 13px',
        fontSize: '22px',
        backgroundColor: '#eceff1',
        fontFamily: 'Roboto',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        '& a': {
            textDecoration: 'none',
            color: 'black'
        }  
    }, 
    slider: {
        width: '340px',
        margin: '0 10px',
        display: 'inline-block',
        '& .rc-slider-track': {
            backgroundColor: 'transparent'
        },
        '& .rc-slider-rail': {
            height: '8px'
        },
        [sizes.down('sm')]: {
            width: '200px'
        },
        [sizes.down('xs')]: {
            width: '150px'
        }
    },
    selectContainer: {
        marginLeft: 'auto',
        marginRight: '1rem'    
    }
}