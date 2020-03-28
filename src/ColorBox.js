import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';
import './ColorBox.css';

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
        const {name, background, paletteId, id, showLink} = this.props;

        function textColor() {
            let luminocity = chroma(background).luminance();
            if (luminocity > 0.50) {
                return 'dark-text'
            } else if (luminocity < 0.08){
                return 'white-text'
            }
        }

        return (
            <CopyToClipboard text={background} onCopy={this.changeCopyState}>
                <div className='ColorBox' style={{ background }}>
                    <div className={`copy-overlay ${this.state.copied && 'show'}`} style={{ background }} />
                    <div className={`copy-msg ${this.state.copied && 'show'}`}>
                        <h1 >COPIED</h1>
                        <p className={textColor()}>{background}</p>
                    </div>
                    <div className='copy-container'>
                        <div className='box-content'>
                            <span className={textColor()}>{name}</span>
                        </div>
                        <button className={`copy-button ${textColor()}`}>COPY</button>
                    </div>
                    {showLink && (
                        <Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation()}>
                            <span className={`see-more ${textColor()}`}>MORE</span>
                        </Link>
                    )}
                </div>
            </CopyToClipboard>
        );
    }
}

export default ColorBox; 