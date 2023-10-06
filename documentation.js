//* fonts family
//? primary fonts will be used for the logo of the website ---this has been changed
//? secondary fonts will be used for the navigation links and contents of the website
//? tertiary will  be used for page headers

// 16px equal 1 rem


//* Styles
//important------------------------> Styles explained

//note----> max-width of 1400px is set for the main content

//important------------------------> Files Explanation

//?---------------     index.js     ---------------//?
//note------>The code in this file uses React Router to manage routing.
//note       The BrowserRouter component is used to wrap the entire application,
//note       and the AppContextProvider and AuthContextProvider components are used
//note       to provide context to the application. The App component is the main
//note       component of the application, and it renders the application's UI.
//note       The AppContextProvider component provides access to the application's state,
//note       and the AuthContextProvider component provides access to the application's
//note       authentication state. The App component uses these contexts to render the
//note       application's UI. The index.css file contains the application's CSS styles.

//?---------------     App.js     ---------------//?
//note------>The code in this file renders a Layout component.
//note       The Layout component is a custom component that we have created, and it provides
//note       a common layout for our application. The App component renders the Layout component,
//note       and it does not contain any other content.
//note       The App.css file contains the application's CSS styles.

//?----------    AppContextProvider.js  ----------//?
//note------>The code provides a context for the application's mode and components.
//note       The context is provided to child components through the AppContextProvider component.
//note       The AppContext component has the following properties:
//important  appMode: The application's mode, which contains the theme and other properties.
//note       The theme can be either light-default or dark-default.
//important  onChangeAppMode: A function that is called when the application's mode changes.
//important  lastLocation: The last location that the user was at.
//important  onSetLastLocation: A function that is called when the user changes their location.
//important  componentsIsActive: An object that contains information about whether or not the application's
//note       components are active.
//important  onToggleComponentsIsActive: A function that is called when the user toggles the visibility
//note       of an application component.
//note       The AppContextProvider component can be used to provide the context to any child component.
//note       Child components can access the context through the useContext hook.

//?----------    app-context.js  ----------//?
//note------>The code provides access to the application's pop-up, location, mode, components,
//note       and onToggleComponentsIsActive properties.
//note       The context can be used by any component that imports it.
//note       The AppContext context has the following properties:
//important  popUp: An object that contains information about the application's pop-up.
//important  onPopUp: A function that is called when the application's pop-up is opened.
//important  lastLocation: The last location that the user was at.
//important  onSetLastLocation: A function that is called when the user changes their location.
//important  appMode: An object that contains information about the application's mode.
//important  onChangeAppMode: A function that is called when the application's mode changes.
//important  componentsIsActive: An object that contains information about whether or not the application's
//note       components are active.
//important  onToggleComponentsIsActive: A function that is called when the user toggles the visibility of
//note       an application component.
//note        To use the AppContext context, a component can import it and then use the
//note        useContext hook to access the context's properties. For example:

