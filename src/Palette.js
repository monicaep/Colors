import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import './Palette.css';

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
        return (
            <div className='Palette'>
                <Navbar 
                    level={this.state.level} 
                    changeLevel={this.changeLevel} 
                    handleChange={this.changeFormat} 
                    showingAllColors={true}
                />
                <div className='Palette-colors'>
                    {this.props.palette.colors[this.state.level].map(color => (
                        <ColorBox 
                            key={color.id} 
                            background={color[this.state.format]} 
                            name={color.name} 
                            id={color.id}
                            paletteId={this.props.palette.id}
                            showLink={true}
                        />
                    ))}
                </div>
                <PaletteFooter paletteName={this.props.palette.paletteName} emoji={this.props.palette.emoji} />
            </div>
        )
    }
}

export default Palette;