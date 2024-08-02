import Handlebars from "handlebars";
 const userInvoiceTemplate = (data) =>
{
    return new Promise(async(reslove,reject)=>
    {
        let source = 
       `
       <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }

        .container {
            display: flex;
        }

        .left,
        .right {
            flex: 1;
            padding: 20px;
            margin-left: 150px;
        }
        h1
        {
            text-align: center;
            margin-right: 40px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 150px;
           margin-left: -450px;
        }

        th, td {
            border: 1px solid #000;
            padding: 8px;
            text-align: left;
        }

        th {
            background-color: #f2f2f2;
        }

        tr:nth-child(even) {
            background-color: #f2f2f2;
        }
        img 
        {
            margin-left: -50px;
        }
    </style>
</head> 

<body>
     <h1>Invoice Details</h1>
     ${data.map((invoice)=>
        `
        <div class="container">
        <div class="left">
            <h2>Invoice</h2>
            <br>
            <p>${invoice.clientName}/${invoice.companyName}/${invoice.companyAddress}/${invoice.companyCity}/${invoice.companyState}/${invoice.companyZip}/${invoice.companyPostCode}/${invoice.companyEmail}/${invoice.companyPhone}</p>
            <br><br>
            <h2>Bill To</h2>
            <p>${invoice.clientName}</p>
            <p>${invoice.companyName}</p>
            <p>${invoice.companyAddress}</p>
            <p>${invoice.companyPhone}</p>
        </div>
        <div class="right">
            <img src=${invoice.logo} alt="">
            <h2>${invoice.companyName}</h2>
            <br>
            <h2>Ship to</h2>
            <p>${invoice.shipName}</p>
            <p>${invoice.companyName}</p>
            <p>${invoice.shipAddress}</p>
            <p>${invoice.shipPhone}</p>
            <table>
                <thead>
                    <tr>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                    <td>${invoice.description}</td>
                    <td>${invoice.qunatitiy}</td>
                    <td>${invoice.unitPrice}</td>
                    <td>${invoice.total}</td>
                </tr>
            </tbody>
            </table>
            <div>
                <h3>${invoice.subtotal}</h3>
                <h3>${invoice.discount}</h3>
                <h3>${invoice.taxRate}</h3>
                <h3>${invoice.totalTax}</h3>
                <h3>${invoice.balanceDue}</h3>
            </div> 
        </div>
    </div>`
        )
    .join('')}
    </body>
</html>`;
    
    let template = Handlebars.compile(source);
    let result = template(data);
    reslove(result);
 
    })
}

export default userInvoiceTemplate;