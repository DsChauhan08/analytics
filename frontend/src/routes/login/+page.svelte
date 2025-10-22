<script>
  let email = '';
  let password = '';

  async function login() {
    const res = await fetch('http://localhost:4000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      alert('Logged in! Token saved.');
    }
  }
</script>

<main>
  <h1>Login</h1>
  <input bind:value={email} placeholder="Email"/>
  <input bind:value={password} type="password" placeholder="Password"/>
  <button on:click={login}>Login</button>
</main>
