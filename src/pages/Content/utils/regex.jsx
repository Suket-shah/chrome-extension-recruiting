// regex function to check if string is an email
export const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}
