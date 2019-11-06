import {useFetch} from './utils';
import * as d3 from 'd3';

export default () => {
    const data = useFetch('/rating-language') || null
    console.log(data)

    const margin = {top: 60, right: 30, bottom: 60, left: 60},
        width = 460*2 - margin.left - margin.right,
        height = 400*2 - margin.top - margin.bottom;
    
    const svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

    // Add X axis
    const x = d3.scaleLinear()
        .domain([0, 20])
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height + 40)
        .text("Number of Languages");

    // Add Y axis
    const y = d3.scaleLinear()
        .domain([0, 5])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", -50)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Average User Rating");

    // Add title
    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("text-decoration", "underline")
        .text("Ratings and Languages");

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