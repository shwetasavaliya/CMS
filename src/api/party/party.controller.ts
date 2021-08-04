import { Body, Delete, Get, JsonController, Post, Put, Req, Res, UseBefore } from "routing-controllers";
import PartyService from "./party.service";
import { PartyDeleteDTO, PartyDTO, PartyInvoiceDTO, PartyUpdateDTO } from "./party.validator";
import { Auth } from "../../middleware/auth"
import ExcelJS from 'exceljs'
import ejs from 'ejs'
import puppeteer from "puppeteer";
import { uploadPdf } from "../../utils/aws/signurl.utils";
import { AWS_INVOICE_URL } from "../../config";

@JsonController("/party")
export default class PartyController {
    private partyService: PartyService = new PartyService();

    @Post("/add-party", { transformResponse: true })
    @UseBefore(Auth)
    async addParty(@Req() request: any, @Res() response: any, @Body({ validate: true }) body: PartyDTO) {
        try {
            const { id } = request?.data || { id: "" };
            const {
                partyFirstName,
                partyMiddleName,
                partyLastName,
                partyCompanyName,
                partyMobile,
                partyGstNo,
                partyPanNo,
                partyAadharCardNo,
                partyCompanyMobile,
                bankName,
                bankAccountNo,
                bankAccountType,
                bankIFSCCode,
                bankBranchAddress,
                contactPersonName,
                contactPersonMobile,
                contactPersonEmail,
                contactPersonAddress,
            } = body

            
            const partyDetails: any = {
                userId: id,
                partyFirstName,
                partyMiddleName,
                partyLastName,
                partyCompanyName,
                partyMobile,
                partyGstNo,
                partyPanNo,
                partyAadharCardNo,
                partyCompanyMobile,
                bankName,
                bankAccountNo,
                bankAccountType,
                bankIFSCCode,
                bankBranchAddress,
                contactPersonName,
                contactPersonMobile,
                contactPersonEmail,
                contactPersonAddress,
            }
            const partyData = await this.partyService.create(partyDetails)
            if (!partyData) return response.formatter.error({}, false, "PARTY_ADDED_FAILED")

            return response.formatter.ok({ partyData }, true, "PARTY_ADDED_SUCCESS");
        } catch (error) {
            console.log("ERR:: ", error);
            return response.formatter.error({}, false, "PARTY_ADDED_FAILED", error);
        }
    }

    @Put('/update-party-data')
    @UseBefore(Auth)
    async updatePartyData(@Req() request: any, @Res() response: any, @Body({ validate: true }) body: PartyUpdateDTO) {
        try {
            const { id } = request?.data || { id: "" };

            const {
                _id,
                partyFirstName,
                partyMiddleName,
                partyLastName,
                partyCompanyName,
                partyMobile,
                partyGstNo,
                partyPanNo,
                partyAadharCardNo,
                partyCompanyMobile,
                bankName,
                bankAccountNo,
                bankAccountType,
                bankIFSCCode,
                bankBranchAddress,
                contactPersonName,
                contactPersonMobile,
                contactPersonEmail,
                contactPersonAddress
            } = body
            const update: any = {};
            if (partyFirstName) update.partyFirstName = partyFirstName
            if (partyMiddleName) update.partyMiddleName = partyMiddleName
            if (partyLastName) update.partyLastName = partyLastName
            if (partyCompanyName) update.partyCompanyName = partyCompanyName
            if (partyMobile) update.partyMobile = partyMobile
            if (partyGstNo) update.partyGstNo = partyGstNo
            if (partyPanNo) update.partyPanNo = partyPanNo
            if (partyAadharCardNo) update.partyAadharCardNo = partyAadharCardNo
            if (partyCompanyMobile) update.partyCompanyMobile = partyCompanyMobile
            if (bankName) update.bankName = bankName
            if (bankAccountNo) update.bankAccountNo = bankAccountNo
            if (bankAccountType) update.bankAccountType = bankAccountType
            if (bankIFSCCode) update.bankIFSCCode = bankIFSCCode
            if (bankBranchAddress) update.bankBranchAddress = bankBranchAddress
            if (contactPersonName) update.contactPersonName = contactPersonName
            if (contactPersonMobile) update.contactPersonMobile = contactPersonMobile
            if (contactPersonEmail) update.contactPersonEmail = contactPersonEmail
            if (contactPersonAddress) update.contactPersonAddress = contactPersonAddress

            const updatePartyData = await this.partyService.updateOne({ userId: id, _id }, { $set: update }, { new: true })

            if (!updatePartyData) return response.formatter.error({}, false, "PARTY_DATA_NOT_FOUND")

            return response.formatter.ok({ updatePartyData }, true, "PARTY_UPDATE_SUCCESS");

        } catch (error) {
            console.log("ERR:: ", error);
            return response.formatter.error({}, false, "PARTY_UPDATE_FAILED", error);
        }
    }

    @Delete('/delete-party-data')
    @UseBefore(Auth)
    async deletePartyData(@Req() request: any, @Res() response: any, @Body({ validate: true }) body: PartyDeleteDTO) {
        try {
            // const { id } = request?.data || { id: "" };
            const { _id } = body

            const deleteParty = await this.partyService.delete({ _id })
            if (!deleteParty) return response.formatter.error({}, false, "PARTY_DATA_NOT_FOUND")

            return response.formatter.ok({ deleteParty }, true, "PARTY_DELETE_SUCCESS");
        } catch (error) {
            console.log("ERR:: ", error);
            return response.formatter.error({}, false, "PARTY_DELETE_FAILED", error);
        }
    }

    @Get('/get-party-data')
    @UseBefore(Auth)
    async getPartyData(@Req() request: any, @Res() response: any) {
        try {
            const { id } = request?.data || { id: "" };
            const partyData = await this.partyService.find({ userId: id })
            if (!partyData) return response.formatter.error({}, false, "PARTY_DATA_NOT_FOUND")

            return response.formatter.ok({ partyData }, true, "PARTY_GETDATA_SUCCESS");
        } catch (error) {
            console.log("ERR:: ", error);
            return response.formatter.error({}, false, "PARTY_GETDATA_FAILED", error);
        }
    }

    @Get('/get-party-data/excelsheet')
    @UseBefore(Auth)
    async getPartyDataIntoExcel(@Req() request: any, @Res() response: any) {
        try {
            const { id } = request?.data || { id: "" };
            const partyData = await this.partyService.find({ userId: id })
            if (!partyData) return response.formatter.error({}, false, "PARTY_DATA_NOT_FOUND")

            const workbook = new ExcelJS.Workbook();
            const worSheet = workbook.addWorksheet('my party data')
            worSheet.columns = [
                { header: 'S_no', key: 's_no', width: 10 },
                { header: 'partyFirstName', key: 'partyFirstName', width: 20 },
                { header: 'partyMiddleName', key: 'partyMiddleName', width: 20 },
                { header: 'partyLastName', key: 'partyLastName', width: 20 },
                { header: 'partyCompanyName', key: 'partyCompanyName', width: 20 },
                { header: 'partyMobile', key: 'partyMobile', width: 20 },
                { header: 'partyGstNo', key: 'partyGstNo', width: 20 },
                { header: 'partyPanNo', key: 'partyPanNo', width: 20 },
                { header: 'partyAadharCardNo', key: 'partyAadharCardNo', width: 20 },
                { header: 'partyCompanyMobile', key: 'partyCompanyMobile', width: 20 },
                { header: 'bankName', key: 'bankName', width: 20 },
                { header: 'bankAccountNo', key: 'bankAccountNo', width: 20 },
                { header: 'bankAccountType', key: 'bankAccountType', width: 20 },
                { header: 'bankIFSCCode', key: 'bankIFSCCode', width: 20 },
                { header: 'bankBranchAddress', key: 'bankBranchAddress', width: 20 },
                { header: 'contactPersonName', key: 'contactPersonName', width: 20 },
                { header: 'contactPersonMobile', key: 'contactPersonMobile', width: 20 },
                { header: 'contactPersonEmail', key: 'contactPersonEmail', width: 20 },
                { header: 'contactPersonAddress', key: 'contactPersonAddress', width: 20 },

            ];

            var count = 1;

            partyData.forEach(partyData => {
                (partyData as any).s_no = count;
                worSheet.addRow(partyData)
                count += 1;
            })
            worSheet.getRow(1).eachCell((cell) => {
                cell.font = { bold: true }
            })

            response.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            response.setHeader("Content-Disposition", "attachment; filename=123456789.xlsx");

            await workbook.xlsx.write(response);
            return response.end();
        } catch (error) {
            console.log("ERR:: ", error);
            return response.formatter.error({}, false, "PARTY_GETDATA_FAILED", error);
        }
    }

    @Post('/get-party-invoice/pdf')
    @UseBefore(Auth)
    async getParty(@Req() request: any, @Res() response: any, @Body({ validate: true }) body: PartyInvoiceDTO) {
        try {
            const { id } = request?.data || { id: "" };
            const { _id } = body;

            const partyData = await this.partyService.findOne({ userId: id, _id })
            if (!partyData) return response.formatter.error({}, false, "PARTY_DATA_NOT_FOUND")

            if (partyData.partyInvoiceUrl != null) {
                const url = partyData.partyInvoiceUrl;
                return response.formatter.ok({ url }, true, "INVOICE_CREATED_SUCCESS");
            }
            else {

                var html = await ejs.renderFile("invoice.ejs", { partyData }, { async: true });
                const browser = await puppeteer.launch({ headless: true })

                const page = await browser.newPage()
                await page.setContent(html, { waitUntil: 'domcontentloaded' })
                
                const pdf = await page.pdf({ path: "pdf/invoice.pdf" })
                const upload = await uploadPdf(pdf);
                
                const awsInvoicePdf = AWS_INVOICE_URL + upload.fileName;
                
                const updateUrl = await this.partyService.updateOne({ _id }, { partyInvoiceUrl: awsInvoicePdf }, { new: true })
                if (!updateUrl) return response.formatter.error({}, false, "INVOICE_CREATING_FAILED");
                await browser.close()
                return response.formatter.ok({ awsInvoicePdf }, true, "INVOICE_CREATED_SUCCESS");
            }

        } catch (error) {
            console.log("ERR:: ", error);
            return response.formatter.error({}, false, "INVOICE_CREATING_FAILED", error);
        }
    }
}