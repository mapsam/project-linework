Project Linework
================

Project Linework is a library of handcrafted vector linework for cartography, each one designed in a unique aesthetic style. It’s meant to break us away from the default line paths that we so often rely on by providing some more visually-interesting alternatives. Download the current files at [projectlinework.org](http://projectlinework.org/). [Learn more](http://projectlinework.org/about/) about Mr. Huffman's inspiration.

Linework is controlled in the `master` branch. [projectlinework.org](http://projectlinework.org/) is controlled in the `gh-pages` branch.

## Linework

* Angular, Dennis McClendon
* Charmingly Innacurate, [@pinakographos](https://github.com/pinakographos)
* Elmer Casual, [@omnitarian](https://github.com/omnitarian)
* Geo Metro, [@pinakographos](https://github.com/pinakographos)
* Liana, Sarah Bennett
* Moriarty Hand, [@dylanmoriarty](https://github.com/dylanmoriarty)
* Times Approximate, [@pinakographos](https://github.com/pinakographos)
* Twenty Seventy, [@omnitarian](https://github.com/omnitarian)
* Wargames, [@pinakographos](https://github.com/pinakographos)
* Weekend Update, [@jonahadkins](https://github.com/jonahadkins)

## What's included?

* **Illustrator**: projected to best fit extent, PDF & Inkscape compatible
* **Shapefiles**
* **GeoJSON**: using GDAL's `ogr2ogr`
* **TopoJSON**: quantization [magnitude of 1e5](http://www.projectlinework.org/2013/10/07/topojson_files.html)

Geographic Data (not included in all sets):

* Admin0 Poly/Line, Admin1 Poly/Line, Streams, Lakes, Waterbodies

## License

Released to the public domain. Please credit the author and the project wherever possible.

## Conversions

You can convert all shapefiles of a particular linework set by using `convert.sh <linework_set_name>`. In order to convert/update a linework set this way we assume:

1. you have a `/shp` file directory set up in your new linework set with properly formatted Shapefiles
1. you have installed `gdal` on your computer to use `ogr2ogr` to convert shapefiles to GeoJSON
1. you have installed `topojson` globally on your computer to convert GeoJSON files to TopoJSON.

**Deployment is only possible if you have Amazon s3 keys provided to you by the Project Linework maintainers.**


