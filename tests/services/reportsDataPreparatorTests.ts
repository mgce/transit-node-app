import { ReportsDataPreparator } from '../../lib/services/reportsDataPreparator'
import { expect } from 'chai';

describe('ReportsDataPreparator', ()=>{
    it('can initialize without an initializer', () => {
        const preparator = new ReportsDataPreparator();
        expect(preparator);
    })
    it('can return values', async () => {
        const dataPreparator = new ReportsDataPreparator();

        const raportsData = await dataPreparator.getMonthly(new Date());

        expect(raportsData.length);
    })
})