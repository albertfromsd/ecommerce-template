# eCommerceSite Activity Log and Notes
-----------------------------------------------------------------------------------------

[ Developed by ] **Albert Ahn** ('albertfromsd')

[ Start date ] 2020-05

-----------------------------------------------------------------------------------------


[ Activity Log / Notes ]
-----------------------------------------------------------------------------------------

**[ 2020-06-17 ]** ( Random Bug Fixes )
- Google login popup via Firebase closing immediately on deployed version to Heroku; fixed by adding Heroku domain to registered domains
- Improved Lighthouse performance from 27 to 76 by implementing compression library in server.js, but 76 is still too low
* React-stripe-checkout was not functional on localhost, but works after deployed to Heroku. Why? guessing something to do with cors setup or firewall, but not sure. Investigate later


**[ 2020-06-10 ]** ( PWA )
- ( manifest.json ): added 512x512 and 192x192 pngs
- ( index.js ): serviceWorker.register()
* ( server.js ): app.get('/serviceworker.js'......) Review this portion. Might need to change service-worker.js to match the name of the serviceWorker.js file in /src
  - added the express-sslify enforce with enforce.HTTPS to ensure request was sent through https. enforce allows checking of protoheader on sites that use reverse proxies, which make it harder to detect.
* ( LightHouse Test ): test gave a performance rating of 23%. Why???
 






**[ 2020-06-09 ]** ( React Lazy / Dynamic Imports / Code Splitting / Error Boundary )
- Looking into splitting code chunk download for a typical client on an deployed site
- Instead of client being forced to download entire code, they will only have to download the portions that are using at that time, while being cached in local memory as the sections of the site are being used
- Leveraging Dynamic import syntax; which behaves like a promise
  - Gets included because of a babel configuration
- 'lazy' comes from react library. Import { lazy } from react, or just use React.lazy
- Also will need { Suspense } to make sure asynchronous components gets rendered
  - Before implemented Suspense wrapper component, the first page I tried to implement this one just showed up as a blank page
- { Suspense } must take a fallback property in its component props, which acts like a loading message


- [ ECommerceApp.js ] - Wrapped most of the views in <Suspense> tags, all inside the <Switch>
- [ ShopPage.js ] - Wrapped entire return in Suspense with newly created Spinner component
  - Spinner is now replacing WithSpinner HOCs, no longer any need for isLoading or hasLoaded to be passed in as props to Collections components/views in this file    


[ ErrorBoundary.js ] - a class component that provies a way to write a unique component that will be similar to Suspense, but acts as an error catcher, whereas suspense is more a pending loading component
  - Needs to be class component bc of need for access to the life cycle methods
  - ( static getDerivedStateFromError( error ) ) - catches any error inside any of the children components of the ErrorBoundary component
  - Wrap the components that may need the error catcher
  - ( componentDidCatch( error, info ) ) - another lifecycle method that indicates it is an ErrorBoundary
    - gives us access to the error and info when error happens
    - info usually tells us which component threw the error
    - wrap everything from Suspense to end of Suspense tags


[ React Memo ] - memoizes FUNCTIONAL components to prevent excessive re rendering
 - implemented in CartItem.js to prevent update of all items each time a single item is added
 - Memoizes on shallow comparisons of object by REFERENCE
   - If you are passing in an object reference in as props, it will save time
   - If you are passing in an object instntiated directly in as props, a new object will get generated everytime, so it will not prevent the rerender. Remember that in JS, arrays and functions are also objects, so inline passing of those objects will trigger the same undesirable behavior
 - Functional components always rerender when the parent component rerenders. It is essentially being called/invoked whenever the parent component renders
 - React Memo actually makes the initial render of components take longer because of the need to memoize, but memoization makes up for it during subsequent page loads
- if you have components that don't take in props, do not change state, or need lifecycle methods, there is no need to memoize them
- [ React.PureComponent ] is the equivalent for CLASS components, and is essentially the same as implementing shouldComponentUpdate under the hood


[ Set ] - similar to an array, but only allows values to get pushed in as long as the new value is unique from all the existing values in the set
 - const setsExample = new Set();
 - setsExample.add( newValue );


[ useCallback ] - (#255) - used in functional components ( like useState or useEffect). Useful for memoizing FUNCTIONS, and allows us to memoize a function we wrap in it and use that same function if it already exists, instead of invoking it everytime the component rerenders
 - It takes in two arguments: first is the function we want to memoize, and the second is an array of dependencies just like useEffect. but the array is required when using useCallback.
 - const tempFunction = useCallback( () => console.log( "blahblahblah" ), [ listOfDependencies ] );
 - setsExample.add( tempFunction );
 - will now memoize the tempFunction in setsExample and prevent duplication of mirrored functions, reducing the amount of time the component needs to rerender
 - 


 [ useMemo ] - (#256) - similar to useCallback. Useful for memoizing funciton OUTPUT VALUES. 
 - useMemo to caches a function that does something 'complex', being defined as something that takes up a lot of performance resources from the browser
 - also needs a dependency array; usually variables that are involved in the function's calculations
 - memoizes the output of the function wrapppepemd in useMemo

-----------------------------------------------------------------------------------------

**[ 2020-06-08 ]** ( Contact / About Section )
 - Added minimal styling and skeletal framework for pending text additions of about
   - About section will hold information about my educational background
   - Professional background and work history
   - What led me to change career paths to coding
   - Strengths / Weaknesses
   - Obstacles overcame and things that were the hardest for me to learn
   - Why I love my decision to enter the coding industry
 - Planted dead ahref links for resume
   - Simple will eventually link to an actual 1-page professional resume
   - In-depth with chronicle deep details of each project

-----------------------------------------------------------------------------------------

**[ 2020-06-04 ]** ( Mobile Responsiveness )
- Began by creating styled component GlobalStyle for main eCommerceApp.js
  - ( ECommerceApp.js ) - Imports styles over from SASS and apply them globally by including <GlobalStyle/> at top of return div
- in SCSS/Styled components: added @media screen
- implemented display: grid in CollectionsPreview
  - grid-template-columns: 1fr 1fr;
  - grid-gap: 15px;
- converted Collections page to be mobile responsive
  - media screen in parent div (collection-page) align-items center
  - then media screen inside items class to display grid, grid-template-columns, and grid-gap similar to the way it was done on collections preview component

[ Review ]
- display: grid for first time
  - grid-template-columns: 1fr 1fr;
  - grid-gap: 15px;

-----------------------------------------------------------------------------------------

**[ 2020-06-04 ]** ( GraphQL )
- GraphQL: a server language that wraps around an existing database or server that you can make requests against in a different way
- Minimizes the changes of making extraneous fetch requests; can customize the information/props we want to access
- Was done in a fork as an experiment to evaluate against redux
- Verdict: redux architecture is more structured and grandfathered into many existing companies' code structure. Not worth exhausting limited time to fully convert to GraphQL and Apollo

[ Bugs / Fixes ]
- When trying to implement GraphQL with a fork of a previous version of the main eCommerceApp, either reselect's memoization or redux-persist insisted on the variable name to match the name from the previous state. I had to change the variable name in the state (items => cartItems ) to reflect the variable name from the previous run of the project. 
- When I tried to start work on my actual project version, the same thing happened where 'reduce' was not a property of the cartItems array. Temp fix by doing the same thing as above, but should figure out how to manually change or clear the state to avoid this issue in the future.

-----------------------------------------------------------------------------------------

**[ 2020-06-04 ]** ( Server set up)
- app.use( bodyParser.json() ): used to convert incoming requests into json format
- app.use( bodyParser.urlencoded({ extended: true }) ): url encoded makes sure the url strings coming in and out do not include illegal characters
- heroku config:set STRIPE_SECRET_KEY=`enter key here without ''`

[ Review ]
- app.use( express.stats( path.join(__dirname, 'client/build') ) )
 - a middle ware function that allows us to serve a certain file inside this url path. The path and dirname is from ('path')
- app.get tells the program which rest parameters we are sending in (post, put, get, etc...)
- ( server.js ) if( process.env.NODE_ENV === 'production' ) { // if we're in production (build)
  app.use( express.static( path.join(__dirname, 'client/build' ) ) ); 
  - // use express.static middle ware function allows us to serve a certain file inside this url path, //path comes from 'path'

  app.get('*', function( req, res ) { // get request is being made, we send it our static files
  res.sendFile( path.join(__dirname, 'client/build', 'index.html') );  });  };
  - // ^base index.html file will get produced when we run build
  - // will redirect get requests to client/build
- stripe payment handling (server.js):
  - app.post('/payment', (req, res) => {
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'usd' };

    stripe.charges.create( body, (stripeErr, stripeRes) => {
        if( stripeErr ) res.status(500).send({ error: stripeErr });
        else res.status(200).send({ success: stripeRes });  } );
    });
  - adding client side payment sync with server side '/payment' route handling
  - added axios library in client side

[ Bugs / *Fixes ]
- git push heroku master: not working because it doesn't detect a language
  - Probably because the server.js file is inside /server folder 
  - Tried to move server.js to root folder and the push to heroku master went smoothly in terminal, but am seeing 404 not found on after running heroku open

-----------------------------------------------------------------------------------------

**[ 2020-06-02 ]** ( Sagas )
 - Beginning of implementation of redux-saga to handle async calls concurrently in a way that does not block execution

[ Review ]
 - ( #186 ): Implemented saga yield, takeEvery, call, put... still need to review and reinforce these concepts
   - differences between 'take' and 'takeEvery' is that take uses a standard generator function; 
   - 'takeEvery' kicks off a new task using the generator we passed through it for every increment action that comes in
   - 'takeLatest' will cancel all the firings of the function during the time delay except for the last one in that delay window; so more appropriate for API calls to a DB
 - takeEvery (redux-saga/effects) creates a non-blocking call in order to prevent app from stopping bc of a pending api call
   - also able to cancel certain tasks under specific conditions i.e. if fetchCollections get fired again before first fire completed, the first call will get cancelled.
   - yield all allows for [ ...multiple sagas ] to be listened for instead of having to run each one manually in separate lines
   
[ Bugs / *Fixes]
 - ( Register.js (~L40) ): registerStart( email, password, displayName ) was only passing in the first argument to redux and saga. - * To work around that, I encapsulated the three arguments into a single object with self-defined variables
   - registerStart( { email, password, displayName } )

-----------------------------------------------------------------------------------------