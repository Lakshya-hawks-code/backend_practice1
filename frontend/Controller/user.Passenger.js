import passModel from "../../Models/passenger.Model.js";
import invoiceModel from "../../Models/inVoice.model.js";
import puppeteer from "puppeteer";
import userDetailsTemplate from "./templates/userDetailsTemplate.js"
import userInvoiceTemplate from "./templates/userInvoiceTemplate.js" 

export const createPass = async (req, res) => {
    const request = req.body;
    try {
        const pass = new passModel(request);
        await pass.save();
        res.json({
            status: 200,
            data: pass,
            message: "Passenger Create Successfully"
        })
    } catch (error) {
        console.error('An error occurred:', error.message);
        return res.json({
            code: 400,
            message: error.message
        });
    }
}

export const getPass = async (req, res) => {
    try {
        const userDetails = await passModel.find();
        const content = await userDetailsTemplate(userDetails)
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(content);
        await page.pdf({ path: 'passenger.pdf', format: 'A4' });
        await browser.close();
        res.json({ message: 'PDF generated successfully' });
    } catch (error) {
        console.error('An error occurred:', error.message);
        return res.json({
            code: 400,
            message: error.message
        });
    }
}



export const createInvoice = async(req,res) =>
{
    const request = req.body;
    try {
        const user = new invoiceModel(request);
        await user.save(); 
        res.json({
            status:200,
            data:user,
            message:"Invoice Create Successfully"
        });
    } catch (error) {
        console.error('An error occurred:', error.message);
        return res.json({
            code: 400,
            message: error.message
        });
    }
}

export const getInvoice = async(req,res) =>
{    
    try {
            const user = await invoiceModel.find(USER_ID);
            const content = await userInvoiceTemplate(user);
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.setContent(content);
            await page.pdf({path:"Invoice.pdf",format:'A4'});
            await browser.close();
            res.json
            ({
                status:200,
                data:user,
                message:"PDF Generate Successfully"
            })
    } catch (error) {
        console.error('An error occurred:', error.message);
        return res.json({
            code: 400,
            message: error.message
        }); 
    }
}