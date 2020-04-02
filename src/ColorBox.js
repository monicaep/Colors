import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';
import { withStyles } from '@material-ui/core/styles';
import './ColorBox.css';

const styles = {
    colorText: {
        color: props => 
            chroma(props.background).luminance() >= 0.7 ? 'black' : 'white'
    },
    colorName: {
        color: props =>
            chroma(props.background).luminance() <= 0.08 ? 'white' : 'black'
    },
    button: {
        color: props =>
            chroma(props.background).luminance() >= 0.6 ? 'rgba(0, 0, 0, 0.7)' : 'white'
    }
}

class ColorBox extends Component {
    constructor(props) {
        super(props);
        this.state = { copied: false };
        this.changeCopyState = this.changeCopyState.bind(this);
    }

    changeCopyState() {
        this.setState({ copied: true }, () => {
            setTimeout(() => this.setState({ copied: false }), 1500);
        })
    }

    render() {
        const {name, background, paletteId, id, showLink, classes} = this.props;

        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div className='ColorBox' style={{ background }}>
                    <div className={`copy-overlay ${this.state.copied && 'show'}`} style={{ background }} />
                    <div className={`copy-msg ${this.state.copied && 'show'}`}>
                        <h1 >COPIED</h1>
                        <p className={classes.colorText}>{background}</p>
                    </div>
                    <div className='copy-container'>
                        <div className='box-content'>
                            <span className={classes.colorName}>{name}</span>
                        </div>
                        <button className={`copy-button ${classes.button}`}>COPY</button>
                    </div>
                    {showLink && (
                        <Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation()}>
                            <span className={`see-more ${classes.button}`}>MORE</span>
                        </Link>
                    )}
                </div>
            </CopyToClipboard>
        );
    }
}

export default withStyles(styles)(ColorBox); 