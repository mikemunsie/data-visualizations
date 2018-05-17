<template>
  <div class='container'>
    <svg width="960" height="500"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3';

const data = [
  { "letter": "A", "frequency": .08167 },
  { "letter": "B", "frequency":	.01492 },
  { "letter": "C", "frequency":	.02782 },
  { "letter": "D", "frequency":	.04253 },
  { "letter": "E", "frequency":	.12702 },
  { "letter": "F", "frequency":	.02288 },
  { "letter": "G", "frequency":	.02015 },
  { "letter": "H", "frequency":	.06094 },
  { "letter": "I", "frequency":	.06966 },
  { "letter": "J", "frequency":	.00153 },
  { "letter": "K", "frequency":	.00772 },
  { "letter": "L", "frequency":	.04025 },
  { "letter": "M", "frequency":	.02406 },
  { "letter": "N", "frequency":	.06749 },
  { "letter": "O", "frequency":	.07507 },
  { "letter": "P", "frequency":	.01929 },
  { "letter": "Q", "frequency":	.00095 },
  { "letter": "R", "frequency":	.05987 },
  { "letter": "S", "frequency":	.06327 },
  { "letter": "T", "frequency":	.09056 },
  { "letter": "U", "frequency":	.02758 },
  { "letter": "V", "frequency":	.00978 },
  { "letter": "W", "frequency":	.02360 },
  { "letter": "X", "frequency":	.00150 },
  { "letter": "Y", "frequency":	.01974 },
  { "letter": "Z", "frequency":	.00074 }
];

export default {
  mounted() {
    const svg = d3.select("svg");
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = parseInt(svg.attr("width")) - margin.left - margin.right;
    const height = parseInt(svg.attr("height")) - margin.top - margin.bottom;
    const xScale = d3.scaleBand().rangeRound([0, width]).padding(0.1);
    const yScale = d3.scaleLinear().rangeRound([height, 0]);
    const g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    xScale.domain(data.map((d) => d.letter));
    yScale.domain([0, d3.max(data, (d) => d.frequency )]);

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale));

    g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(yScale).ticks(10, "%"))

    g.selectAll(".bar")
      .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", (d) => xScale(d.letter))
        .attr("y", (d) => yScale(d.frequency))
        .attr("width", xScale.bandwidth())
        .attr("height", (d) => height - yScale(d.frequency));
  }
}
</script>

<style>
.bar {
  fill: steelblue;
}

.bar:hover {
  fill: brown;
}

</style>
