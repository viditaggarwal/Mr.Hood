import React from 'react';
import { LineChart, Line, Tooltip, YAxis, ResponsiveContainer } from 'recharts';
import { MoonLoader } from 'halogenium';


class StockChart extends React.Component {
  constructor(props) {
    super(props);
    this.updateRange = this.updateRange.bind(this);

    this.state = {
      range: '1Y',
      loading: true,
      change: 'Latest Price',
      pastRange: '',
    }
  }

  componentDidMount() {
    this.props.fetchChart(this.props.stock.symbol, this.state.range)
    .then(() => this.setState({ loading: false }));
  }

  componentWillReceiveProps(newProps) {
    if (newProps !== this.props) {
      this.renderUpdate();
    }
  }

  renderRangeButtons() {
    const ranges = ['1D', '1M', '3M', '1Y', '2Y', '5Y'];
    return (
      ranges.map((range, i) => (
        <button
          key={i}
          className="range-buttons"
          width={400}
          onClick={() => this.updateRange(range)}>
          {range}
        </button>
      ))
    );
  }

  updateRange(newRange) {
    this.setState({ range: newRange });
    this.props.fetchChart(this.props.stock.symbol, newRange)
  }

  renderUpdate() {
    if (this.state.loading === true) {
      return null;
    }

    let timeLabel;
    let profit;

    let data = this.props.chart;
    let filteredData = data.filter((datum) => datum.close > 0);
    // debugger
    if (this.state.range === "1D") {
      timeLabel = 'Latest Price'
      let priceChange = (filteredData.slice(0, 1).close - this.props.price);
      profit = priceChange / this.props.price;
    } else if (this.state.range === "1M") {
        timeLabel = "Past Month";
        profit = this.props.stats.month1ChangePercent;
    } else if (this.state.range === "3M") {
        timeLabel = "Past 3M";
        profit = this.props.stats.month3ChangePercent;
    } else if (this.state.range === "1Y") {
        timeLabel = "Past Year";
        profit = this.props.stats.year1ChangePercent;
    } else if (this.state.range === "2Y") {
        timeLabel = "Past 2Y";
        profit = this.props.stats.year2ChangePercent;
    } else if (this.state.range === "5Y") {
        timeLabel = "Past 5Y";
        profit = this.props.stats.year5ChangePercent;
    } else {
        timeLabel = "";
        profit = "";
    }

    this.setState({
      change: profit,
      pastRange: timeLabel
    })
  }


  render() {
    let data = this.props.chart.filter(datum => datum.close > 0);
    let dataArray = data.map(datum => {
      return datum.close;
    });

    const max = data.reduce((a, b) => Math.max(a, b), 0)
    const min = data.reduce((a, b) => Math.min(a, b), 0)

    return (
      this.state.loading ?
        <div>
          <MoonLoader
            className="loading-icon"
            color="#26A65B"
            size="20px"
            margin="5px"
            />
        </div>
      :
      <div className="stock-chart">
        <div className="stock-chart-price">{this.props.price}</div>

        <div className="percent-change">
            <span className="percent">{this.state.change}</span>
            <span className="range">{this.state.pastRange}</span>
        </div>

        <div className="chart">
          <LineChart data={data} margin={{top:25, bottom: 25}} width={600} height={400}>

            <Line
              type="linear"
              dataKey="high"
              strokeWidth={2} stroke="#21ce99"
              dot={false}
              isAnimationActive={true}
            />

            <YAxis
              hide={true}
              domain={[min, max]}
            />

          </LineChart>

        </div>

      </div>
    )
  }
}

export default StockChart;

// const StockChart = () => {
//
//
//
//   return (
//     <div>
//       <h2>Stock Chart</h2>
//     </div>
//   );
//
//
// };