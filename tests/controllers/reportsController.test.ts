import mongoose from 'mongoose';
import { ReportsController } from './../../lib/controllers/reportsController';
import { TransitRepository } from '../../lib/dal/transitRepository';
import { DbContext } from '../../lib/dal/dbContext';
import { expect } from 'chai';
import { Response, Request } from 'express';
import TransitModel from '../../lib/dal/models/transit';
import { Transit } from '../../lib/interfaces/transit';
const Mockgoose = require('mock-mongoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);

before(function (done) {
    mockgoose.prepareStorage().then(async function () {
        mongoose.connect('mongodb://localhost/transTesting', function (err) {
            testTransitsData.forEach(transit => {
                new TransitModel(transit).save((err) => {
                    if (err) throw new Error(err);

                    console.log("Saved!");
                })
            })
            console.log("mongodb is connected!!");
            done(err);
        });
    });
});


const dbContext = new DbContext;
const transitRepository = new TransitRepository(dbContext);

describe('ReportController', () => {
    it("should initialize", (done) => {
        const reportController = new ReportsController(transitRepository);
        expect(reportController).to.exist;
        done();
    })
    it("should return monthly raport", async (done) => {
        const reportController = new ReportsController(transitRepository);

        const req: Partial<Request> = {
            query: {
                date: "01/01/2019",
            }
        };

        const monthlyReport = await reportController.getMonthly(<Request>req, <Response>res);
        expect(monthlyReport[0]).is.exist;
        done();
    })
})


const testTransitsData: Transit[] = [
    {
        sourceAddress: "Test1",
        destinationAddress: "Test2",
        price: 10,
        date: new Date(2019, 0, 15),
        distance: 10
    },
    {
        sourceAddress: "Test3",
        destinationAddress: "Test4",
        price: 10,
        date: new Date(2019, 0, 12),
        distance: 10
    },
    {
        sourceAddress: "Test5",
        destinationAddress: "Test6",
        price: 10,
        date: new Date(2019, 0, 21),
        distance: 10
    },
]