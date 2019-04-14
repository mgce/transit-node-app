import { expect } from 'chai';
import { DbContext } from '../../lib/dal/dbContext';

describe('DbContext', ()=>{
    it('initialize without an initializer', () => {
        const context = new DbContext();
        expect(context instanceof DbContext);
    })
    it('return transit model', async () => {
        const context = new DbContext();

        const transitModel = context.getModel("Transit");

        expect(transitModel);
    })
})