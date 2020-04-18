import { expect } from 'chai';

import { getApisInfo } from './apis';

describe('apis utilities', () => {
    describe('getApisInfo(schema, datakey)', () => {
        it('should get the apis info for the given config', () => {
            let schema = {};
            let dataKey = 'data';

            expect(getApisInfo()).to.eql({});
            expect(getApisInfo(null, null)).to.eql({});
            expect(getApisInfo(schema)).to.eql({});
            expect(getApisInfo(null, dataKey)).to.eql({});
            expect(getApisInfo(undefined, dataKey)).to.eql({});
            expect(getApisInfo(schema, dataKey)).to.eql({});

            schema = {
                apis: {
                    dataKey: 'users',
                    request: {
                        baseURL: 'https://google.com',
                        method: 'get',
                        url: '/v1/users',
                    },
                    totalKey: 'totalRecords',
                },
            };

            expect(getApisInfo(schema, dataKey)).to.eql(schema.apis);

            dataKey = 'fonts';
            schema = {
                apis: [
                    {
                        dataKey: 'accounts',
                        request: {
                            baseURL: 'https://google.com',
                            method: 'post',
                            url: '/create/account',
                        },
                    },
                    {
                        dataKey: 'fonts',
                        request: {
                            baseURL: 'https://google.com',
                            method: 'get',
                            url: '/get/font',
                        },
                    },
                ],
            };

            expect(getApisInfo(schema, dataKey)).to.eql(
                schema.apis.find(s => s.dataKey === 'fonts')
            );
        });
    });
});
