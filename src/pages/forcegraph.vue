<template>
  <div id='app'>
    <div class='graph-container'>
      <svg viewBox='0 0 1024 768' preserveAspectRatio="xMidYMid meet"></svg>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3';
import jsonResponse from '@/nodes';

const colors = {
  healthy: 'rgb(99, 220, 169)',
  unhealthy: 'rgb(217, 36, 41)'
}

const convertResponseIntoNodes = (response) => {

  // Nodes are the machines
  const nodes = Object.keys(response.all_machines).map((ip, index) => {
    return {
      id: ip,
      data: response.all_machines[ip],
      fill: Math.random() > .5 ? colors.healthy : colors.unhealthy
    }
  });

  // Links show the nodes + relationships
  const links = response.matched_connections.map((connection) => {
    return {
      source: connection.host_ip,
      target: connection.remote_ip,
      ...connection
    };
  });

  return { nodes, links }
};

function getChildren(graph, parent) {
  const children = [];
  graph.links.forEach((link) => {
    if (link.source.id === parent) {
      children.push(link);
    }
  });
  return children;
}

const graph = convertResponseIntoNodes(jsonResponse);

function draw() {
  const svg = d3.select('svg');
  const width = 1024;
  const height = 768;
  const nodeSize = 7;

  const simulation = d3.forceSimulation()
    .force('link', d3.forceLink()
      .id((d) => d.id)
      .distance(100)
    )
    .force('charge', d3.forceManyBody())
    .force('center', d3.forceCenter(width / 2, height / 2))

  const links = svg.append('g')
    .attr('class', 'links')
    .selectAll('g')
    .data(graph.links)
    .enter();

  const nodes = svg.append('g')
    .attr('class', 'nodes')
    .selectAll('g')
    .data(graph.nodes)
    .enter();

  const connections = links.append('line');

  const machineLabels = nodes.append('g')
    .attr('class', 'node')
    .call(d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended));
  const machineLabels_textBg = machineLabels.append('rect');
  const machineLabels_text = machineLabels.append('text');
  const machineLabels_circle = machineLabels.append('circle');

  simulation
    .nodes(graph.nodes)
    .on('tick', tick);

  simulation.force('link')
    .links(graph.links);

  function tick() {
    connections
      .attr('class', 'line')
      .attr('x1', (d) => d.source.x)
      .attr('y1', (d) => d.source.y)
      .attr('x2', (d) => d.target.x)
      .attr('y2', (d) => d.target.y)
      .attr('stroke',(d) => {
        return d.source.fill;
      });

    machineLabels_circle
      .attr('r', nodeSize)
      .attr('fill', (d) => d.fill)
      .attr('cx', (d) => d.x)
      .attr('cy', (d) => d.y)

    machineLabels_text
      .attr('x', (d) => d.x + (nodeSize + 5))
      .attr('y', (d) => d.y + (nodeSize / 2))
      .text(({ data }) => data.name)
      .call(function (selection) {
        selection.each(function (d) {
          d.bbox = this.getBBox();
        })
      });

    machineLabels_textBg
      .attr('class', 'text-fill')
      .attr('x', (d) => d.bbox.x)
      .attr('y', (d) => d.bbox.y)
      .attr('width', (d) => d.bbox.width)
      .attr('height', (d) => d.bbox.height)
  }

  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
}

export default {
  name: 'App',
  mounted() {
    draw();
  }
}
</script>

<style>


svg {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
}

text {
  pointer-events: none;
  font-size: 10px;
  font-weight: 300;
  cursor: pointer;
}

.label {
  fill: #000;
}
.line {
  stroke-opacity: .5;
}
.node .text-fill {
  fill: #fff;
}

circle:hover {
  opacity: 1;
}
circle {
  stroke: #fff;
  opacity: .8;
  stroke-width: 1.5px;
}

</style>
