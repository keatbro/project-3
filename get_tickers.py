# Import Dependency
import pandas as pd

url = 'https://finance.yahoo.com/trending-tickers/'

def scrape():
    tables = pd.read_html(url)
    tickerTable = tables[0]['Symbol']
    tickerList = []
    for ticker in tickerTable:
        tickerList.append(ticker)
    
    tickerDict = {'symbols' : tickerList}
  
    return tickerDict





