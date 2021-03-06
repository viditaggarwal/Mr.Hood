import { connect } from 'react-redux';
import { logout }  from '../../actions/session_actions';
import { fetchStocks, fetchStock, fetchWatchlist } from '../../actions/stock_actions';
import { fetchPortfolio, fetchPortfolioSnapshots } from '../../actions/portfolio_actions';
import { fetchPrice, fetchStats, fetchTopStocks } from '../../actions/iex_actions';
import { fetchMarketNews } from '../../actions/news_api_actions';
import Dashboard from './dashboard';

const mSP = (state) => {
  //
  return {
    currentUser: state.entities.users[state.session.id],
    stocks: Object.keys(state.entities.stocks).map( id => state.entities.stocks[id]),
    portfolio: state.entities.portfolio,
    snapshots: Object.values(state.entities.portfolio.snapshots),
    marketNews: state.entities.newsAPI.marketNews,
    topStocks: state.entities.iex.topStocks,
    watchlist: state.entities.watchlist,
  }
};

const mDP = dispatch => ({
  logout: () => dispatch(logout()),
  fetchStocks: (query) => dispatch(fetchStocks(query)),
  fetchStock: (id) => dispatch(fetchStock(id)),
  fetchPortfolio: (id) => dispatch(fetchPortfolio(id)),
  fetchPortfolioSnapshots: (id) => dispatch(fetchPortfolioSnapshots(id)),
  fetchPrice: (symbol) => dispatch(fetchPrice(symbol)),
  fetchStats: (symbol) => dispatch(fetchStats(symbol)),
  fetchMarketNews: (symbol) => dispatch(fetchMarketNews()),
  fetchTopStocks: () => dispatch(fetchTopStocks()),
  fetchWatchlist: () => dispatch(fetchWatchlist()),
});

export default connect(
  mSP,
  mDP
)(Dashboard);
