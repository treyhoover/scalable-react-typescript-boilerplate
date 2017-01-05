import * as React from 'react';
import * as AppActionCreators from './actions';
import { NavBar, Footer, Header, Paragraph, SvgIcon, Anchor } from 'components';
const connect = require('react-redux').connect;
const bindActionCreators = require('redux').bindActionCreators;
import { Author, Main } from './styles';

interface IAppProps extends React.Props<any> {
  children: any;
  actions: {
    appSetMobile: (isMobile: boolean) => void,
  };
  isMobile: boolean;
  navLinks: Array<{ url: string, text: string }>;
  logoText: string;
};

const mapStateToProps = (state) => ({
  isMobile: state.app.isMobile,
  navLinks: state.app.navLinks,
  logoText: state.app.logoText,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    AppActionCreators,
    dispatch,
  ),
});

class App extends React.Component<IAppProps, any> {
  constructor() {
    super();
    this.handleMobile = this.handleMobile.bind(this);
  }
  public componentDidMount() {
    if (window) {
      window.addEventListener('resize', this.handleMobile);
    }
  }
  public componentWillUnmount() {
    if (window) {
      window.removeEventListener('resize', this.handleMobile);
    }
  }
  private handleMobile() {
    const isMobile = window.innerWidth <= 768;
    if (isMobile !== this.props.isMobile) {
      this.props.actions.appSetMobile(isMobile);
    }
  }
  public render() {
    return (
      <Main>
        <NavBar
          links={this.props.navLinks}
          logoText={this.props.logoText}
        />
        {React.cloneElement(this.props.children, this.props)}
        <Footer>
          <Header>
            React + TypeScript
          </Header>
          <Paragraph>
            Scalable React TS Boilerplate
          </Paragraph>
          <Author>
            <span>By </span>
            <Anchor color="#007acc" href="http://www.ryancollins.io/">Ryan C. Collins</Anchor>
          </Author>
          <Anchor href="https://github.com/RyanCCollins/scalable-react-ts-boilerplate">
            <SvgIcon style={{ height: 35, width: 35, fill: 'white' }} viewBox="0 0 1792 1792">
              <path // tslint:disable-next-line
                d="M1664 896q0 251-146.5 451.5t-378.5 277.5q-27 5-39.5-7t-12.5-30v-211q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-121-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-86-13.5q-44 113-7 204-79 85-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-40 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 89t.5 54q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"
              />
            </SvgIcon>
          </Anchor>
        </Footer>
      </Main>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
