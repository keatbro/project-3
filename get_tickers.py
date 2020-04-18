# Import Dependency
import pandas as pd

url = 'https://en.wikipedia.org/wiki/NASDAQ-100'

def scrape():
    tables = pd.read_html(url)
    tickerTable = tables[2]['Ticker']
    tickerList = []
    for ticker in tickerTable:
        tickerList.append(ticker)
    
    tickerDict = {'symbols' : tickerList}
  
    return tickerDict





