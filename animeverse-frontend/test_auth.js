async function runTest() {
  console.log('Testing Register...');
  const regRes = await fetch('http://localhost:3000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Sung Jinwoo', email: 'sung@animeverse.com', password: 'shadowmonarch' })
  });
  const regData = await regRes.json();
  console.log('Register Response:', regRes.status, regData);

  console.log('\nTesting Login...');
  const loginRes = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'sung@animeverse.com', password: 'shadowmonarch' })
  });
  const loginData = await loginRes.json();
  console.log('Login Response:', loginRes.status, loginData);

  console.log('\nTesting Login with wrong password...');
  const wrongRes = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'sung@animeverse.com', password: 'wrongpassword' })
  });
  const wrongData = await wrongRes.json();
  console.log('Wrong Password Response:', wrongRes.status, wrongData);
}

runTest();
