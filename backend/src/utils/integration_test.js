
const BASE = 'http://localhost:5000/api';

async function run() {
  console.log('Starting integration test...');
  // Create equipment
  const eqRes = await fetch(`${BASE}/equipment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: `TEST-EQ-VERIFY-${Date.now()}`, serialNumber: 'TS-VERIFY', category: 'Test', department: 'QA', ownerName: 'Tester', location: 'Lab' })
  });
  const eq = await eqRes.json();
  console.log('Created equipment', eq._id);

  // Create corrective request
  const req1Res = await fetch(`${BASE}/requests`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ subject: 'Test Corrective', equipmentId: eq._id, type: 'Corrective' })
  });
  const req1 = await req1Res.json();
  console.log('Created request1', req1._id);

  // Update status -> In Progress
  await fetch(`${BASE}/requests/${req1._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'In Progress' }) });
  console.log('Updated request1 -> In Progress');

  // Update status -> Repaired
  await fetch(`${BASE}/requests/${req1._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'Repaired', durationHours: 1 }) });
  console.log('Updated request1 -> Repaired');

  // Create scrap request and move to Scrap
  const req2Res = await fetch(`${BASE}/requests`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ subject: 'Test Scrap', equipmentId: eq._id, type: 'Corrective' }) });
  const req2 = await req2Res.json();
  console.log('Created request2', req2._id);
  await fetch(`${BASE}/requests/${req2._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: 'Scrap' }) });
  console.log('Updated request2 -> Scrap');

  // Check equipment
  const eqAfterRes = await fetch(`${BASE}/equipment/${eq._id}`);
  const eqAfter = await eqAfterRes.json();
  console.log('Equipment isScrapped:', eqAfter.isScrapped);

  // Create preventive request scheduled
  const future = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  const req3Res = await fetch(`${BASE}/requests`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ subject: 'Test Preventive', equipmentId: eq._id, type: 'Preventive', scheduledDate: future }) });
  const req3 = await req3Res.json();
  console.log('Created preventive request', req3._id);

  // Query preventive
  const preventiveListRes = await fetch(`${BASE}/requests?type=Preventive`);
  const preventiveList = await preventiveListRes.json();
  console.log('Preventive count (>=1 expected):', (preventiveList || []).length);

  // Cleanup
  await fetch(`${BASE}/requests/${req1._id}`, { method: 'DELETE' });
  await fetch(`${BASE}/requests/${req2._id}`, { method: 'DELETE' });
  await fetch(`${BASE}/requests/${req3._id}`, { method: 'DELETE' });
  await fetch(`${BASE}/equipment/${eq._id}`, { method: 'DELETE' });
  console.log('Cleanup done.');
}

run().catch(err => { console.error('Integration test failed:', err); process.exit(1); });
