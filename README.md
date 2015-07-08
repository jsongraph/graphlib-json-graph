# graphlib-json-graph
Converts json-graph definitions into graphlib graphs.

```
npm install --save graphlib-json-graph
```

## Example

```javascript
var toGraph = require("graphlib-json-graph");

var graphDefinition = {
    graph: {
        label: "Example graph",
        nodes: [{
            id: "1"
        }, {
            id: "2"
        }],
        edges: [{
            id: "e1",
            directed: true,
            source: "1",
            target: "2"
        }]
    }
};

var graph = toGraph(graphDefinition);

graph.nodes(); // ["1", "2"]
graph.edges(); // {v: "1", w: "2"}
```

## API
The module exports one function: `toGraph(graphDefinition)`.

`graphDefinition` is supposed to be an object that conforms with the [json graph specification](https://github.com/jsongraph/json-graph-specification#graphs-object).

The function returns either one, or a list of [graphlib graphs](https://github.com/cpettitt/graphlib/wiki).

The distinction is based on whether you have a `graphs` property or a `graph` property.

## Notes
- The graph is set to be a `multigraph` by default to support multiple edges that point to the same nodes
- If you do have multiple edges that connect the same nodes, you must provide an `id` property for them so that you can [differentiate them by name](https://github.com/cpettitt/graphlib/wiki/API-Reference#multigraphs)
- the `labels` for the nodes and edges in the graph are set to the objects in the definition JSON

## Testing
Is based on [mochajs](http://mochajs.org/)
- Clone the repo
- `npm install`
- `npm test`

## Contributing

Feel free to [raise an issue](https://github.com/jsongraph/graphlib-json-graph/issues) or [submit a pull request](https://github.com/jsongraph/graphlib-json-graph/pulls)

In terms of styling, please use tabs for indentation
