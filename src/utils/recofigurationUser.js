const reconfigurationUser = (user) => {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    email: user.email,
    imageUrl: user.imageUrl,
    imageAlt: user.imageAlt,
    state: user.state,
    country: user.country,
    city: user.city,
    street: user.street,
    houseNumber: user.houseNumber,
    zipCode: user.zip,
  };
};

export default reconfigurationUser;
