
const checkIfTokenIsValid = async (token: string): Promise<boolean> => {
  try {
    const response = await fetch('http://localhost:8000/auth/token-check', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });

    if(!response.ok) {
      return false;
    }

    const data = await response.json();

    if (data?.isValid) {
      return false;
    }
    return true;
  } catch (error) {
    console.log(error)
    return false
  }

}

export { checkIfTokenIsValid }