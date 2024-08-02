import Handlebars from "handlebars";
const userDetailsTemplate = (data) => {
    return new Promise(async (resolve, reject) => {
        var source = `<html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Passenger</title>
            </head>
            <body>
                <h1>Passenger List</h1>
                ${data.map((passenger, index) => `
                <ul>
                       <h4>User${index+1}</h4>
                        <li>Name:${passenger.passName}</li>
                        <li>Email:${passenger.passEmail}</li>
                        <li>Addhar:${passenger.passAadhar}</li>
                        <li>Phone:${passenger.passPhone}</li>
                        <li>Address:${passenger.passAddress}</li>
                        <li>PinCode:${passenger.passPinCode}</li>
                        <li>PanCode:${passenger.passPan}</li>
                    </ul>`
        ).join('')}
            </body>
        </html>`;

        var template = Handlebars.compile(source);
        var result = template(data);
        resolve(result);
    });
};

export default userDetailsTemplate;