var graphlib = require("graphlib");
var par = require("par");
var prop = require("prop");

var Graph = graphlib.Graph;

module.exports = toGraph;

function toGraph(json) {
	var graphDefinitions = json.graphs;

	if (graphDefinitions) return graphDefinitions.map(makeGraph);

	var graphDefinition = json.graph;

	if (graphDefinition)
		return makeGraph(graphDefinition);

	throw new TypeError("No graphs defined");
}

function makeGraph(graphDefinition) {
	var nodes = graphDefinition.nodes || [];
	var edges = graphDefinition.edges || [];

	var directed = graphDefinition.directed || edges.some(prop("directed"));

	var graph = new Graph({
		directed: directed,
		multigraph: true
	});

	nodes.forEach(par(addNode, graph));
	edges.forEach(par(addEdge, graph));

	return graph;
}

function addNode(graph, node) {
	var id = node.id;
	graph.setNode(id, node);
}

function addEdge(graph, edge) {
	var source = edge.source;
	var target = edge.target;
	var id = edge.id;
	graph.setEdge(source, target, edge, label);
}
