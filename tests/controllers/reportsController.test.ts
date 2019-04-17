import mongoose from 'mongoose';
import { ReportsController } from './../../lib/controllers/reportsController';
import { TransitRepository } from '../../lib/dal/transitRepository';
import { DbContext } from '../../lib/dal/dbContext';
import { expect } from 'chai';
import { Response, Request } from 'express';
import TransitModel from '../../lib/dal/models/transit';
import { Transit } from '../../lib/interfaces/transit';
import sinon from 'sinon';
const Mockgoose = require('mock-mongoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);
import http_mocks from 'node-mocks-http';

function buildResponse() {
    return http_mocks.createResponse({ eventEmitter: require('events').EventEmitter })
}

before(function (done) {
    mockgoose.prepareStorage().then(async function () {
        mongoose.connect('mongodb://localhost/transTesting', function (err) {
            testTransitsData.forEach(transit => {
                new TransitModel(transit).save((err) => {
                    if (err) throw new Error(err);
                })
            })
            done(err);
        });
    });
});

const dbContext = new DbContext;
const transitRepository = new TransitRepository(dbContext);

describe('ReportController', () => {
    it("initialize", (done) => {
        const reportController = new ReportsController(transitRepository);
        expect(reportController).to.exist;
        done();
    })
    it("return monthly raport on getMonthly method", (done) => {
        const reportController = new ReportsController(transitRepository);

        const req: Partial<Request> = {
            query: {
                date: "01/01/2019",
            }
        };

        const res = buildResponse();

        res.on('end', () => {
            expect(res._isJSON()).is.true;

            var data = JSON.parse(res._getData());
            expect(data[0]).is.exist;
            expect(data[0].totalDistance).is.equal(30);
            expect(data[0].averagePrice).is.equal(10);
            expect(data[0].averagelDistance).is.equal(10);
            done();
        })

        reportController.getMonthly(<Request>req, <Response>res);
    })
    it("return raport for specified date", (done) => {
        const reportController = new ReportsController(transitRepository);

        const req: Partial<Request> = {
            query: {
                startDate: "01/10/2019",
                endDate: "01/14/2019",
            }
        };

        const res = buildResponse();

        res.on('end', () => {
            expect(res._isJSON()).is.true;

            var data = JSON.parse(res._getData());
            expect(data[0]).is.exist;
            expect(data[0].totalDistance).is.equal(30);
            expect(data[0].averagePrice).is.equal(10);
            expect(data[0].averagelDistance).is.equal(10);
            done();
        })

        reportController.getRange(<Request>req, <Response>res);
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