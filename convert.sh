#!/usr/bin/env bash
# Requires gdal & topojson for conversions

# set up the file paths to use
FILE_PATH=./linework-sets/$1
SHAPEFILE_DIR=$FILE_PATH/shp
GEOJSON_DIR=$FILE_PATH/geojson
TOPOJSON_DIR=$FILE_PATH/topojson

# create /geojson and /topojson folders if they don't exist
if [ ! -d "$GEOJSON_DIR" ]; then
	mkdir $GEOJSON_DIR
fi

if [ ! -d "$TOPOJSON_DIR" ]; then
	mkdir $TOPOJSON_DIR
fi

# get each shapefile and do the conversions
for f in $SHAPEFILE_DIR/*.shp
do
	# get the file name
	NOPATH="${f%.shp}"
	NAME="${NOPATH##*/}"
	echo "Converting $NAME"

	# convert to geojson first using ogr2ogr
	ogr2ogr -f GeoJSON $GEOJSON_DIR/$NAME.geojson $f

	# convert to topojson using geojson with all properties and 1e5 quantization
	topojson -o $TOPOJSON_DIR/$NAME.json $GEOJSON_DIR/$NAME.geojson -p -q 1e5
done