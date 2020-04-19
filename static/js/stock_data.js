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

        // Identify variables
        var name = data.dataset.name;
        var start_date = data.dataset.start_date;
        var end_date = data.dataset.end_date;
        var dates = unpack(data.dataset.data, 0);
        var open = unpack(data.dataset.data, 1)
        var high = unpack(data.dataset.data, 2);
        var low = unpack(data.dataset.data, 3);
        var closingPrices = unpack(data.dataset.data, 4);
        var volume = unpack(data.dataset.data, 5);

        var lastClose = closingPrices[0];
        var firstClose = closingPrices[closingPrices.length - 1];
        var change = ((lastClose - firstClose) / firstClose) * 100;
        
        // Add in some text information about the selected stock
        document.getElementById("company").textContent = `${name}`;
        document.getElementById("periodHigh").textContent = `Period High: $${Math.max.apply(Math, high)}`;
        document.getElementById("periodLow").textContent = `Period Low: $${Math.min.apply(Math, low)}`;
        document.getElementById("percentChange").textContent = `Change in Period: ${change.toFixed(2)}%`;

        // Create a candlestick chart
        var trace1 = {
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

        var data1= [trace1];

        var layout1 = {
            title: `${ticker} Daily Price Movements`,
            dragmode: 'zoom',
            showlegend: false,
            xaxis: {
                rangeslider: {
                    visible: false
                }
            }
        };

        Plotly.newPlot('candlestickChart', data1, layout1);

        // Create volume bar chart
        var data2 = [
            {
                x: dates,
                y: volume,
                type: 'bar'
            }
        ];

        var layout2 = {
            title: `${ticker} Daily Volume`
        };

        Plotly.newPlot('barChart', data2, layout2);

    });

};
