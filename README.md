** _This Readme is in progress_ **

# NBRLY

Our group's final project for the Manchester Codes Software Engineering Fast Track course.

NBRLY connects you to people in your vicinity so you can find like-minded folk to have fun with.

---

## Tech Stack

**Front End**

- React: functional components + hooks

  _Packages_

- React Router
- Styled Components

**Backend**

- Firebase: authentication, storage bucket and firestore

**Reasoning**

We had all completed several bootcamp projects using React and wanted to now test our React skills without the course guides. Also, given the time constraints it made sense to use something we were familiar with. We had just learnt about styled components and liked how this approach tends towards modularity.

While we chose React for its familiarity, we chose Firebase in order to explore something new that we might want to use again for personal projects. And with an eye on the time we had been given for this project (2-3 weeks), we hoped Firebase would simplify creating and accessing a database and user authentication.

---

## Our Approach

We collaborated at every stage. We started off with divided out tasks - Hal and Robin came up with the designs in Figma while I invesitgated backend options. But we soon decided we would learn more if we are all involved in every part of the project and so we did most of the coding together over Zoom, alternating who was in the driving seat.

In the planning stage we wrote user stories and drew component maps. Throughout, we used Trello to break tasks into tickets and categorize them according to priority. We used Notion for shared notes and resources, like links to helpful articles and videos.

---

## Reflections and key learnings

### React

**Higher-Order Components**

A higher-order component is one that takes in another component and returns a component. We implemented this pattern with the `withAuth` component to only allow users who are signed in to access the profiles of other users and the home page. Others not signed in are re-directed back to the login page if they try to access the protected pages.

`withAuth` takes in a component, checks if the user is signed in and returns either the requested component or react router's `Redirect` component which sends the user back to the login page.

`withAuth` is then called where we export the component we want to have restricted access to, for example in Profile.js: `export default withAuth(Profile)`.

One gotcha we ran into was that we didn't pass props into our HOC and so of course all our props were received as undefined. When creating a HOC, the HOC receives a _Component_ and the component defined inside the HOC receives the _props_ of that passed in component:

```javascript
// pass Component to withAuth
const withAuth = (Component) => {
  //pass props to the component we will return
  const AuthRoute = (props) => {
    const { currentUser } = useAuth();
    if (currentUser) {
      // spread props in requested component if user is signed in
      return <Component {...props} />;
    } else {
      return <Redirect to="/" />;
    }
  };
  return AuthRoute;
};
export default withAuth;
```

**React Context**

At one point, we had all our auth related values and functions in `App.js`. With some research, we learnt that we could separate this out into a _context_ and access the current user, login and logout functions anywhere in the app without passing them as props.

---

## Authors

Anna Balquin  
[Robin Edwards](https://github.com/ro8inro8in)  
[Hal Fulcher](https://github.com/HalFulcher)
