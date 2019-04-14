import { ReportsDataPreparator } from '../../lib/services/reportsDataPreparator'
import { expect } from 'chai';
import { TransitRepository } from '../../lib/dal/transitRepository';
import { DbContext } from '../../lib/dal/dbContext';
import sinon from 'sinon';

const dbContext = new DbContext;
const transitRepo = new TransitRepository(dbContext);

describe('ReportsDataPreparator', ()=>{
    it('can initialize without an initializer', () => {
        
        const preparator = new ReportsDataPreparator(transitRepo);
        expect(preparator).to.be.a('ReportsDataPreparator');
    })
    it('can return values', async (done) => {
        const transitRepoMock = sinon.mock(transitRepo);
        transitRepoMock.expects("getFromRange").once().returns([]);

        const dataPreparator = new ReportsDataPreparator(transitRepo);
        
        const raportsData = await dataPreparator.getMonthly(new Date());
        
        transitRepoMock.verify();
        expect(raportsData).has.length(0);
    })
})