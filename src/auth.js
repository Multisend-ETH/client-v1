import React from 'react';
import {Route, Redirect } from 'react-router-dom';
import { withContext } from "./provider/index";

const RestrictedRoute = ({component: Component, ctx, ...rest}) => 
    <Route
    {...rest}
    render={props =>
      ctx.auth
        ? <Component {...props} />
        : <Redirect
          to={{
            pathname: 'connect',
          }}
        />}
  />;


  export default withContext(RestrictedRoute)
