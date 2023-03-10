export async function authenticateUser(emailAddress, password) {
  // Make an API call to an external backend to check the validity of the email and password
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + `Author/Login`,
    {
      method: "POST",
      body: JSON.stringify({ emailAddress, password }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.ok) {
    // Return true if the credentials are valid
    return true;
  } else {
    // Return false if the credentials are invalid
    return false;
  }
}
