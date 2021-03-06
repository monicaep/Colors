import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Page from './Page';
import PaletteList from './PaletteList';
import NewPaletteForm from './NewPaletteForm';
import Palette from './Palette';
import SingleColorPalette from './SingleColorPalette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';

class App extends Component {
  constructor(props) {
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
    this.state = { palettes: savedPalettes || seedColors }
    this.findPalette = this.findPalette.bind(this);
    this.savePalette = this.savePalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
    this.syncLocalStorage = this.syncLocalStorage.bind(this);
  }

  findPalette(id) {
    return this.state.palettes.find(function(palette) {
      return palette.id === id
    });
  }

  savePalette(newPalette) {
    this.setState(
      { palettes: [...this.state.palettes, newPalette] }, 
      this.syncLocalStorage)
  }

  deletePalette(id) {
    this.setState(
      st => ({palettes: st.palettes.filter(palette => palette.id !== id)}),
      this.syncLocalStorage
    )
  }

  syncLocalStorage() {
    window.localStorage.setItem(
      "palettes", 
      JSON.stringify(this.state.palettes)
    );
  }

  render() {
    const { palettes } = this.state;
    
    return (
      <Route render={({location}) => (
        <TransitionGroup>
          <CSSTransition key={location.key} classNames='page' timeout={500}>
            <Switch location={location}>
              <Route 
                exact path='/' 
                render={(routeProps) => 
                  <Page>
                    <PaletteList 
                      palettes={palettes} 
                      deletePalette={this.deletePalette}
                      {...routeProps} 
                    />
                  </Page>
                } 
              />
              <Route 
                exact path='/palette/new'
                render={(routeProps) => 
                  <Page>
                    <NewPaletteForm 
                      savePalette={this.savePalette} 
                      palettes={palettes}
                      {...routeProps} 
                    />
                  </Page>
                }
              />
              <Route 
                exact path='/palette/:id' 
                render={(routeProps) => 
                  <Page>
                    <Palette 
                      palette={generatePalette(
                      this.findPalette(routeProps.match.params.id))} 
                    />
                  </Page>
                }
              />
              <Route 
                path='/palette/:paletteId/:colorId'
                render={(routeProps) => 
                  <Page>
                    <SingleColorPalette 
                      colorId={routeProps.match.params.colorId}
                      palette={generatePalette(
                      this.findPalette(routeProps.match.params.paletteId))} 
                    />
                  </Page>
                }
              />
              <Route 
                render={(routeProps) => 
                  <Page>
                    <PaletteList 
                      palettes={palettes} 
                      deletePalette={this.deletePalette}
                      {...routeProps} 
                    />
                  </Page>
                } 
              />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )} />
    );
  }
}

export default App;
