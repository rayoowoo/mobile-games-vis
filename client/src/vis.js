import {useFetch} from './utils';
import * as d3 from 'd3';

export default () => {
    const data = useFetch('/rating-language') || null
    console.log(data)

    const margin = {top: 10, right: 30, bottom: 30, left: 60},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
    
    const svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

    const x = d3.scaleLinear()
        .domain([0, 20])
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLinear()
        .domain([0, 5])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    if (data) {
        svg.append('g')
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return x(d['Language Count']); })
            .attr("cy", function (d) { return y(d['Average User Rating']); })
            .attr("r", 1.5)
            .style("fill", "#69b3a2")
    }

    return null
    
}