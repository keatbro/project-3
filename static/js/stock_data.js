// The purpose of this script is to retrieve the value of the selected
// ticker on from the HTML, and grab the data and generate charts once
// the 'Analyze' button is clicked.

// Run the getData function when the button is clicked
function getData() {
    dropdownMenu = d3.select("select");
    var ticker = dropdownMenu.property("value");
    console.log(ticker);

    // Create URL with selected ticker symbol
    var queryURL = `https://www.quandl.com/api/v3/datasets/WIKI/${ticker}.json?start_date=2017-01-01&end_date=2018-01-01&api_key=${apikey}`
    console.log(queryURL);

    // Call the Alphavantage API to retreive stock data
    d3.json(queryURL, function(data) {
        console.log(data);

        function unpack(rows, index) {
            return rows.map(function(row) {
                return row[index];
            });
        }

        var name = data.dataset.name;
        var start_date = data.dataset.start_date;
        var end_date = data.dataset.end_date;
        var dates = unpack(data.dataset.data, 0);
        var open = unpack(data.dataset.data, 1)
        var high = unpack(data.dataset.data, 2);
        var low = unpack(data.dataset.data, 3);
        var closingPrices = unpack(data.dataset.data, 4);

        var trace1 = {
            type: "scatter",
            mode: "lines",
            name: name,
            x: dates,
            y: closingPrices,
            line: {
                color: 'green'
            }
        };

        var data = [trace1]

        var layout = {
            title: `${name} Closing Prices`,
            xaxis: {
                range: [start_date, end_date],
                type: "date"
            },
            yaxis: {
                autorange: true,
                type: "linear"
            }
        };
        
        Plotly.newPlot("closingPricesChart", data, layout);

        var trace2 = {
            x: dates,
            close: closingPrices,
            high: high,
            low: low,
            open: open,

            increasing: {line: {color:'green'}},
            decreasing: {line: {color: 'red'}},

            type: 'candlestick',
            xaxis: 'x',
            yaxix: 'y'
        
        };

        var data2= [trace2];

        var layout2 = {
            title: `${name} Closing Prices`,
            dragmode: 'zoom',
            showlegend: false,
            xaxis: {
                rangeslider: {
                    visible: false
                }
            }
        };

        Plotly.newPlot('candlestickChart', data2, layout2);

    });

};
