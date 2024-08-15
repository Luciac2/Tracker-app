import React, { useState } from "react";

const CreateAccountPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    phoneNumber: "",
    email: "",
    accountNumber: "",
    accountName: "",
    bank: "",
    password: "",
    confirmPassword: "",
    localGovt: "",
    state: "",
    lineManager: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // Handle form submission
    console.log("Form submitted", formData);
  };

  const banksInNigeria = [
    "Access Bank",
    "First Bank of Nigeria",
    "Guaranty Trust Bank (GTBank)",
    "United Bank for Africa (UBA)",
    "Zenith Bank",
    "Fidelity Bank",
    "Union Bank",
    "Stanbic IBTC Bank",
    "Sterling Bank",
    "EcoBank",
    "Polaris Bank",
    "Wema Bank",
    "Heritage Bank",
    "Opay",
    "Moniepoint",
    "Palmpay",
    "Kuda",
    "Wrapspeed",
    "FairMoney",
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            {
              label: "Name",
              name: "name",
              type: "text",
              placeholder: "John Adetayo",
            },
            {
              label: "Username",
              name: "username",
              type: "text",
              placeholder: "Username",
            },
            {
              label: "Phone Number",
              name: "phoneNumber",
              type: "tel",
              placeholder: "08000000000",
              pattern: "\\d{11}",
            },
            {
              label: "Email Address",
              name: "email",
              type: "email",
              placeholder: "example@example.com",
            },
            {
              label: "Account Number",
              name: "accountNumber",
              type: "text",
              placeholder: "1234567890",
              pattern: "\\d{10}",
            },
            {
              label: "Account Name",
              name: "accountName",
              type: "text",
              placeholder: "Account Holder Name",
            },
            {
              label: "Password",
              name: "password",
              type: "password",
              placeholder: "Enter your password",
            },
            {
              label: "Confirm Password",
              name: "confirmPassword",
              type: "password",
              placeholder: "Confirm your password",
            },
            {
              label: "Segment",
              name: "Segment",
              type: "text",
              placeholder: "Segment",
            },
            {
              label: "State",
              name: "state",
              type: "text",
              placeholder: "Lagos",
            },
            {
              label: "Line Manager",
              name: "lineManager",
              type: "text",
              placeholder: "Manager Name",
            },
          ].map(({ label, name, type, placeholder, pattern }) => (
            <div key={name}>
              <label
                className="block text-sm font-medium text-gray-700 mb-2"
                htmlFor={name}
              >
                {label}
              </label>
              <input
                id={name}
                name={name}
                type={type}
                value={formData[name]}
                onChange={handleChange}
                required
                placeholder={placeholder}
                pattern={pattern}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-orange-500"
              />
            </div>
          ))}
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="bank"
            >
              Bank
            </label>
            <select
              id="bank"
              name="bank"
              value={formData.bank}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-orange-500"
            >
              <option value="" disabled>
                Select your bank
              </option>
              {banksInNigeria.map((bank) => (
                <option key={bank} value={bank}>
                  {bank}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccountPage;
