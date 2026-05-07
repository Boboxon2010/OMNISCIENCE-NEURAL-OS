async function runSmokeTest() {
  const results = [];
  function pass(msg) { results.push({msg, ok:true}); console.log('PASS: ' + msg); }
  function fail(msg) { results.push({msg, ok:false}); console.error('FAIL: ' + msg); }

  // Check core modules
  try {
    if (window.OS) pass('OS bootstrap present'); else fail('OS not found');
  } catch (e) { fail('OS check error: '+e.message); }

  // Math compute
  try {
    const me = window.OS && window.OS.mathEngine;
    if (me && typeof me.compute === 'function') {
      const r = await me.compute('2+2', false);
      if (r && (r.result == 4 || r.result === '4')) pass('Math compute ok'); else fail('Math compute wrong result');
    } else fail('Math engine missing compute');
  } catch (e) { fail('Math compute error: '+e.message); }

  // Chemistry selectors
  try {
    const s1 = document.getElementById('element1');
    const s2 = document.getElementById('element2');
    if (s1 && s2 && s1.options.length>0 && s2.options.length>0) pass('Chemistry selectors populated'); else fail('Chem selectors not populated');
  } catch (e) { fail('Chem selectors error: '+e.message); }

  // Physics simulate
  try {
    const ph = window.OS && window.OS.physics;
    if (ph && typeof ph.simulateFromArgs === 'function') {
      const res = ph.simulateFromArgs(10,2);
      if (res && res.acceleration) pass('Physics simulateFromArgs ok'); else fail('Physics simulate returned bad');
    } else fail('Physics engine simulateFromArgs missing');
  } catch (e) { fail('Physics simulate error: '+e.message); }

  // Terminal exists
  try {
    const t = window.OS && window.OS.terminal;
    if (t) pass('Terminal instance present'); else fail('Terminal missing');
  } catch (e) { fail('Terminal check error: '+e.message); }

  console.table(results);
  return results;
}
