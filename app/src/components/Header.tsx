import * as React from "react";
import {StatelessComponent} from "react";
import {Link} from "react-router";
const logo = require("../assets/logo_white.svg");

export const Header: StatelessComponent<{}> = () => (
  <nav className="flex bg-blue flex-none items-center">
    <ul className="list-reset mb0">
      <li key="logo" className="inline-block mr1 align-middle">
        <img className="block mx-auto" height="32" src={logo}/>
      </li>
      <li key="collection" className="inline-block mr1">
        <Link to="/collection" className="btn silver" activeClassName="white">
          <i className="fa fa-music mr1"></i>
          <span className="xs-hide">Collection</span>
        </Link>
      </li>
      <li key="settings" className="inline-block mr1">
        <Link to="/settings" className="btn silver" activeClassName="white">
          <i className="fa fa-cog mr1"></i>
          <span className="xs-hide">Settings</span>
        </Link>
      </li>
    </ul>
  </nav>
);
