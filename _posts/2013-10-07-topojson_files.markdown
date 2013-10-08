---
layout: default
title: Understanding TopoJSON
---

The Project Linework file types are all useful in their own way. [TopoJSON](http://en.wikipedia.org/wiki/Topojson) is an extension of GeoJSON created by Mike Bostock that creates its geometry through shared topology. TopoJSON files effectively reduce redundancy by only recording a shared point once instead of multiple times for multiple polygons within the file. Bostock explains it best:

>TopoJSON is an extension of GeoJSON that encodes topology. Rather than representing geometries discretely, geometries in TopoJSON files are stitched together from shared line segments called arcs. TopoJSON eliminates redundancy, offering much more compact representations of geometry than with GeoJSON; typical TopoJSON files are 80% smaller than their GeoJSON equivalents.

So, TopoJSON files are smaller, which is great! Most people will use these files in accordance with the [d3.js](http://d3js.org) visualization library. See an example of Project Linework TopoJSONs in action.

With this simplification process, it is important to understand your own map and needs. Project Linework's TopoJSON files are all [quantized](https://github.com/mbostock/topojson/wiki/Command-Line-Reference#quantization) at **magnitude of 1e5** so the map can render at full detail in greater zoom levels. If you do not plan to make use of portions of your data at high zoom levels, look into [installing](https://github.com/mbostock/topojson/wiki/Installation) and [converting](https://github.com/mbostock/topojson/wiki/Command-Line-Reference) to TopoJSON at lower quantization levels to reduce file size.