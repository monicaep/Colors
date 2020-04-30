import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import styles from './styles/PaletteStyles';

class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = { level: 500, format: 'hex' };
        this.changeLevel = this.changeLevel.bind(this);
        this.changeFormat = this.changeFormat.bind(this);
    }

    changeLevel(level) {
        this.setState({ level });
    }

    changeFormat(val) {
        this.setState({ format: val });
    }

    render() {
        const { classes, palette } = this.props;
        const { level, format } = this.state;

        return (
            <div className={classes.palette}>
                <Navbar 
                    level={level} 
                    changeLevel={this.changeLevel} 
                    handleChange={this.changeFormat} 
                    showingAllColors={true}
                />
                <div className={classes.paletteColors}>
                    {palette.colors[level].map(color => (
                        <ColorBox 
                            key={color.id} 
                            background={color[format]} 
                            name={color.name} 
                            id={color.id}
                            paletteId={palette.id}
                            showingFullPalette={true}
                        />
                    ))}
                </div>
                <PaletteFooter paletteName={palette.paletteName} emoji={palette.emoji} />
            </div>
        )
    }
}

export default withStyles(styles)(Palette);