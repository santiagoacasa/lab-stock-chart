const key = 'M637VI4X3MRGVFSM';
const functionName = 'TIME_SERIES_DAILY';
console.log('archivo linkeado')
const canvasArr = document.querySelectorAll('canvas')

canvasArr.forEach(canvas => {
    const empresa = canvas.id
    const apiUrl = `https://www.alphavantage.co/query?function=${functionName}&symbol=${empresa}&apikey=${key}`;
    console.log(empresa)
    axios
        .get(apiUrl)
        .then(responseFromAPI => {
            console.log(responseFromAPI)
            printTheChart(responseFromAPI.data, empresa); // <== call the function here where you used to console.log() the response
        })
        .catch(err => console.log('Error while getting the data: ', err));

})

function printTheChart(stockData, idEmpresa) {
    const dailyData = stockData['Time Series (Daily)'];

    const stockDates = Object.keys(dailyData);
    const stockPrices = stockDates.map(date => dailyData[date]['4. close']);

    const ctx = document.getElementById(idEmpresa).getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: stockDates,
            datasets: [{
                label: 'Stock Chart',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: stockPrices
            }]
        }
    }); // closes chart = new Chart()
} // closes printTheChart()

