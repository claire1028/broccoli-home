const mockAxios = jest.genMockFromModule('axios');

mockAxios.post = jest.fn(() => Promise.resolve({ res: {} }));

export default mockAxios;