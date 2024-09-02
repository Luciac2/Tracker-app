import React, { useState } from "react";

const CreateAccountPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    bankName: "",
    accountNumber: "",
    accountName: "",
    state: "",
    location: "",
    identification: null,
    profilePicture: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value, // Handle file input for identification and profilePicture
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // For form Submission
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
              name: "fullName",
              type: "text",
              placeholder: "Enter your full name",
            },
            {
              name: "phoneNumber",
              type: "tel",
              placeholder: "Enter your phone number",
              pattern: "\\d{11}",
            },
            {
              name: "email",
              type: "email",
              placeholder: "Enter your email address",
            },
            {
              name: "password",
              type: "password",
              placeholder: "Enter your password",
            },
            {
              name: "confirmPassword",
              type: "password",
              placeholder: "Confirm your password",
            },
            {
              name: "accountNumber",
              type: "text",
              placeholder: "Enter your 10-digit account number",
              pattern: "\\d{10}",
            },
            {
              name: "accountName",
              type: "text",
              placeholder: "Enter the account holder name",
            },
            {
              name: "state",
              type: "text",
              placeholder: "Enter your state of residence",
            },
            {
              name: "location",
              type: "text",
              placeholder: "Enter your city/town",
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
              htmlFor="bankName"
            >
              Bank Name
            </label>
            <select
              id="bankName"
              name="bankName"
              value={formData.bankName}
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
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="identification"
            >
              Identification Document
            </label>
            <input
              id="identification"
              name="identification"
              type="file"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-orange-500"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="profilePicture"
            >
              Profile Picture
            </label>
            <input
              id="profilePicture"
              name="profilePicture"
              type="file"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-orange-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
          >
            Create Account
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-orange-600 hover:text-orange-700 font-semibold"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountPage;
