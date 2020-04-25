import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import MiniPalette from './MiniPalette';
import background from './styles/background.svg'

const styles ={
    root: {
        backgroundColor: 'indigo',
        height: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#321daa',
        backgroundImage: `url(${background})`,
         // background by SVGBackgrounds.com 
        overflow: 'scroll'

    },
    container: {
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        flexWrap: 'wrap'
    },
    nav: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'white',
        "& a": {
            color: 'white'
        }
    },
    header: {
        fontSize: '1.8rem'
    },
    palettes: {
        boxSizing: 'border-box',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 30%)',
        gridGap: '5%'
    }
}

class PaletteList extends Component {
    goToPalette(id) {
        this.props.history.push(`/palette/${id}`);
    }

    render() {
        const { palettes, classes, deletePalette } = this.props;
        return (
            <div className={classes.root}>
                <div className='PaletteList'>
                    <div className={classes.container}>
                        <nav className={classes.nav}>
                            <h1 className={classes.header}>React Colors</h1>
                            <Link to='/palette/new'>Create Palette</Link>
                        </nav>
                        <div className={classes.palettes}>
                            {palettes.map(palette => (
                                <MiniPalette
                                {...palette} 
                                key={palette.id}
                                handleClick={() => this.goToPalette(palette.id)}
                                handleDeletePalette={deletePalette} 
                                id={palette.id} />
                            ))}
                        </div>
                    </div>                    
                </div>
            </div>
        )
    }
} 

export default withStyles(styles)(PaletteList);