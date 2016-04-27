import * as React from "react";
import {Component} from "react";
import {StatelessComponent} from "react";
import {Header} from "./";
require("../stylesheets/App.css");

interface AppProps {
  /* tslint:disable:no-any */
  children: Component<any, any>;
  /* tslint:enable */
};

export const App: StatelessComponent<AppProps> = ({children}) => (
  <div className="flex flex-column absolute"
    style={{height: "100%", width: "100%"}}>
    <Header/>
    {children}
  </div>
);
