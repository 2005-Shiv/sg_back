async function retriveToken() { 
const SUPABASE_URL = `https://oyxccwkurzrqydeakupd.supabase.co/auth/v1/token?grant_type=password`;
const ANON_KEY = "sb_secret_ismJoHW33-IZUgzjtz-Z8w_8VmMkwnI";

const loginData = {
    email: "dummy@gmail.com",
    password: "123456"
};

try {
    const response = await fetch(SUPABASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apikey': ANON_KEY
        },
        body: JSON.stringify(loginData)
    });

    const data = await response.json();

    if (response.ok) {
        console.log("Access Token:", data.access_token);
        return data.access_token;
    } else {
        console.error("Login failed:", data.error_description || data.message);
    }
} catch (error) {
    console.error("Request error:", error);
}
}

// Execute the function
retriveToken();
