import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
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
                />
                <div className='Palette-colors'>
                    {this.props.palette.colors[this.state.level].map(color => (
                        <ColorBox key={color.id} background={color[this.state.format]} name={color.name} rgb={color.rgb}/>
                    ))}
                </div>
                <footer className='Palette-footer'>
                    {this.props.palette.paletteName}
                    <span className="emoji">{this.props.palette.emoji}</span>
                </footer>
            </div>
        )
    }
}

export default Palette;