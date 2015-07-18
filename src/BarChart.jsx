var R = require('ramda');

var BarChart = module.exports = React.createClass({
    
    getInitialState: function(){
        return {  
            items : [],
            x: R.always(0)
        };
    },
    componentWillMount: function(){
        this.setState({
            items: this.props.items,
            x: d3.scale.linear()
                .domain([0, d3.max(this.props.items)])
                .range([0, 420])
        });
    },
    
    render: function(){        
        var divs = R.map(function(d){
            return (
                <div style={{width: this.state.x(d)+"px"}}>{d}</div>
            );
        }.bind(this), this.state.items);
        return (<div className="chart">
            {divs}
          </div>);
    }
});
