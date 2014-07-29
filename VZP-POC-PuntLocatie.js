geoNL = null;


$(document).ready(function () {
    geoNL = null;
    
    /*
    http://www.highcharts.com/samples/data/jsonp.php?filename=germany.geo.json&amp;callback=geojson
    geojson-shapes.js
    nl-all.geo.json.js
    gemeente_2013
    gemeente_2013.geo.json
    
    AmbulanceStandplaatsen.geojson
    
    states = Highcharts.geojson(geojson, 'map'),
    rivers = Highcharts.geojson(geojson, 'mapline'),
    cities = Highcharts.geojson(geojson, 'mappoint');

    */
    Highcharts.setOptions({
        decimalPoint: ',', thousandsSep: '.'
    });
    
    /* Convert GeoJson files to Highmaps */
    
    /* Ambulance Standplaatsen 
        
        NW-csv: Anchor	RAV-regio	Standplaats	Adres	Bezetting
        
        Zie http://www.zorgatlas.nl/zorg/acute-zorg/locaties-ambulancestandplaatsen/
        
    */
    geoAmbuStpl = Highcharts.geojson(AmbuStpl, 'mappoint');
    
    $.getJSON('gemeente_2013.geo.json.js', function (geojson, status) {
        
        geoNL = geojson;
        /*geoNL=Highcharts.maps.nederland;*/
        
        count = (geoNL.type === 'FeatureCollection')? geoNL.features.length: geoNL.geometries.length;
        
        console.log("JSON Request - status: " + status + '; count: ' + count);
        
        geoMap = Highcharts.geojson(geoNL, 'map');
        
        // Initiate the chart
        mapSettings ={
            chart: {
                /*plotBackgroundImage: "kaartimages/RVP_BMR_Gemeenten_2013_kaal.png",*/
                plotBorderWidth: 0,
                plotBorderColor: '#A0A090',
                width: 420,
                height: 550,
                /*backgroundColor: 'silver',*/
                /* spacing: [100, 100, 100, 100]*/
                
                // Edit chart spacing
                spacingBottom: 0,
                spacingTop: 10,
                spacingLeft: 0,
                spacingRight: 0,
                marginTop: 50,
                marginRight: null,
                marginBottom: null,
                marginLeft: null,
                // Explicitly tell the width and height of a chart
                width: null,
                height: null,
                
                events: {
                    load: function () {
                        map = this;
                            $('svg').find('image').attr('width','100%')
                        }
                    }
            },
            colors:[ '#24459C', '#386CB0', '#67C6DD', '#CCECF4'],
            
            title: {
                text: 'Vaccinatiegraad BMR per gemeente'
            },
            mapNavigation: {
                enabled: true,
                buttonOptions: {
                    verticalAlign: 'bottom',
                    x:5
                },
                enableDoubleClickZoomTo: true
            },
            credits: {
                text: 'zorgatlas.nl',
                href: 'http://www.zorgatlas.nl',
                position: {
                    align: 'left',
                    x: 50
                }
            },
            
            
            series:[ {
                mapData: geoMap,
                type: 'map',
                /*data: RVPdata,
                joinBy:[ 'gemnr_2013', 'gemnr_2013'],*/ 
                color: null,
                name: 'Gemeenten',
                states: {
                    hover: {
                        color: '#BADA55',
                        borderWidth: 2,
                        borderColor: 'green',
                        brightness: 1
                    },
                     select: {
                        color: '#BADA55',
                        borderWidth: 2,
                        borderColor: 'orange',
                        brightness: 1
                    }
                },
                /*dataLabels: {
                    enabled: false,
                    format: '{point.name}'
                },*/
                tooltip : {
                    enabled: false
                    /*pointFormat: '{point.properties.gemnr_2013}'*/
                },
                enableMouseTracking: false
                
            },
            {
                /*mapData: geoAmbuStpl, */
                type: 'mappoint',
                data: geoAmbuStpl,
                /*joinBy:[ 'ID', 'Anchor'],*/
                color: null,
                name: 'Ambulance Standplaatsen',
                states: {
                    hover: {
                        color: '#BADA55',
                        borderWidth: 2,
                        borderColor: 'green',
                        brightness: 1
                    },
                     select: {
                        color: '#BADA55',
                        borderWidth: 2,
                        borderColor: 'orange',
                        brightness: 1
                    }
                },
                marker: {
                    radius: 2
                },
                dataLabels: {
                    enabled: false,
                    format: '{point.properties.StplPc4}'
                },
                tooltip: {
                    headerFormat: 'Standplaats ',
                    pointFormat: ' {point.properties.StplPc4}{point.Standplaats} ({point.properties.StplBezett})'
            },
            }],
            
            
            legend: {
                title: {
                    text: 'Ambulance standplaatsen'
                },
                align: 'left',
                verticalAlign: 'top',
                floating: true,
                layout: 'vertical',
                /*valueDecimals: 0,*/
                /*backgroundColor: 'rgba(255,255,255,0.9)',*/
                symbolRadius: 0,
                symbolHeight: 14,
                y: 50
            }
        }
        $('#container').highcharts( mapSettings);
    });
    
    
    
    
    
    
    
    /*$.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=australia.geo.json&callback=?', function (geojson) {
    
    // Prepare the geojson
    var states = Highcharts.geojson(geojson, 'map'),
    rivers = Highcharts.geojson(geojson, 'mapline'),
    cities = Highcharts.geojson(geojson, 'mappoint');
    });*/
});