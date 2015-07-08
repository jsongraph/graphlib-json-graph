var assert = require("chai").assert;
var toGraph = require("../");

describe("toGraph()", function() {
	var defaultGraph = {
		graph: {
			nodes: [{
				id: "1"
			}, {
				id: "2"
			}],
			edges: [{
				source: "1",
				target: "2"
			}]
		}
	};

	it("should be able to parse a single graph", function() {
		var graph = toGraph(defaultGraph);
	});

	it("should be able to parse multiple graphs", function() {
		var graphs = toGraph({
			graphs: [defaultGraph, defaultGraph, defaultGraph]
		});

		assert.lengthOf(graphs, 3, "parsed three graphs");
	});

	it("should throw an error if there are no graphs", function(done) {
		try {
			toGraph({});
		} catch (e) {
			done();
		}
	});

	it("should support graphs without edges", function() {
		toGraph({
			graph: {
				nodes: [{
					id: 1
				}]
			}
		});
	});

	it("should support graphs without nodes", function() {
		toGraph({
			graph: {}
		});
	});

	it("should respect the directed property of a graph", function() {
		assert.notOk(toGraph({
			graph: {
				directed: false
			}
		}).isDirected(), "Graph is not directed");

		assert.ok(toGraph({
			graph: {
				directed: true
			}
		}).isDirected(), "Graph is directed");
	});

	it("should make a graph directed if any of the edges are directed", function() {
		assert.ok(toGraph({
			graph: {
				nodes: [{
					id: "1"
				}, {
					id: "2"
				}],
				edges: [{
					directed: true,
					source: 1,
					target: 1
				}]
			}
		}).isDirected(), "Graph is directed");
	});

	it("should be a multigraph", function() {
		assert.ok(toGraph(defaultGraph).isMultigraph(), "Is a multigraph")
	});

	it("should use the id for distinguishing edges between the same nodes", function() {
		var graph = toGraph({
			graph: {
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
				}, {
					id: "e2",
					directed: true,
					source: "1",
					target: "2"
				}]
			}
		});

		var e1 = graph.edge("1", "2", "e1");
		var e2 = graph.edge("1", "2", "e2");

		assert.notEqual(e1, e2, "Edges were different")
	});
});
