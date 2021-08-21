import app from '../src/server/index.js';


describe('Test if app is defined', () => {
    test('make sure app exists', () => {
        expect(app).toBeDefined();
    })
})

