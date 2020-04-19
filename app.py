# The purpose of this script is to get the tickers list into the HTML dropdown
# It will need to go from get tickers -> MongoDB -> HTML

# Import dependencies
from flask import Flask, render_template
import get_tickers
import pymongo

# Configure Flask app
app = Flask(__name__, template_folder='templates')

# Define app routes
# On page load
@app.route('/', methods=['GET'])
def index():
    data = get_tickers.scrape()
    print(data)
    # print(stockDict)
    return render_template("index.html", data=data)
# Home route
@app.route('/index.html')
def home():
    data = get_tickers.scrape()
    print(data)
    # print(stockDict)
    return render_template("index.html", data=data)
# Sources route
@app.route('/sources.html')
def sources():
    return render_template("sources.html")
# Analysis route
@app.route('/analysis.html')
def analysis():
    data = get_tickers.scrape()
    return render_template("analysis.html", data=data)

if __name__ == '__main__':
    app.run(debug=True)



