/* eslint-disable no-template-curly-in-string */
'use strict'

require('should')
const Lab = require('lab')
const lab = exports.lab = Lab.script()
const it = lab.test
const describe = lab.experiment
const beforeEach = lab.beforeEach

const dotenvEval = require('../lib/main')

describe('dotenv-eval', function () {
  describe('unit tests', function () {
    it('returns object', function (done) {
      const dotenv = { parsed: {} }
      const obj = dotenvEval.eval(dotenv).parsed

      obj.should.be.an.instanceOf(Object)
      done()
    })

    it('evaluates commands', function (done) {
      const dotenv = {
        parsed: {
          BASIC: 'basic',
          BASIC_SUBSTITUTE: '$(echo basic)',
          COMPLEX_SUBSTITUTE: 'say $(echo basic) please'
        }
      }
      const obj = dotenvEval.eval(dotenv).parsed

      obj.BASIC.should.eql('basic')
      obj.BASIC_SUBSTITUTE.should.eql('basic')
      obj.COMPLEX_SUBSTITUTE.should.eql('say basic please')
      done()
    })
  })
})
