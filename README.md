
## mele

Simple, zero configuration GraphQL server. mele gets out of the way so there is no bootstrapping, or initialization needed.

### Getting Started
Getting started with mele is incredibly simple.

Install mele with ```yarn add mele```

Create two directories, one named ```types```, and another named ```resolvers```.

In the types directory, create a file called ```Query.graphql``` and save it with the following contents.

```
type Query {
    greeting: String
}
```

In the resolvers directory, create file called ```Query.js``` with the following contents:

```
module.exports {
    greeting: () => 'Hello!',
}
```

Now, in your ```package.json```, add the following:

```
...
"scripts": {
    "start": "mele",
    "dev": "mele dev"
}
...
```

Run ```yarn start```. Boom! Wasn't that easy? You now have a GraphQL server running. Visit ```localhost:4000``` and query away.
