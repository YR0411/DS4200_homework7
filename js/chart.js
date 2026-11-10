// D3 horizontal bar chart: what I make (rough estimates, edit the numbers to match yours)
(function () {
  var container = document.getElementById("chart");
  if (!container || typeof d3 === "undefined") {
    if (container) {
      container.textContent = "The chart could not load. Cookies 8, other dinners 7, other desserts 6, cheesecakes 5, pasta dishes 4.";
    }
    return;
  }

  var data = [
    { type: "Cookies", count: 8 },
    { type: "Other dinners", count: 7 },
    { type: "Other desserts", count: 6 },
    { type: "Cheesecakes", count: 5 },
    { type: "Pasta dishes", count: 4 }
  ];

  var width = 640;
  var barHeight = 44;
  var margin = { top: 10, right: 40, bottom: 36, left: 130 };
  var height = margin.top + margin.bottom + barHeight * data.length;

  var svg = d3.select(container)
    .append("svg")
    .attr("viewBox", "0 0 " + width + " " + height)
    .attr("preserveAspectRatio", "xMidYMid meet")
    .attr("aria-hidden", "true");

  var x = d3.scaleLinear()
    .domain([0, d3.max(data, function (d) { return d.count; })])
    .nice()
    .range([margin.left, width - margin.right]);

  var y = d3.scaleBand()
    .domain(data.map(function (d) { return d.type; }))
    .range([margin.top, height - margin.bottom])
    .padding(0.25);

  // Bars
  svg.append("g")
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("x", x(0))
    .attr("y", function (d) { return y(d.type); })
    .attr("height", y.bandwidth())
    .attr("width", 0)
    .attr("rx", 4)
    .attr("fill", function (d, i) { return i === 0 ? "#8a4b22" : "#1f5c5a"; })
    .transition()
    .duration(700)
    .attr("width", function (d) { return x(d.count) - x(0); });

  // Value labels
  svg.append("g")
    .selectAll("text")
    .data(data)
    .join("text")
    .attr("x", function (d) { return x(d.count) + 8; })
    .attr("y", function (d) { return y(d.type) + y.bandwidth() / 2; })
    .attr("dy", "0.35em")
    .attr("fill", "#1b2a2f")
    .style("font-family", "Bricolage Grotesque, Arial, sans-serif")
    .style("font-weight", "700")
    .style("font-size", "16px")
    .text(function (d) { return d.count; });

  // Category axis (left)
  svg.append("g")
    .attr("transform", "translate(" + margin.left + ",0)")
    .call(d3.axisLeft(y).tickSize(0))
    .call(function (g) { g.select(".domain").attr("stroke", "#1b2a2f"); })
    .selectAll("text")
    .style("font-family", "Bricolage Grotesque, Arial, sans-serif")
    .style("font-size", "15px")
    .attr("dx", "-6");

  // Count axis (bottom)
  svg.append("g")
    .attr("transform", "translate(0," + (height - margin.bottom) + ")")
    .call(d3.axisBottom(x).ticks(5).tickSizeOuter(0))
    .selectAll("text")
    .style("font-size", "13px");
})();
