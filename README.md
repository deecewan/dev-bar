# dev-bar

> A toolbar to connect your server to React

![image](https://cloud.githubusercontent.com/assets/4755785/19855680/9510589a-9fc1-11e6-9a54-3112a2055b59.png)

The toolbar shows a few key stats out of the box.  If you're using express as a backend, you'll 
automatically get the request time (`req`) and response time (`res`).  This one is probably less
helpful, but it's there.  Also included by default is the currently checked out git branch.

## Usage

### Getting Started

Install with `yarn add dev-bar` or `npm install --save dev-bar`.

### React

Import the component, and add it to your root component.  It can go anywhere, but inside `App` is probably more semantic.

```jsx
import { DevToolbar } from 'dev-bar';
...

export default props => {
  <div>
    <p>My Cool App</p>
    <DevToolbar />
  </div>
}
```

To not include the entire package in your client (until treeshaking gets better in webpack), you can also do 

```js
import DevToolbar from 'dev-bar/dist/DevToolbar';
```

### Express

The toolbar exposes a pretty basic middleware on the express side.

```js
import { middleware as devToolbarMiddleware } from 'dev-bar';
...

const app = express();
app.use(devToolbarMiddleware());
```

Similarly to above, you can import this directly to reduce the size of your dependencies, but this shouldn't make too much different on a server.

```js
import devToolbarMiddleware from 'dev-bar/dist/middleware';
```

To add your own values, pass an object into the middleware.  You can either pass in raw values, or functions.  One day soon, promises, too.  If you want to get things out of the req or res, they're passed into your functions.

```js
app.use(devToolbarMiddleware({
  loggedIn: req => !!req.user,
  apiVersion: 2,
}));
```

This will add `loggedIn: true / apiVersion: 2` to your toolbar.  Any values that exist as null or undefined will show up as 'undefined'.

### Not using Express?

You can use whatever backend you like, but you'll need to implement the socket connection yourself.
The default port is 3001. If you want a different port, pass in a `port` prop to the Toolbar component.  You just need to emit an object under 'devUpdate'.  Each key in the object will become a key in the toolbar.  Keep it light.

To bind your socket to a different port, i.e. `http://localhost:8080`:
```jsx
// import the DevToolbar component
<DevToolbar port={8080} />
```

Alternatively, if you want to specify a different URL completely, pass in the `url` prop.  Note: this will override the port, if any is passed in.