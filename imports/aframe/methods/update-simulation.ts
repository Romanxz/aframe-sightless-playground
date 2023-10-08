export function updateSimulation(simulation, graphData, oldNodes, oldEdges) {
    // Identify new nodes
    const newNodes = graphData.nodes.filter(newNode =>
      !oldNodes.current.some(oldNode => oldNode.id === newNode.id)
    );

    // Identify new edges
    const newEdges = graphData.edges.filter(newEdge =>
      !oldEdges.current.some(oldEdge => oldEdge.id === newEdge.id)
    );

    // Check if newNodes and newEdges are same as oldNodes and oldEdges
    if (newNodes.length === 0 && newEdges.length === 0) return;

    // Merge old nodes with new nodes
    const mergedNodes = [...oldNodes.current, ...newNodes];

    // Merge old edges with new edges
    const mergedEdges = [...oldEdges.current, ...newEdges];

    // Update the simulation
    simulation.nodes(mergedNodes);
    simulation.force('link').links(mergedEdges);

    // Update oldNodes and oldEdges for future comparisons
    oldNodes.current = mergedNodes;
    oldEdges.current = mergedEdges;

    // Uncomment the following line if you want to "reheat" the simulation
    // simulation.alpha(0.1)
  }