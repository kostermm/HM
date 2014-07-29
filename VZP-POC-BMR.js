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
    
            function CSVtoArray(text) {
            return text.split(';');
        };

        BMR = BMR.split('#');
        
        
        var regios = {},
            mapChart,
            regioChart,
            numRegex = /^[0-9\.]+$/,
            quoteRegex = /\"/g,
            categories = CSVtoArray(BMR[0]).slice(2);

        // Parse the CSV into arrays, one array each country
        $.each(BMR.slice(1), function (j, line) {
            var row = CSVtoArray(line),
                data = row.slice(2);

            $.each(data, function (i, val) {
                
                val = val.replace(quoteRegex, '');
                if (numRegex.test(val)) {
                    val = parseFloat(val);
                } else if (!val) {
                    val = null;
                }
                data[i] = val;
            });
            regios[row[0]] = {
                code: row[0],
                name: row[1],
                data: data
            };
        });
        
        Highcharts.wrap(Highcharts.Point.prototype, 'click', function (proceed) {

            /*proceed.apply(this, Array.prototype.slice.call(arguments, 1));*/

            var points = mapChart.getSelectedPoints();

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
                plotBackgroundImage: "kaartimages/RVP_BMR_Gemeenten_2013.png",
                /*plotBorderWidth: 2,
                plotBorderColor: '#A0A090',*/
                width: 500,
                height: 532,
                /*backgroundColor: 'silver',*/
                /* spacing: [100, 100, 100, 100]*/
                
                // Explicitly tell the width and height of a chart
                width: null,
                height: null,
                
                // Edit chart spacing
                spacingBottom: 0,
                spacingTop: 80,
                spacingLeft: 82,
                spacingRight: 0,
                marginTop: 0,
                marginRight: null,
                marginBottom: null,
                marginLeft: null,
                
                events: {
                    load: function () {
                        map = this;
                            $('svg').find('image').attr('x','0');
                            $('svg').find('image').attr('y','-4');
                            $('svg').find('image').attr('width','512');
                            $('svg').find('image').attr('height','548');
                        }
                    }
                    
                /*spacingBottom: 0,
                spacingTop: 80,
                spacingLeft: 82,
                spacingRight: 0,
                marginTop: 0,
                marginRight: null,
                marginBottom: null,
                marginLeft: null,
                
                events: {
                    load: function () {
                        map = this;
                            $('svg').find('image').attr('x','0');
                            $('svg').find('image').attr('y','-4');
                            $('svg').find('image').attr('width','512');
                            $('svg').find('image').attr('height','548');
                        }
                    }*/
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
            colors:[ 'rgba(0,0,0,0)'],
            /*colors:[ '#24459C', '#386CB0', '#67C6DD', '#CCECF4'],*/
            
            title: {
                text: ''
            },
            mapNavigation: {
                enabled: false,
                buttonOptions: {
                    verticalAlign: 'bottom'
                },
                enableDoubleClickZoomTo: true
            },
            
            
            
            series:[ {
                mapData: geoMap,
                data: data,
                color: null,
                joinBy:[ 'gemnr_2013', 'gemnr_2013'], // map key, data key [ 'hc-a2', 'prov_code']
                name: 'Vaccinatiegraad BMR',
                states: {
                    hover: {
                        
                        borderWidth: 2,
                        borderColor: 'orange',
                        brightness: 1,
                        dashstyle: 'dash'
                    },
                    select: {
                        borderWidth: 2,
                        borderColor: 'red',
                        brightness: 1
                    }
                
                },
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                },
                allowPointSelect: true,
                borderColor: 'silver',
                borderWidth: 0,
                nullColor: 'yellow',
                point: {
                    events: {
                        click: function () {
                            chart = this.series.chart;
                            
                            /*var text = '<b>Geselecteerde regio</b><br/>Reeks: ' + this.series.name +
                            '<br>Regio: ' + this.properties.gemnr_2013 + ' (Waarde: ' + this.value + ')';
                            *//*
                            text += '<br/>minX: ' + this._minX + ' -- minY: ' + this._minY +
                            '<br/>maxX: ' + this._maxX + ' -- maxY: ' + this._maxY +
                            '<br/>midX: ' + this._midX + ' -- midY: ' + this._midY;*/
                            
                            /*$('#infobox').html(text);*/
                                                        
                            /*if (! chart.clickLabel) {
                                chart.clickLabel = chart.renderer.label(text, 50, 510)
                                .css({
                                    width: '180px'
                                })
                                .add();
                            } else {
                                chart.clickLabel.attr({
                                    text: text
                                });
                            }*/
                            
                           /* if (points.length) {*/
                /*if (points.length === 1) {
                    $('#info #flag').attr('class', 'flag ' + points[0].flag);
                    $('#info h2').html(points[0].name);
                } else {
                    $('#info #flag').attr('class', 'flag');
                    $('#info h2').html('Comparing countries');

                }*/
                /*$('#infobox').html(text);*/

                if (!regioChart) {
                    regioChart = $('#regio-chart').highcharts({
                        chart: {
                           /* height: 350,
                            width: 400,*/
                            spacingLeft: 0,
                            marginTop: 100
                        },
                        credits: {
                            enabled: false
                        },
                        title: {
                            text: 'BMR vaccinaties voor zuigelingen ' 
                        },
                        subtitle: {
                            text: null
                        },
                        xAxis: {
                            /*tickPixelInterval: 50,*/
                            categories: categories,
                            crosshair: true,
                            step: 1
                        },
                        yAxis: {
                            title: '%',
                            opposite: false,
                            min: 55,
                            max: 100
                        },
                        tooltip: {
                            shared: false,
                            valueDecimals: 1
                            /*useHTML:true,
                            pointFormat: '{point.name}: <b>{point.value:.1f} %</b><br/>'*/
                        },
                        legend: {
                            enabled: true,
                            verticalAlign: 'top',
                            borderWidth: 0,
                            y: 50,
                            symbolWidth:0,
                            symbolHeight:0
                            },
                        plotOptions: {
                            series: {
                                animation: {
                                    duration: 500
                                },
                                marker: {
                                    enabled: false
                                },
                                /*threshold: 0,
                                pointStart: parseInt(categories[0]),*/
                            }
                        }
                    }).highcharts();
                }

                /*$.each(points, function (i) {*/
                    var points = [];
                    
                    if (regioChart.series[0]) {
                        regioChart.series[0].update({
                            name: this.gemnaam,
                            data: regios[this.gemnr_2013].data,
                            type: 'line'
                        }, false);
                    } else {
                        regioChart.addSeries({
                            name: this.gemnaam,
                            data: regios[this.gemnr_2013].data,
                            type: 'line'
                        }, false);
                    }
                /*});*/
                /*while (regioChart.series.length > points.length) {
                    regioChart.series[regioChart.series.length - 1].remove(false);
                }*/
                regioChart.redraw();

            /*} else {
                $('#info #flag').attr('class', '');
                $('#info h2').html('');
                $('#info .subheader').html('');
                if (regioChart) {
                    regioChart = regioChart.destroy();
                }
            }*/
                        }
                    }
                }
            }],
            tooltip: {
                headerFormat: '',
                pointFormat: '{point.gemnaam}({point.gemnr_2013}): <b>{point.value}%</b><br/>'   /*({point.cat})*/
            },
            /*colorAxis: {
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
            },*/
            legend: {
                enabled: false,
                title: {
                    text: 'Vaccinatiegraad (%)'
                },
                align: 'left',
                verticalAlign: 'top',
                floating: true,
                layout: 'vertical',
                symbolRadius: 0,
                symbolHeight: 14
            },
            exporting: {
                enabled: false
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