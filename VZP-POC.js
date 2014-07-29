geoNL = null;


$(document).ready(function () {
    geoNL = null;
    
    /*
    http://www.highcharts.com/samples/data/jsonp.php?filename=germany.geo.json&amp;callback=geojson
    geojson-shapes.js
    nl-all.geo.json.js
    gemeente_2013
    gemeente_2013.geo.json
    */
    Highcharts.setOptions({
        decimalPoint: ',', thousandsSep: '.'
    });
    
    $.getJSON('gemeente_2013.geo.json.js', function (geojson, status) {
        
        geoNL = geojson;
        /*geoNL=Highcharts.maps.nederland;*/
        
        count = (geoNL.type === 'FeatureCollection')? geoNL.features.length: geoNL.geometries.length;
        
        console.log("JSON Request - status: " + status + '; count: ' + count);
        
        geoMap = Highcharts.geojson(geoNL, 'map');
        
        // Initiate the chart
        
        $('#container').highcharts('Map', {
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
            
            //xAxis.minPadding: 0.10,
            /*dataMin	13.421,479
            dataMax	278.049,938*/
            
           /* xAxis: {
                min: 15500,
                max: 250000
            },*/
            /*  yAxis
            dataMin	-613.613
            dataMax	-307.015
            
            */
           /* yAxis: {
                min: - 620000,
                max: - 300000,
            },*/
            /*colors:[ 'rgba(255,10,10,50)'],*/
            /*colors:[ 'rgba(0,0,0,1)'],*/
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
                data: RVPdata,
                color: null,
                joinBy:[ 'gemnr_2013', 'gemnr_2013'], // map key, data key [ 'hc-a2', 'prov_code']
                name: 'Vaccinatiegraad BMR',
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
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                },
                /*borderColor: 'red',
                nullColor: 'yellow',*/
                point: {
                    events: {
                        click: function () {
                            chart = this.series.chart;
                            
                            
                            var text = '<b>Geselecteerde regio</b><br/>Reeks: ' + this.series.name +
                            '<br>Regio: ' + this.properties.gemnr_2013 + ' (Waarde: ' + this.value + ')';
                            /*
                            text += '<br/>minX: ' + this._minX + ' -- minY: ' + this._minY +
                            '<br/>maxX: ' + this._maxX + ' -- maxY: ' + this._maxY +
                            '<br/>midX: ' + this._midX + ' -- midY: ' + this._midY;*/
                            
                            /*$('#infobox').html(text);*/
                            
                            
                            if (! chart.clickLabel) {
                                chart.clickLabel = chart.renderer.label(text, 50, 510)
                                .css({
                                    width: '180px'
                                })
                                .add();
                            } else {
                                chart.clickLabel.attr({
                                    text: text
                                });
                            }
                        }
                    }
                }
            }],
            tooltip: {
                headerFormat: '',
                pointFormat: '{point.gemnaam}({point.gemnr_2013}): <b>{point.value}% ({point.cat})</b>'
            },
            colorAxis: {
                dataClassColor: 'category',
                dataClasses:[ {
                    to: 80, name: '< 80%'
                },
                {
                    from: 80,
                    to: 90, name: '80% - 90%'
                },
                {
                    from: 90,
                    to: 95, name: '90% - 95%'
                },
                {
                    from: 95, name: '>= 95%'
                }],
                marker: {
                    color: 'black'
                }
            },
            legend: {
                title: {
                    text: 'Vaccinatiegraad (%)'
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
        });
    });
    
    
    
    
    
    
    
    /*$.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=australia.geo.json&callback=?', function (geojson) {
    
    // Prepare the geojson
    var states = Highcharts.geojson(geojson, 'map'),
    rivers = Highcharts.geojson(geojson, 'mapline'),
    cities = Highcharts.geojson(geojson, 'mappoint');
    });*/
});