import Lab       from 'lab';
import Code      from 'code';
import composer  from '../server/composer';

const {expect} = Code
const lab = exports.lab = Lab.script();

lab.experiment('App', () => {
  lab.test('should compose a server', (done) => {
    composer(function (err, composedServer) {
      expect(composedServer).to.be.an.object();
      done(err);
    });
  });
});
