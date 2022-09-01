import React, { PureComponent } from 'react';
import { LineChart,Line,AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend,Bar,BarChart } from 'recharts';
import $ from 'jquery';
import moment from 'moment';


export default class App extends PureComponent {
  constructor(props){
    super(props);
    this.state = {chart_data : []};
  
  
  }
  
  componentWillMount(){
        $.ajax({
          url: "https://api.coincap.io/v2/assets/bitcoin/history?interval=d1",
          contentType: "application/json"
        })
          .done(
            function(abcd) {
              let temp = [];
              for(let i=0;i<10;i++){ temp.push(abcd.data[i]); }
              this.setState({ chart_data : temp});
            }.bind(this)
          )
          .fail(
            function(datas) {
            }.bind(this)
          );
          //console.log(this.state.chart_data)
          }
          dateFormatter (item) {
            return moment(item).format("DD MMM YY");}

render() {
  return (
   <div>
    <div className='a'>
            <h1 align="center"><b>LINE CHART</b></h1>
             <LineChart
        width={1000}
        height={300}
        data={this.state.chart_data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date"  tickFormatter={this.dateFormatter}/>
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="priceUsd" stroke="#56a832" activeDot={{ r: 8 }} />
    
      </LineChart>
      </div>
     <div className='b'>
     <h1 align="center"><b>BAR CHART</b></h1>
       <BarChart
         width={1500}
         height={300}
         data={this.state.chart_data}
         margin={{
           top: 5,
           right: 30,
           left: 20,
           bottom: 5,
         }}
         barSize={20}
       >
         <XAxis  dataKey="date"  tickFormatter={this.dateFormatter} scale="point" padding={{ left: 10, right: 10 }} />
         <YAxis />
         <Tooltip />
         <Legend />
         <CartesianGrid strokeDasharray="3 3" />
         <Bar dataKey="priceUsd" fill="#56a832" background={{ fill: '#eee' }} />
       </BarChart>
       </div>

       </div>
  );
}
}
